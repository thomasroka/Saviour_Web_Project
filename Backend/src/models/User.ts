import mongoose from 'mongoose'
const usrSchema = new mongoose.Schema({
    password: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    role: {
        type: String,
        enum: ["admin", "patient"],
        default: "patient",
    },
})
// connect model to collection
const User = mongoose.model("User", usrSchema, "users");
export default User