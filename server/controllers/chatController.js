const groq = require('../config/groqClient');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        await Chat.create({
            role: "user",
            content: message
        });

        const chatHistory = await Chat.find().sort({ createdAt: 1 }).limit(10);

        const messages = [
            {
                role: "system",
                content: "You are a helpful AI assistant."
            },
            ...chatHistory.map(msg => (
                {
                    role: msg.role === "assistant" ? "assistant" : "user",
                    content: msg.content
                }
            ))
        ]

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages
        });

        const aiReply = completion.choices[0].message.content;
        await Chat.create({
            role: "assistant",
            content: aiReply
        });

        res.json({ reply: aiReply });


    } catch (error) {
        console.error("AI ERROR:", error);
        res.status(500).json({ error: "Server error" })
    }
}