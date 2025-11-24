import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import notesRouter from "./routes/noteRoutes.js";

dotenv.config()
// console.log(dotenv.config());
const app = express();
app.use(cors());
app.use(express.json());

app.use("/",userRoutes)
app.use("/note",notesRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.get('/', (req,res)=>{
    res.send('all routes working...')
  })
  app.get('/home',(req,res)=>{
    res.send("home is working")
  })

  app.listen('8000',()=>console.log('port is listening'))