const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (_, response, next) => {
  try {
    // Using `populate` makes several queries to MongoDB so that we return list of blogs
    // with their data, rather than just a list of blog -ids.
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    
    if (!username || username.length < 3) {
      return response.status(400).json({ error: 'username is missing or under 3 marks' });
    }

    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'password is missing or under 3 marks' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is missing' });
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
