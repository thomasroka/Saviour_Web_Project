import mongoose from 'mongoose'
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    image: { type: String, required: true },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    location: { type: String, required: true, trim: true },
    fee: {
        type: Number, required: true, min: 0,
    },
    available: { type: Boolean, default: true },
    phonenumber: { type: Number, min: 0, select: false },
    email: { type: String, required: true, trim: true, lowercase: true, select: false }
})
export const Doctor = mongoose.model("Doctor", doctorSchema)