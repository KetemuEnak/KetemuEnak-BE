const express = require('express');
const cors = require('cors');

const authRouter = require('./app/routes/auth.router.js');
const eventsRoute = require('./app/routes/events.router.js');
const userRouter = require('./app/routes/test.router.js');
const EORouter = require('./app/routes/eventorganizer.router.js');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize
	.sync()
	.then(() => {
		console.log('Database connected.');
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

app.use('/eo', EORouter); // just for test, remove it later
// app.use('/test', userRouter); // just for test, remove it later
app.use('/auth', authRouter);
app.use('/events', eventsRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
