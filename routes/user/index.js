const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { signUpValidator, loginValidator } = require('../../validator');

router.post(
	'/login',
	loginValidator,
	passport.authenticate('login', { session: false }),
	(req, res) => {
		res.json(req.user);
	},
);
//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post(
	'/registration',
	signUpValidator,
	passport.authenticate('signup', { session: false }),
	(req, res) => {
		if (req.user.status) {
			res.json(req.user);
		}
		res.status(401).json({
			message: req.authInfo.message,
		});
	},
);

module.exports = router;
