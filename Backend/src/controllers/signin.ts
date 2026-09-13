import bcrypt from 'bcrypt'
import { type Request, type Response } from 'express'
import jwt from "jsonwebtoken"
import User from '../models/User.js'
export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        // cant do everyone knows emails so bcrypt hashing
        const dbUser = await User.findOne({ email });
        if (!dbUser) {
            res.status(401).json({
                message: "Please Signup"
            })
            return;
        }

        const confirmpassword = await bcrypt.compare(password, dbUser.password)
        if (!confirmpassword) {
            res.status(401).json({
                message: 'Wrong Credentials'
            })
            return
        }
        const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET_KEY!,
            { expiresIn: '15m' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false// true in production (HTTPS)
        });
        res.json({
            message: 'You are logged in',
            email: email,
            createdtoken: token
        })
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        })
    }

}