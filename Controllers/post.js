const Post = require('../models/post');

exports.getPost = (req, res) => {
	const post = Post.find()
		.select('_id title body')
		.then((posts) => {
			res.json({
				posts,
			});
		})
		.catch((err) => {
			console.log(err, 'hetting post error');
		});
};
exports.createPost = (req, res) => {
	const post = new Post(req.body);
	post.save().then((result) => {
		res.json({
			post: result,
		});
	});
};
