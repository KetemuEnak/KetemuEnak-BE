const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');


router.get('', eventsController.getAllEvents);

router.get('/:id_event', eventsController.getEventById);

router.get('/:id_event/:id_seller', eventsController.getSellerDetail);

router.get('/:id_event/:id_seller/foods', eventsController.getAllFoodBySellerInEvent);

router.get('/:id_event/:id_seller/:id_food', eventsController.getFoodDetailInEvent);

module.exports = router;
