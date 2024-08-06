const express = require('express');
const { test, updateUser } = require('../controllers/userController.js');
const verifyToken = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);

module.exports = router;