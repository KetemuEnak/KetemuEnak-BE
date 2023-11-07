require('dotenv').config();

const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USERNAME;
const pass = process.env.POSTGRES_PASSWORD;
const db = process.env.POSTGRES_DB;
console.log({ host, user, pass, db });
