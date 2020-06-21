const express = require('express');
// import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
dotenv.config();

// db connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected'))
	.catch((err) => console.log(`error connecting db::  ${err.message}`));

const app = express();
//bring in routes

const postRoutes = require('./routes/post');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', postRoutes);

const port = 3000;
app.listen(port, () => {
	console.log(`Listening ${port}`);
});
