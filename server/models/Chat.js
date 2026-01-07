import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: String,
},
    { timestamps: true }
);

export default mongoose.model('Chat', chatSchema);