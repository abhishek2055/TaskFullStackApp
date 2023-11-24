import { db } from "../db.js";

export const saveData = (req,res)=>{
    const {title,description} = req.body;
    
    const date = new Date()
    const dateOfCreation = date.toISOString().slice(0,19).replace('T',' ');

    const q = "INSERT INTO article (title,description,date) VALUES (?,?,?)";
    db.query(q,[title,description,dateOfCreation],(error,data)=>{
        if(error){
            return res.status(409).json(error)
        }else{
            return res.status(200).json("data created")
        }
    })
}

export const getData = (req,res)=>{
    const q = "SELECT * FROM article";
    db.query(q,(error,data)=>{
        if(error){
            return res.status(409).json("error",error);
        }
        else{
            return res.status(200).json(data);
        }
    })
}

export const deleteData=(req,res)=>{
    const q = "Delete from article Where id = ?"
    db.query(q,[req.params.id],(error,data)=>{
        if(error){
            return res.json(error);
        }
        else{
           return res.json(data);
        }
    })
}

export const getSpecificData = (req,res)=>{

    const q = "select * from article where id = ?"
    db.query(q,[req.params.id],(error,data)=>{
        if(error){
            return res.json(error);
        }
        else{
          return res.json(data);
        }
    })
}

export const updateData = (req,res)=>{
    const {title,description} = req.body;
    
    console.log(title,description,req.params.id);
    const q = "UPDATE article SET title = ?, description = ? WHERE id = ?";
    db.query(q,[title,description,req.params.id],(error,data)=>{
        if(error){
           return res.json(error)
        }
        else{
          return  res.json(data);
        }
    })

}