const express = require('express');
const router = express.Router();
const { createChat, userChats } = require('../Controllers/ChatController');

router.get("/userId", userChats)
// router.get("/find/:firstId/:secondId", findChat)
router.post("/", createChat);

module.exports = router;