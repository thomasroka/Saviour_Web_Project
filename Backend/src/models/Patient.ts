import mongoose from 'mongoose'

const ptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    appointmentdate: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false,
        default: "other",
    },
}, { timestamps: true });

const Patient = mongoose.model("Patient", ptSchema)
export default Patient