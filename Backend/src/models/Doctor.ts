import mongoose from 'mongoose'
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    image: { type: String, required: true },
    ratings: { type: Number },
    location: { type: String, required: true },
    fee: {
        type: Number, required: true,
    },
    available: { type: String, default: true },
    phonenumber: { type: Number, select: false },
    email: { type: String, required: true, select: false }
})
export const Doctor = mongoose.model("Doctor", doctorSchema)