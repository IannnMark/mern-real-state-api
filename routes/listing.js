const express = require('express');
const verifyToken = require('../utils/verifyUser');
const router = express.Router();
const { createListing, deleteListing } = require('../controllers/listingController');

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);


module.exports = router;