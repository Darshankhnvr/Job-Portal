import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js"
import applicationRoutes from "./routes/application.route.js"
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api/auth", authRoutes)

app.use("/api/jobs", jobRoutes)

app.use("/api", applicationRoutes)

app.get("/", (req, res) =>{
    res.status(200).json({message: "Welcome to the Job Portal"})
})

app.get("/health", (req, res) =>{
    res.status(200).json({status: "OK"})
})

export default app;