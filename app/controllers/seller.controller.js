const db = require('../models');
const { Op } = require('sequelize');
const User = db.user;
const Event = db.event;
const Seller = db.seller;
const Foods = db.food;

const addSellerToEvent = async (req, res) => {
	const { id_event } = req.params;
	const id_user = req.user.userId;
	const sellerData = req.body;

	try {
		// Check if the user (id_eo) exists before creating a seller
		const user = await User.findByPk(id_user);
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
			id_seller: id_user,
			id_event
		});

		res
			.status(201)
			.json({ message: 'Seller created successfully', data: seller });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getSellerProfile = async (req, res) => {
	try {
		let user = await User.findByPk(req.user.userId);
		console.log(user);
		res
			.status(200)
			.json({ message: 'Profile successfully loaded.', data: user });
	} catch (err) {
		res.status(500).json({ message: 'Error ' + err.message });
	}
};

const updateSellerProfile = async (req, res) => {
	try {
		const {
			name,
			address,
			description,
			city,
			img_url,
			socmed_or_web_url,
			contact
		} = req.body;
		const userId = req.user.userId;

		// Find the user by ID
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update the user's profile fields
		user.name = name;
		user.address = address;
		user.description = description;
		user.city = city;
		user.img_url = img_url;
		user.socmed_or_web_url = socmed_or_web_url;
		user.contact = contact;

		// Save the updated user profile
		await user.save();

		res
			.status(200)
			.json({ message: 'Seller Profile updated successfully', data: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getListEventsJoined = async (req, res) => {
	try {
		const id_user = req.user.userId;

		const id_events_joined = await Seller.findAll({
			where: {
				id_seller: id_user
			},
			attributes: ['id_event']
		});

		const events_joined = await Event.findAll({
			where: {
				id: {
					[Op.in]: id_events_joined.map((obj) => obj.id_event)
				}
			}
		});

		res.status(200).json({
			message: 'List of Events joined is retrieved successfully',
			data: events_joined
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	addSellerToEvent,
	getSellerProfile,
	updateSellerProfile,
	getListEventsJoined
};
