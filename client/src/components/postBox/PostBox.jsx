import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BoxSection } from "./postbox.css";
import { ErrorMessage } from "../../pages/login/login.css";
import axios from "axios";

const PostBox = ({changeState,setChangeState}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!title.trim() && !title.trim() )
        {
            setError('Inputs Cant be Empty');
        }
        else{
            const saveData = {title,description}


          try{
            axios.post("http://localhost:3000/api/article/saveData",saveData)
            setTitle('');
            setDescription('');
            setChangeState(!changeState);
          }catch(error){
            console.log(error);
          }
            
        }

        
    }

  return (
    <BoxSection >
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
         onChange={(e)=>{setTitle(e.target.value);setError('');}}
         id="filled-basic"
         label="Article Title"
         value={title}
         variant="outlined"
         />

        <TextField
          id="filled-multiline-static"
          label="Artical Description"
          multiline
          rows={4}
          variant="outlined"
          value={description}
        onChange={(e)=>{setDescription(e.target.value);setError('');}}
        />
      </Box>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleSubmit} variant="contained">Post</Button>
    </BoxSection>
  );
};

export default PostBox;
