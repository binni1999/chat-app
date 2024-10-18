const express = require('express');
const protectRoutes = require('../middleware/protectRoute');
const { protectRoute } = protectRoutes;
const userController = require('../controllers/userController')
const { getUsersForSidebar } = userController;
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar)


module.exports = router;