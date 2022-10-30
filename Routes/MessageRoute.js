const express = require('express');
const { addMessage, getMessages } = require('../Controllers/MessageController');
const route = express.Router();

route.post('/', addMessage);
route.get('/:chatId', getMessages);

module.exports = route;