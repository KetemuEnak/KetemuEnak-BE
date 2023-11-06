const db = require('../models');
const User = db.user;
const Event = db.event;
const Seller = db.seller;
const Foods = db.food;

const getUserById = (req, res) => {
	const userId = req.params.id;
	var condition = userId ? { id: userId } : null;

	User.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving data user.'
			});
		});
};

const updateUser = async (req, res) => {
	try {
		const { email, name, password, role, address, description, city, img_url } =
			req.body;
		const userId = req.params.id;

		// Find the user by ID
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update the user's profile fields
		user.email = email;
		user.name = name;
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
		}
		user.role = role;
		user.address = address;
		user.description = description;
		user.city = city;
		user.img_url = img_url;

		// Save the updated user profile
		await user.save();

		res.json({ message: 'Profile updated successfully', user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const destroyUser = async (req, res) => {
	try {
		const userId = req.params.id;
		// Find the user by ID
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Delete the user
		await user.destroy();

		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getEventByIdEo = (req, res) => {
	const id_eo = req.params.id_eo;
	var condition = id_eo ? { id_eo: id_eo } : null;

	Event.findAll({
		where: condition,
		// include: [
		// 	{
		// 		model: User,
		// 		as: 'eventOrganizer'
		// 	}
		// ]
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving data user.'
			});
		});
};

// create dan delete just for testing dev, can remove it later
// ------------------
// Create a new event (don't use it in production)
const createEvent = async (req, res) => {
	const { id_eo } = req.params;
	const eventData = req.body;

	try {
		// Check if the user (id_eo) exists before creating an event
		const user = await User.findByPk(id_eo);
		if (!user) {
			return res.status(404).json({ error: 'invalid user id' });
		}

		// Create the event and associate it with the user
		const event = await Event.create({
			...eventData,
			id_eo
		});

		res.status(201).json(event);
	} catch (error) {
		res
			.status(500)
			.json({ message: `Error create event: ${error.message || error}` });
	}
};

const updateEvent = async (req, res) => {
	try {
		const { ticket_price, title, description, img_url, time, alamat, city, max_seller, url_website } =
			req.body;
		const eventId = req.params.id_event;

		// Find the user by ID
		const event = await Event.findByPk(eventId);

		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}

		// Update the user's profile fields
		event.ticket_price = ticket_price;
		event.title = title;
		event.description = description;
		event.img_url = img_url;
		event.time = time;
		event.alamat = alamat;
		event.city = city;
		event.max_seller = max_seller;
		event.url_website = url_website;

		// Save the updated user profile
		await event.save();

		res.json({ message: 'Event updated successfully', event });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const unpublishEvent = async (req, res) => {
	try {
		const eventId = req.params.id_event;

		// Find the user by ID
		const event = await Event.findByPk(eventId);

		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}

		// Update the user's profile fields
		event.is_publish = false;
		event.published_at = null;

		// Save the updated user profile
		await event.save();

		res.json({ message: 'Event Closed successfully', event });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete an event (don't use it in production)
const destroyEvent = async (req, res) => {
	const { id_eo, id_event: eventId } = req.params;
	// const { eventId } = req.body;

	try {
		// Check if the user (id_eo) exists before deleting an event
		const user = await User.findByPk(id_eo);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Find and delete the event
		const event = await Event.findOne({ where: { id: eventId, id_eo } });
		if (event) {
			await event.destroy();
			res.json({ message: 'Event deleted successfully' });
		} else {
			res.status(404).json({ error: 'Event not found' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: `Error delete event: ${error.message || error}` });
	}
};

const getListSeller = (req, res) => {
	const id_event = req.params.id_event;
	var condition = id_event ? { id_event: id_event } : null;

	Seller.findAll({
		where: condition,
		include: [
			{
				model: Event,
				as: 'event'
			}
		]
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving data user.'
			});
		});
};

const getListPendingSeller = (req, res) => {
	const id_event = req.params.id_event;
	var condition = id_event ? { id_event: id_event, status:"pending" } : null;

	Seller.findAll({
		where: condition,
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving data user.'
			});
		});
};

const approveSeller = async (req, res) => {
	try {
		const id_seller = req.params.id_seller;
		var condition = id_seller ? { id: id_seller } : null;

		// Find the user by ID
		const dataSeller = await Seller.findOne({
			where: condition,
		});

		if (!dataSeller) {
			return res.status(404).json({ message: 'Seller not found' });
		}

		// Update the user's profile fields
		dataSeller.status = "accepted";
		dataSeller.accepted_at = new Date();

		// Save the updated user profile
		await dataSeller.save();

		res.json({ message: 'Seller Approved successfully', dataSeller });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const rejectSeller = async (req, res) => {
	try {
		const { rejected_reason } =
			req.body;
		const id_seller = req.params.id_seller;
		var condition = id_seller ? { id: id_seller } : null;

		// Find the user by ID
		const dataSeller = await Seller.findOne({
			where: condition,
		});

		if (!dataSeller) {
			return res.status(404).json({ message: 'Seller not found' });
		}

		// Update the user's profile fields
		dataSeller.status = "rejected";
		dataSeller.rejected_reason = rejected_reason;

		// Save the updated user profile
		await dataSeller.save();

		res.json({ message: 'Seller Approved successfully', dataSeller });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Create a new seller associated with an event
const createSeller = async (req, res) => {
	const { id_eo, id_event } = req.params;
	const sellerData = req.body;

	try {
		// Check if the user (id_eo) exists before creating a seller
		const user = await User.findByPk(id_eo);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Check if the event (id_event) exists before creating a seller
		const event = await Event.findByPk(id_event);
		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}

		// Create the seller and associate it with the user and event
		const seller = await Seller.create({
			...sellerData,
			id_seller: id_eo,
			id_event: id_event
		});

		res.status(201).json(seller);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Create a new food item
const createFood = (req, res) => {
	const { id_user } = req.params;
	const { category, food_name, img_url, description, price } = req.body;

	// Validate request
	if (!id_user || !category || !food_name || !price) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	// Create a new food item
	Foods.create({
		id_users: id_user,
		category,
		food_name,
		img_url,
		description,
		price
	})
		.then((food) => {
			res.status(201).json(food);
		})
		.catch((err) => {
			res.status(500).json({
				message:
					err.message || 'An error occurred while creating the food item.'
			});
		});
};

module.exports = {
	getUserById,
	updateUser,
	destroyUser,
	getEventByIdEo,
	createEvent,
	updateEvent,
	destroyEvent,
	unpublishEvent,
	getListSeller,
	getListPendingSeller,
	approveSeller,
	rejectSeller,
	createSeller,
	createFood
};
