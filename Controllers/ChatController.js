const ChatModel = require("../Models/ChatModel")

module.exports.createChat = async (req, res) => {
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const result = await newChat.save()
        res.status(200).json({ success: true, message: "Chat created successfully", result })
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", err })
    }
}