import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js"
import articleRoutes from "./routes/articleRoutes.js"
const app = express();
const port = 3000

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","DELETE","PUT"],
    credentials: true

}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/article",articleRoutes);
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

