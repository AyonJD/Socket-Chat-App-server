const express = require('express');
const { createUser, getUser, loginUser, excludeCurrentUser, loggedInUser } = require('../Controllers/UserController');
const router = express.Router();

router.get("/", getUser);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/exclude/:userId', excludeCurrentUser);
router.post('/loggedInUser', loggedInUser)

module.exports = router;