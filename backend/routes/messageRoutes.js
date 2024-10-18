const express = require('express')
const router = express.Router();
const messageRoutes = require('../controllers/messageController')
const { sendMessage, getMessages } = messageRoutes;
const protectRoutesController = require('../middleware/protectRoute');
const { protectRoute } = protectRoutesController;



router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);


module.exports = router;