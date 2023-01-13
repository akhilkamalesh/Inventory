/*
    File contains the routes for authorization
*/
const express = require('express');
const { register, login, getMe } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // Need protect to access req.user (the user logged in)

module.exports = router;