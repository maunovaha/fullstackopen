const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({ error: 'invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user.id
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 }); // Token expires in one hour
    response.status(200).json({ token, username: user.username, name: user.name, id: user.id });
  } catch (error) {
    next(error);
  }
})

module.exports = loginRouter;