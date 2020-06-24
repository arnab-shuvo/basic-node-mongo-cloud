const express = require('express');
// import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('./auth/auth');

dotenv.config();

// db connection
mongoose
	.connect('mongodb://localhost:27017/node-mongo', {
		useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected'))
	.catch((err) => console.log(`error connecting db::  ${err.message}`));

const app = express();
//bring in routes

const router = require('./routes');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(passport.initialize());
app.use('/', router);

const port = 3000;
app.listen(port, () => {
	console.log(`Listening ${port}`);
});
