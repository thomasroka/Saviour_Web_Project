import mongoose
    from "mongoose";
const appSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "completed"],
        default: "pending"
    },
    preferredTime: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
});
const Appointment = mongoose.model('Appointment', appSchema);
export default Appointment