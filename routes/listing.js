const express = require('express');
const verifyToken = require('../utils/verifyUser');
const router = express.Router();
const { createListing } = require('../controllers/listingController');

router.post('/create', verifyToken, createListing);


module.exports = router;