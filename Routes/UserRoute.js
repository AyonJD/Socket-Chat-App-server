const express = require('express');
const { createUser, getUser, getSingleUser } = require('../Controllers/UserController');
const router = express.Router();

router.get("/", getUser);
router.post('/signup', createUser);
router.post('/login', getSingleUser);

module.exports = router;