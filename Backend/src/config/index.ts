import express from "express"
import dotenv from "dotenv"
import connectDb from "./db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path"
import { signup } from "../controllers/signup.js";
import { signin } from "../controllers/signin.js";
import { auth } from "../Middlewares/authMiddleWare.js";
import adminRoute from "../routes/admin.route.js";
import doctorRoute from "../routes/doctor.route.js";
import patientRoute from "../routes/patient.route.js";
dotenv.config();
const Port = process.env.PORT
connectDb();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
    // cookie used so
}))
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))
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
app.listen(Port, () => {
    console.log(`Server is running i ${Port}`)
});