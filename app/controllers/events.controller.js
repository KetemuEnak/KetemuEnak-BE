const {
	event: EventModel,
	user: User,
	seller: Seller,
	food: Foods
} = require('../models'); // Adjust the path as needed

// Get all events
const getAllEvents = async (req, res) => {
	try {
		const events = await EventModel.findAll();
		res.json(events);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error get list event: ${error.message || error}` });
	}
};

// Get event by ID
const getEventById = async (req, res) => {
	const { id_event } = req.params;
	try {
		const event = await EventModel.findByPk(id_event);
		if (event) {
			res.json(event);
		} else {
			res.status(404).json({ error: 'Event not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error get an event: ${error.message || error}` });
	}
};

// Get seller detail in event
const getSellerDetail = async (req, res) => {
	const { id_event, id_seller } = req.params;

	try {
		// Find the seller based on the provided event and seller IDs
		const seller = await Seller.findOne({
			where: { id_event, id_seller },
			include: [
				{ model: User, as: 'seller' }, // Include seller details
				{ model: EventModel, as: 'event' } // Include event details
			]
		});

		if (seller) {
			res.json(seller);
		} else {
			res.status(404).json({ message: 'Seller not found in the event' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: `Error get seller detail: ${error.message || error}` });
	}
};

// Get all food by seller in event
const getAllFoodBySellerInEvent = (req, res) => {
	const { id_event, id_seller } = req.params;

	Foods.findAll({
		where: { id_users: id_seller },
		include: [
			{
				model: User,
				as: 'user'
			}
		]
	})
		.then((foods) => {
			res.status(200).json(foods);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'An error occurred while retrieving food.'
			});
		});
};

// Get food detail in event
const getFoodDetailInEvent = (req, res) => {
	const { id_event, id_seller, id_food } = req.params;

	Foods.findOne({
		where: { id: id_food, id_users: id_seller },
		include: [
			{
				model: User,
				as: 'user'
			}
		]
	})
		.then((food) => {
			if (!food) {
				return res.status(404).send({ message: 'Food not found' });
			}

			res.status(200).json(food);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'An error occurred while retrieving food detail.'
			});
		});
};

module.exports = {
	getAllEvents,
	getEventById,
	getSellerDetail,
	getAllFoodBySellerInEvent,
	getFoodDetailInEvent
};
