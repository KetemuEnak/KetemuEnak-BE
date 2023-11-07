require('dotenv').config();

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

// HOST: process.env.POSTGRES_HOST,
//   USER: process.env.POSTGRESS_USERNAME,
//   PASSWORD: process.env.POSTGRESS_PASSWORD,
//   DB: process.env.POSTGRESS_DB,
