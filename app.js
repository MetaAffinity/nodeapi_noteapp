import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from './middlewares/error.js';
import userRouter from './routes/user.js';
import noteRouter from './routes/note.js';
import cors from 'cors';


export const app = express()


config({
    path: "./config.env",
  });

//middlwares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://react-noteapp-ruddy.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  //origin: [process.env.FRONTEND_URL],
  //methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  //for pass cookies
}))

//routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/notes', noteRouter)

app.get("/",(req,res)=>{
    res.send("First Page");
})


app.use(errorMiddleware)