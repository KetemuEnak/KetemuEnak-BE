module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// HOST: process.env.POSTGRES_HOST,
//   USER: process.env.POSTGRESS_USERNAME,
//   PASSWORD: process.env.POSTGRESS_PASSWORD,
//   DB: process.env.POSTGRESS_DB,
