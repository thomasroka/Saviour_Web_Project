import "dotenv/config"
import mongoose from "mongoose"
import { Doctor } from "../models/Doctor.js"

const cleanDoctorImages = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error('MONGO_URL not found in .env')
        }
        await mongoose.connect(mongoUrl)
        console.log('MongoDB Connected')

        const doctors = await Doctor.find()
        console.log(`Found ${doctors.length} doctors in database.`)

        let updatedCount = 0
        for (const doc of doctors) {
            if (doc.image && doc.image.includes('/uploads/')) {
                const uploadIdx = doc.image.indexOf('/uploads/')
                const cleaned = doc.image.substring(uploadIdx)
                if (cleaned !== doc.image) {
                    console.log(`Updating doctor "${doc.name}": "${doc.image}" -> "${cleaned}"`)
                    doc.image = cleaned
                    await doc.save()
                    updatedCount++
                }
            }
        }

        console.log(`Successfully cleaned ${updatedCount} doctor images to relative /uploads/... paths.`)
    } catch (e) {
        console.error('Migration failed:', e)
    } finally {
        await mongoose.disconnect()
    }
}

cleanDoctorImages()
