const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')

const { login, signup, logout } = authController;
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
module.exports = router;