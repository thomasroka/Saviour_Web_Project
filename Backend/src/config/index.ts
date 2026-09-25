import express from "express"
import type { NextFunction, Request, Response } from "express"
import multer from "multer"
import dotenv from "dotenv"
dotenv.config(); // must be first before reading any process.env
import connectDb from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path"
import { signup } from "../controllers/signup.js";
import { signin } from "../controllers/signin.js";
import { auth } from "../Middlewares/authMiddleWare.js";
import { getUploadedImage } from "../controllers/admin.js";
import adminRoute from "../routes/admin.route.js";
import doctorRoute from "../routes/doctor.route.js";
import patientRoute from "../routes/patient.route.js";
const Port = process.env.PORT || 8000
connectDb();
const app = express();
app.set("trust proxy", 1);
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))
app.get('/uploads/:filename', getUploadedImage)
app.get('/', (req, res) => {
    res.json({ message: 'lol' })

})
type lol = {
    email: string,
    password: string
}
export const data: lol[] = []
app.post('/api/v1/auth/signup', signup
)
app.get('/api/v1/auth/signup', (req, res) => {

    res.json({
        data
    }
    )
})
app.post('/api/v1/auth/signin', signin)
app.use('/api/v1/doctor', doctorRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/patient', patientRoute)
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof multer.MulterError) {
        const message = error.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be 5 MB or smaller'
            : error.message
        res.status(400).json({ message })
        return
    }

    if (error instanceof Error && error.message.startsWith('Use a ')) {
        res.status(400).json({ message: error.message })
        return
    }

    res.status(500).json({ message: 'Server error' })
})
app.listen(Port, () => {
    console.log(`Server is running i ${Port}`)
});