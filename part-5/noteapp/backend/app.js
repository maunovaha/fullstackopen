const express = require('express');
// To get rid of typing try/catch inside methods I could install express-async-errors and require it here
// using require('express-async-errors');
//
// However, I don't like to hide catching exceptions inside a library so I am not doing it atm.
// Read more: https://fullstackopen.com/osa4/backendin_testaaminen#try-catchin-eliminointi
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
