const blogsRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/Blog');

blogsRouter.get('/', async (_, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (err) {
    logger.error(err);
  }
});

module.exports = blogsRouter;
