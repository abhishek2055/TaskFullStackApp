import React, { useState } from "react";
import { LoginPage,LoginBox, SignInText,  ForgetPassword, StyledButton, ErrorMessage } from "./login.css.jsx";
import { Link,useNavigate } from 'react-router-dom'
import { isValidEmails, isValidPasswords } from "../../utils/validation.js";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); 
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authError,setAuthError] = useState('')
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   const validateEmail = ()=>{
    const isValidEmail = isValidEmails(email);
    setIsValidEmail(isValidEmail);
    if(isValidEmail){
      setEmailError('')
    }
    else{
      setEmailError('invalid email type');
    }
    return isValidEmail;
  }
  const validatePassword = ()=>{
    // const isValidPassword = password.length>=6 && /[A-Z]/.test(password);
    const isValidPassword = isValidPasswords(password);
    setIsValidPassword(isValidPassword);
    setPasswordError(isValidPassword ? '' : 'invalid password');
    return isValidPassword;
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if(isEmailValid && isPasswordValid){
      const loginCreditanls = {email,password}
      try{
        console.log("hiii");
        await axios.post('http://localhost:3000/api/auth/login', loginCreditanls);
        toast.success("Successful login")
        setTimeout(() => {
          navigate('/');
        }, 500);
      }catch(error){
        setAuthError(error.response.data);
      }

    }    
  }

  return (
    <LoginPage>
      <LoginBox
        onSubmit={(e)=>handleSubmit(e)}
      >
        <div><Toaster /></div>
        <SignInText>
          <h1 className="head-signin">Sign in</h1>
          <p className="head-quote">Stay updated in your professional world</p>
        </SignInText>


        <TextField
          label="Email or Phone"
          variant = "outlined"
           onChange={(e)=>setEmail(e.target.value)}
           onBlur={validateEmail}
           autoComplete="off"
        /> 

          {
             emailError && !isValidEmail && <ErrorMessage>{emailError}</ErrorMessage>
          }


        <FormControl   variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={(e)=>setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
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
          {
             passwordError && !isValidPassword && <ErrorMessage>{passwordError}</ErrorMessage>
          }
        </FormControl>
        <ForgetPassword>
          Forget password?
        </ForgetPassword>
        {authError&& <ErrorMessage>{authError}</ErrorMessage>}
        <StyledButton 
        $bcolor = "blue" 
        >
          Sign in
          </StyledButton>
        <div className="line-or">
          <hr className="line"/>or<hr className="line"/>
        </div>
       <Link to="/register">
         <StyledButton $bcolor = "green">Register</StyledButton>
       </Link> 

      </LoginBox>
    </LoginPage>
  );
};

export default Login;
