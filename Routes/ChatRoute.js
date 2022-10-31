const express = require('express');
const { userChats, findChat, createChat } = require('../Controllers/ChatController');
const { verifyJWT } = require('../Middlewares/verifyJWT');
const router = express.Router();

router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)
router.post("/", createChat);

module.exports = router;