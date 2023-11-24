import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';

import img from "/images/abb.jpg"




export default function ArticleCard({data,index,setChangeState,changeState}) {
    const handleDelete = async (id)=>{
        try{
           await axios.delete(`http://localhost:3000/api/article/deleteData/${id}`);
           setChangeState(!changeState);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <Card key={index} sx={{ width: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
            <IconButton onClick={()=>{handleDelete(data.id)}}  aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        }
        title={data.title.slice(0,21)}
        subheader={moment(data.date).format('MMM DD, YYYY HH:mm')}

      />
      <CardMedia
        component="img"
        height="194"   
        image={img}
        alt="article dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>


        <Link to={`/update/${data.id}`}>
            <Button variant="text">update post</Button>
        </Link>

      </CardActions>

    </Card>
  );
}
