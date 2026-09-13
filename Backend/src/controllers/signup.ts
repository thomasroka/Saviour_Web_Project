import bcrypt from "bcrypt"
import { data } from "../config/index.js"
import type { Request, Response } from 'express'
import User from "../models/User.js"
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
            res.status(409).json({
                message: "User already exist"
            })
            return;
        }

        // hash password
        const hashedpassword: string = await bcrypt.hash(password, 10)
        //create user collection
        const user = await User.create({ email, password: hashedpassword })

        res.status(201).json({
            message: 'user sucessfully created',
            email: email,
            password: hashedpassword
        })
        data.push({ email, password: hashedpassword })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'server error'
        })
    }
}