const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB');
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB:', err.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
