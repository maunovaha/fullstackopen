const Note = require('../models/Note');
const User = require('../models/User');
const e2eRouter = require('express').Router();

e2eRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({});
  await User.deleteMany({});
  res.status(204).end();
});

module.exports = e2eRouter;