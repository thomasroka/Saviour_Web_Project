import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import type { Request, Response } from 'express'
import User from '../models/User.js'
import { Doctor } from '../models/Doctor.js'

interface DoctorInput {
    name: string
    specialization: string
    image: string
    ratings: number
    location: string
    fee: number
    available: boolean
    email: string
    phonenumber?: number
}

type ParsedDoctorInput =
    | { ok: true; value: DoctorInput }
    | { ok: false; message: string }

const imageExtensions: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
}

const getUploadBucket = () => {
    const database = mongoose.connection.db
    if (!database) {
        return null
    }
    return new mongoose.mongo.GridFSBucket(database, { bucketName: 'doctor-images' })
}

const normalizeImagePath = (image: string) => {
    const uploadIndex = image.indexOf('/uploads/')
    return uploadIndex === -1 ? image : image.substring(uploadIndex)
}

const parseDoctorInput = (body: Record<string, unknown>): ParsedDoctorInput => {
    const { name, specialization, image, ratings, location, fee, available, email, phonenumber } = body

    if (typeof name !== 'string' || !name.trim()) {
        return { ok: false, message: 'Doctor name is required' }
    }
    if (typeof specialization !== 'string' || !specialization.trim()) {
        return { ok: false, message: 'Specialization is required' }
    }
    if (typeof image !== 'string' || !image.trim()) {
        return { ok: false, message: 'Doctor photo is required' }
    }
    if (typeof location !== 'string' || !location.trim()) {
        return { ok: false, message: 'Location is required' }
    }
    if (typeof email !== 'string' || !email.trim()) {
        return { ok: false, message: 'Email is required' }
    }

    const parsedFee = Number(fee)
    if (!Number.isFinite(parsedFee) || parsedFee < 0) {
        return { ok: false, message: 'Enter a valid fee' }
    }

    const parsedRatings = ratings === undefined || ratings === '' ? 0 : Number(ratings)
    if (!Number.isFinite(parsedRatings) || parsedRatings < 0 || parsedRatings > 5) {
        return { ok: false, message: 'Rating must be between 0 and 5' }
    }

    let parsedPhonenumber: number | undefined
    if (phonenumber !== undefined && phonenumber !== '') {
        parsedPhonenumber = Number(phonenumber)
        if (!Number.isFinite(parsedPhonenumber) || parsedPhonenumber < 0) {
            return { ok: false, message: 'Enter a valid phone number' }
        }
    }

    return {
        ok: true,
        value: {
            name: name.trim(),
            specialization: specialization.trim(),
            image: normalizeImagePath(image.trim()),
            ratings: parsedRatings,
            location: location.trim(),
            fee: parsedFee,
            available: available === undefined ? true : available === true || available === 'true',
            email: email.trim().toLowerCase(),
            ...(parsedPhonenumber === undefined ? {} : { phonenumber: parsedPhonenumber }),
        },
    }
}

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
        const parsedInput = parseDoctorInput(req.body)
        if (!parsedInput.ok) {
            res.status(400).json({ message: parsedInput.message })
            return
        }

        const doctor = await Doctor.create(parsedInput.value)
        res.status(201).json({
            message: 'Doctor successfully created',
            doctor
        })
    } catch (e) {
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

        const bucket = getUploadBucket()
        if (!bucket) {
            res.status(503).json({
                message: 'Image storage is not ready. Please try again.'
            })
            return
        }

        const extension = imageExtensions[file.mimetype]
        if (!extension) {
            res.status(400).json({
                message: 'Use a JPG, PNG, WEBP, GIF, or AVIF image'
            })
            return
        }

        const filename = `${Date.now()}-${randomUUID()}${extension}`
        await pipeline(
            Readable.from(file.buffer),
            bucket.openUploadStream(filename, {
                metadata: { contentType: file.mimetype },
            }),
        )

        res.status(201).json({
            message: 'Image uploaded successfully',
            url: `/uploads/${filename}`,
        })
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const getUploadedImage = async (req: Request, res: Response) => {
    try {
        const { filename } = req.params
        if (typeof filename !== 'string' || !filename || path.basename(filename) !== filename) {
            res.status(400).json({ message: 'Invalid image name' })
            return
        }

        const bucket = getUploadBucket()
        if (!bucket) {
            res.status(503).json({ message: 'Image storage is not ready' })
            return
        }

        const file = await bucket.find({ filename }).limit(1).next()
        if (!file) {
            res.status(404).json({ message: 'Image not found' })
            return
        }

        const contentType = typeof file.metadata?.contentType === 'string'
            ? file.metadata.contentType
            : 'application/octet-stream'
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.setHeader('X-Content-Type-Options', 'nosniff')

        const stream = bucket.openDownloadStream(file._id)
        stream.on('error', () => res.destroy())
        res.on('close', () => stream.destroy())
        stream.pipe(res)
    } catch (e) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' })
        } else {
            res.destroy()
        }
    }
}

export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find().select('+email +phonenumber')
        res.json({
            message: 'Doctors retrieved successfully',
            doctors
        })
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const parsedInput = parseDoctorInput(req.body)
        if (!parsedInput.ok) {
            res.status(400).json({ message: parsedInput.message })
            return
        }

        const { id } = req.params
        const doctor = await Doctor.findById(id).select('+email +phonenumber')
        if (!doctor) {
            res.status(404).json({ message: 'Doctor not found' })
            return
        }

        const { phonenumber, ...fields } = parsedInput.value
        doctor.set(fields)
        doctor.set('phonenumber', phonenumber)
        await doctor.save()

        res.json({
            message: 'Doctor updated successfully',
            doctor,
        })
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        })
    }
}

export const deleteDoctor = async (req: Request, res: Response) => {
    try {
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
        res.status(500).json({
            message: 'Server error'
        })
    }
}
