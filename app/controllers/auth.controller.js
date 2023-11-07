// user.controller.js
// const User = require('../models/user.model');
const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'secret_key'; // Replace with your secret key

const register = async (req, res) => {
	try {
		const {
			email,
			password,
			role,
			contact,
			name,
			address,
			description,
			city,
			img_url,
			socmed_or_web_url
		} = req.body;

		// Hash the password before saving it
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const user = await User.create({
			email,
			password: hashedPassword,
			role,
			contact,
			name,
			address,
			description,
			city,
			img_url,
			socmed_or_web_url
			// Add other user fields as needed
		});

		// Create a JWT token
		const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

		res.json({ user, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user by email
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ message: 'Authentication failed 1' });
		}

		// Compare the provided password with the hashed password
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: 'Authentication failed 2' });
		}

		// Create a JWT token
		const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

		res.json({ user, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Retrieve all Tutorials from the database.
const getById = (req, res) => {
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

const update = async (req, res) => {
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

const destroy = async (req, res) => {
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

module.exports = { register, login, getById, update, destroy };
