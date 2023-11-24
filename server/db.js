import mysql from 'mysql2'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"@sDf1234->$",
    database:"fullstackdb"
})