const Blog = require('../models/Blog');
const User = require('../models/User');
const e2eRouter = require('express').Router();

e2eRouter.post('/reset', async (_, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

module.exports = e2eRouter;