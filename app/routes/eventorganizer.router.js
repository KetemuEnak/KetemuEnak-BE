const express = require('express');
const router = express.Router();
const eventorganizer = require('../controllers/eventorganizer.controller');

router.get('/:id', eventorganizer.getUserById);

router.delete('/:id', eventorganizer.destroyUser);

router.put('/:id', eventorganizer.updateUser);

router.get('/:id_eo/event', eventorganizer.getEventByIdEo);

router.post('/:id_eo/event', eventorganizer.createEvent);

router.put('/:id_eo/event/:id_event', eventorganizer.updateEvent);

router.put('/:id_eo/event/:id_event/unpublish', eventorganizer.unpublishEvent);

router.put('/:id_eo/event/:id_event/publish', eventorganizer.publishEvent);

router.get('/:id_eo/event/:id_event/list_seller', eventorganizer.getListSeller);

router.get('/:id_eo/event/:id_event/pending', eventorganizer.getListPendingSeller);

router.put('/:id_eo/event/:id_event/:id_seller/approve', eventorganizer.approveSeller);

router.put('/:id_eo/event/:id_event/:id_seller/reject', eventorganizer.rejectSeller);

router.post('/:id_user/food', eventorganizer.createFood)

router.delete('/:id_eo/event/:id_event', eventorganizer.destroyEvent);

router.post('/:id_eo/events/:id_event/sellers', eventorganizer.createSeller);

module.exports = router;
