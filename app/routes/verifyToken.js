/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

// verify
const verifyToken = (req, res, next) => {
	const value = req.header('Authorization');
	const [scheme, token] = value.split(' ');

	if (!token) {
		return res.status(400).json({
			status: res.statusCode,
			message: 'Access Denied !'
		});
	}
	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			message: 'Invalid Token !'
		});
	}
};

module.exports = verifyToken;
