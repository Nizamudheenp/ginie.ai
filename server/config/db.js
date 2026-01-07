import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        if(db){
            console.log('DB Success');
        }
    } catch (error) {
        console.log('DB Error',error);
    }
}

export default connectDB