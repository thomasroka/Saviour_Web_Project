import mongoose from "mongoose";
// connection Database
const connectDb = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error('MongoURL doesnt exist')
        }
        await mongoose.connect(mongoUrl);
        console.log('MongoDb Connection Sucessfull')
    }
    catch (e) {
        console.log('Connection to Database failed', e);
        process.exit(1); //stop running apis
    }
}
export default connectDb