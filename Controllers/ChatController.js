const ChatModel = require("../Models/ChatModel")

module.exports.createChat = async (req, res) => {
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    })
}