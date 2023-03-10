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
  const { title, author, url, likes } = request.body;

  if (!title) {
    return response.status(400).json({ error: 'title is missing' });
  }

  if (!url) {
    return response.status(400).json({ error: 'url is missing' });
  }

  try {
    const blog = new Blog({ title, author, url, likes: likes || 0 });
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;
  const blog = { likes };

  if (!likes) {
    return response.status(400).json({ error: 'likes is missing' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    logger.error(err);
  }
});

module.exports = blogsRouter;
