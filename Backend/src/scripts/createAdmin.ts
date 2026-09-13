import "dotenv/config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import User from "../models/User.js"

const createAdmin = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error('MONGO_URL doesnt exist')
        }
        await mongoose.connect(mongoUrl)
        console.log('MongoDB Connected')

        const adminEmail = process.argv[2] || 'admin@saviour.com'
        const adminPassword = process.argv[3] || 'admin123'

        const hashedPassword = await bcrypt.hash(adminPassword, 10)
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            { email: adminEmail, password: hashedPassword, role: 'admin' },
            { upsert: true, new: true }
        )

        console.log(`Admin account ready:`)
        console.log(`  email:    ${adminEmail}`)
        console.log(`  password: ${adminPassword}`)
        console.log(`  role:     ${admin.role}`)
    } catch (e) {
        console.log('Failed to create admin:', e)
        process.exit(1)
    } finally {
        await mongoose.disconnect()
    }
}

createAdmin()