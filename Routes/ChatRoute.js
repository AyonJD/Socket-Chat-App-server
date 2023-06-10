const express = require('express');
const { userChats, findChat, createChat } = require('../Controllers/ChatController');
const { verifyJWT } = require('../Middlewares/verifyJWT');
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)

module.exports = router;