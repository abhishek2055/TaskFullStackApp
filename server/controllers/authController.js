import { db } from "../db.js"

import bcrypt from "bcrypt"

import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const { username, email, password } = req.body;
    //check Existing User
    const q = "SELECT * FROM user WHERE email = ?"
    db.query(q, [email, username], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length != 0) {
            return res.status(409).json("user already exists");
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
        const i = "INSERT INTO user (username,email,password) VALUES (?,?,?)"
        db.query(i, [username, email,hash], (err, data) => {
            if (err) { return res.json(err); }
            else {
                return res.status(200).json("user has been created.");
            }

        })
    })
}
//login
export const login = (req,res)=>{ 
    const {email,password} = req.body;
    const q = "SELECT * from user WHERE email = ?"

    db.query(q,[email],(error,data)=>{
        if(error){
            return res.json(error);
        }
        if(data.length===0){
            return res.json("user not found");
        }
        const isPasswordValid = bcrypt.compareSync(password,data[0].password)
        if(!isPasswordValid){
            return res.status(400).json("incorrect password");
        }
        const token = jwt.sign({email},"jwt-private-key",{expiresIn:'1d'});
        res.cookie('token',token);
        return res.status(200).json("logged in")
    })
}

export const checkToken = (req,res)=>{ 
    const token = req.cookies.token;
    if(!token){
        return res.json("not token- not authenticated");
    }else{
        jwt.verify(token,"jwt-private-key",(error,data)=>{
            if(error){
               return res.status(400).json("wrong token")
            }
            else{
                return res.status(200).json(data.email)
            }
        })
    }
}

export const logout = (req,res)=>{
    res.clearCookie('token');
    return res.json("logout successful")
}