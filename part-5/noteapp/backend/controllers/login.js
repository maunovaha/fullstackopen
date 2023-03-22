const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user.id
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 }); // Token expires in one hour
    res.status(200).json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
})

module.exports = loginRouter;