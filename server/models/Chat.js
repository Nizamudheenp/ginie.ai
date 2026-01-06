const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);