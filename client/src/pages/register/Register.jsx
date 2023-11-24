import React, { useState } from "react";
import { Detailbox, RegisterBox, RegisterPage } from "./register.css";
import { ErrorMessage, StyledButton, StyledInput } from "../login/login.css";
import { Link } from "react-router-dom";
import { isValidPasswords } from "../../utils/validation";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const validateUsername = () => {
    const isValidUsername = username.length >= 3;
    if (!isValidUsername) {
      setUsernameError("name must be >3");
    } else {
      setUsernameError("");
    }
    return isValidUsername;
  };
  const validatePassword = () => {
    const isValidPassword = isValidPasswords(firstPassword);
    if (!isValidPassword) {
      setPasswordError("pwd invalid!!!");
    } else {
      setPasswordError("");
    }
    return isValidPassword;
  };
  const validateConfrimPassword = () => {
    const isMatched = firstPassword === secondPassword;
    if (!isMatched) {
      setPasswordMatchError("password doesnot match");
    } else {
      setPasswordMatchError("");
    }
    return isMatched;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isPasswordMatch = validateConfrimPassword();
    if (isUsernameValid && isPasswordValid && isPasswordMatch) {
      const registrationData = {username,password:secondPassword,email};
      try {
        await axios.post(
          "http://localhost:3000/api/auth/register", registrationData
        );
        toast.success("Successful registration")

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } catch (error) {
        setError(error.response.data);
      }
      

    }
  };
  return (
    <RegisterPage>
      <RegisterBox onSubmit={(e) => handleSubmit(e)}>
        
        <div><Toaster /> </div>
  
        <h1 className="register-head">Registration</h1>
        <div className="registeration-details">
          <Detailbox>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validateUsername}
            />
            {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
          </Detailbox>
 

          <Detailbox>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Detailbox>

          <Detailbox>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={(e) => setFirstPassword(e.target.value)}
                onBlur={validatePassword}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            </FormControl>
          </Detailbox>

          <Detailbox>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-conform-password"
                onChange={(e) => setSecondPassword(e.target.value)}
                onBlur={validateConfrimPassword}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              {passwordMatchError && (
                <ErrorMessage>{passwordMatchError}</ErrorMessage>
              )}
            </FormControl>
          </Detailbox>

          <div className="checkbox-terms-conditions">
            <StyledInput type="checkbox" onChange={handleCheck} />
            <p className="terms-condition">I accept all terms and conditions</p>
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage> }
        <StyledButton
          $bcolor="blue"
          disabled={!isChecked}
          style={{ cursor: !isChecked ? "not-allowed" : "pointer" }}
          onMouseLeave={() => setTimeout(() => setError(''), 2000)}
          >
          Register Now
        </StyledButton>
        <p className="already-account">
          Alredy have a account?
          <Link to="/login">
            <span className="goto-login">Login now</span>
          </Link>
        </p>
      </RegisterBox>
    </RegisterPage>
  );
};

export default Register;
