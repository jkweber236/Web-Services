const express = require('express');
const router = express.Router();
const { requiresAuth } = require('../middleware/authenticate'); // Correct import path
const userController = require('../controllers/users'); // Import the user controller

router.get('/profile', requiresAuth, userController.getProfile);
router.get('/users', requiresAuth, userController.getUsers);

module.exports = router; 
