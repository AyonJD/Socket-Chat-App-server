const express = require('express');
const route = express.Router();

route.post('/', addMessage);
route.get('/:chatId', getMessages);

module.exports = route;