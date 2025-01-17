import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected...");
    }).catch(e => console.log("mongoDb connection Error: ", e.message))
}

export default connectDB;