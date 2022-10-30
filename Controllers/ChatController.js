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
};

module.exports.userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json({ success: true, message: "Chat fetched successfully", chat })
    } catch {
        res.status(500).json({ success: false, message: "Internal server error", err })
    }
};

module.exports.findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json({ success: true, message: "Chat fetched successfully", chat })
    } catch {
        res.status(500).json({ success: false, message: "Internal server error", err })
    }
}