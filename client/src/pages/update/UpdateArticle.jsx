import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BoxSection } from "../../components/postBox/postbox.css";
import { ErrorMessage } from "../../pages/login/login.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const UpdateArticle = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        const data = async ()=>{
            try{

                const res = await axios.get(`http://localhost:3000/api/article/getData/${id}`);
                setTitle(res.data[0].title);      
                setDescription(res.data[0].description);

            }catch(error){
                console.log(error);
            }
        }
        data();
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!title.trim() && !title.trim())
        {
            setError('Inputs Cant be Empty');
        }
        else{
            const saveData = {title,description}
            axios.put(`http://localhost:3000/api/article/updateData/${id}`,saveData)
            setTitle('');
            setDescription('');
              navigate('/');
            
            
        }

        
    }

  return (
    <BoxSection >
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "55ch" },
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



export default UpdateArticle
