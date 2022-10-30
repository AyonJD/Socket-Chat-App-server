const MessageModal = require('../Models/MessageModel');

module.exports.addMessage = async (req, res) => {
    const newMessage = new MessageModal({
        chatId: req.body.chatId,
        senderId: req.body.senderId,
        text: req.body.text
    });

    try {
        const result = await newMessage.save();
        res.status(200).json({ success: true, message: "Message created successfully", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", err });
    }
};

module.exports.getMessages = async (req, res) => {
    try {
        const result = await MessageModal.find({ chatId: req.params.chatId });
        res.status(200).json({ success: true, message: "Messages fetched successfully", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", err });
    }
};