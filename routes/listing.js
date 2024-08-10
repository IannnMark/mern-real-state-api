const express = require('express');
const verifyToken = require('../utils/verifyUser');
const router = express.Router();
const { createListing, deleteListing, updateListing, getListing } = require('../controllers/listingController');

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.put('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);


module.exports = router;