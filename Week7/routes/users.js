const express = require('express');
const router = express.Router();
const { requiresAuth } = require('../middleware/authenticate'); 
const userController = require('../controllers/users'); 

router.get('/profile', requiresAuth, userController.getProfile);
router.get('/users', requiresAuth, userController.getUsers);

module.exports = router; 
