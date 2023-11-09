const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, `../../.env.development`)
});

module.exports = {
	HOST: process.env.POSTGRES_HOST,
	USER: process.env.POSTGRES_USERNAME,
	PASSWORD: process.env.POSTGRES_PASSWORD,
	DB: process.env.POSTGRES_DB,
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
