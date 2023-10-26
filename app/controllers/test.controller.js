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
			id_event
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
	createEvent,
	destroyEvent,
	getUserById,
	updateUser,
	destroyUser,
	createSeller,
	createFood
};
