const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
// When a model, such as User, is imported in this file the mongoose creates
// a new collection for it in case it's missing. However, I don't think this
// logic is very transparent, but in case you are getting MissingSchemaError
// you might have forgotten to import your model.
const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

blogsRouter.get('/', async (_, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name'
        },
        select: 'message'
      });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
    const { title, author, url, likes } = request.body;

    if (!title) {
      return response.status(400).json({ error: 'title is missing' });
    }

    if (!url) {
      return response.status(400).json({ error: 'url is missing' });
    }
  
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ title, author, url, likes: likes || 0, user: user.id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
    const { message } = request.body;

    if (!message) {
      return response.status(400).json({ error: 'message is missing' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    const comment = new Comment({ message, user: user.id, blog: blog.id });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment.id);
    await blog.save();
    response.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
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
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(400).json({ error: 'cannot delete a blog belonging to other user' });
    }

    await Blog.findByIdAndRemove(blog.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
