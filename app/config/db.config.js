const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, `../../.env.development`)
});

module.exports = {
	HOST: process.env.POSTGRES_HOST || 'db',
	USER: process.env.POSTGRES_USERNAME || 'postgres',
	PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
	DB: process.env.POSTGRES_DB || 'ketemuenak_dev',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
