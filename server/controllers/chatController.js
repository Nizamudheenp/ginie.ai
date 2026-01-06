const groq = require('../config/groqClient');
const Chat = require('../models/Chat');
exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        await Chat.create({
            role: "user",
            content: message
        });

        const chatHistory = Chat.find().sort({ createdAt: 1 }).limit(10);

        const messages = [
            {
                role: "system",
                content: "You are a helpful AI assistant."
            },
            ...(await chatHistory).map(msg => (
                {
                    role: msg.role === "assistant" ? "assistant" : "user",
                    content: msg.content
                }
            ))
        ]

        const completion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages
        });

        const aiReply = completion.choices[0].message.content;
        await Chat.create({
            role: "assistant",
            content: aiReply
        });

        res.json({ reply: aiReply });


    } catch (error) {
        res.status(500).send("server error", error)
    }
}