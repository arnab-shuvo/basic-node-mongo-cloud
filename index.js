const express = require('express');
// import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const passport = require('passport');
require('./auth/auth');

dotenv.config();

// db connection
mongoose
	.connect('mongodb://mongo:27018/nodejs', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected'))
	.catch((err) => console.log(`error connecting db::  ${err.message}`));

const app = express();
//bring in routes

const router = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(passport.initialize());
app.use('/', router);

const port = 3000;
app.listen(port, () => {
	console.log(`Listening ${port}`);
});
