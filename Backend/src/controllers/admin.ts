import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import type { Request, Response } from 'express'
import User from '../models/User.js'
import { Doctor } from '../models/Doctor.js'

export const adminSignin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
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

        if (dbUser.role !== "admin") {
            res.status(403).json({
                message: 'Access denied. Not an admin account'
            })
            return
        }

        const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET_KEY!,
            { expiresIn: '15m' }
        )

        res.cookie("adminToken", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });
        res.json({
            message: 'You are logged in as Admin',
            email: email,
            token: token
        })
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const addDoctor = async (req: Request, res: Response) => {
    try {
        const { name, specialization, image, ratings, location, fee, available,email,phonenumber} = req.body

        const adminUser = await User.findById(req.userId)
        if (!adminUser || adminUser.role !== "admin") {
            res.status(403).json({
                message: 'Access denied. Admin only'
            })
            return
        }

        if (!name || !specialization || !image || !location || !fee || !email) {
            res.status(400).json({
                message: 'Please fill all required fields'
            })
            return
        }

        // Normalize image path: if it contains /uploads/, store only /uploads/...
        let cleanImage = image;
        const uploadIndex = image.indexOf('/uploads/');
        if (uploadIndex !== -1) {
            cleanImage = image.substring(uploadIndex);
        }

        const doctor = await Doctor.create({
            name,
            specialization,
            image: cleanImage,
            ratings,
            location,
            fee,
            available,
            email,
            ...(phonenumber ? { phonenumber: Number(phonenumber) } : {}),
        })

        const doctorResponse = doctor.toObject() as Record<string, any>
        delete doctorResponse.email
        delete doctorResponse.phonenumber

        res.status(201).json({
            message: 'Doctor successfully created',
            doctor: doctorResponse
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({
                message: 'No image file provided'
            })
            return
        }

        res.status(201).json({
            message: 'Image uploaded successfully',
            url: `/uploads/${file.filename}`
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find().select('-email -phonenumber')
        res.json({
            message: 'Doctors retrieved successfully',
            doctors
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const deleteDoctor = async (req: Request, res: Response) => {
    try {
        const adminUser = await User.findById(req.userId)
        if (!adminUser || adminUser.role !== "admin") {
            res.status(403).json({
                message: 'Access denied. Admin only'
            })
            return
        }

        const { id } = req.params
        const doctor = await Doctor.findByIdAndDelete(id)
        if (!doctor) {
            res.status(404).json({
                message: 'Doctor not found'
            })
            return
        }

        res.json({
            message: 'Doctor deleted successfully',
            doctor
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
}