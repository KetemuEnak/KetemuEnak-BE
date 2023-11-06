const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');
const verifyToken = require('./verifyToken');

router.get('/profile', verifyToken, sellerController.getSellerProfile);

router.put('/profile', verifyToken, sellerController.updateSellerProfile);

router.get('/events', verifyToken, sellerController.getListEventsJoined);

router.get('/events/:id_event', verifyToken, sellerController.addSellerToEvent);

router.put('/update-profile', verifyToken);

module.exports = router;
