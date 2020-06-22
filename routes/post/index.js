const express = require('express');
const { getPost, createPost } = require('../../Controllers/post');
const { postValidator } = require('../../validator');

const postRouter = express.Router();

postRouter.get('/', getPost);
postRouter.post('/', postValidator, createPost);

module.exports = postRouter;
