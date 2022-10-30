const express = require('express');
const { createUser, getUser } = require('../Controllers/UserController');
const router = express.Router();

router.get("/", getUser);
router.post('/signup', createUser)

module.exports = router;