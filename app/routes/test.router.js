const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/user/:id', testController.getUserById);

router.delete('/user/:id', testController.destroyUser);

router.put('/user/:id', testController.updateUser);

router.post('/user/:id_eo/event', testController.createEvent);

router.post('/user/:id_user/food', testController.createFood)

router.delete('/user/:id_eo/event/:id_event', testController.destroyEvent);

router.post('/user/:id_eo/events/:id_event/sellers', testController.createSeller);

module.exports = router;
