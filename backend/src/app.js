import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json());

app.use("/api/auth", authRoutes)

app.get("/", (req, res) =>{
    res.status(200).json({message: "Welcome to the Job Portal"})
})

app.get("/health", (req, res) =>{
    res.status(200).json({status: "OK"})
})

export default app;