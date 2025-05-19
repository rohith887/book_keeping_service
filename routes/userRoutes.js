const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
