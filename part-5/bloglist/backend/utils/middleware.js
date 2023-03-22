const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
};

const userExtractor = (request, response, next) => {
  // I see no need to implement this kind of functionality atm. because we only need the user.id
  // when creating and removing blogs; And that user.id we can get by reading the id
  // that is stored inside the jwt.
  logger.info('User extractor in action...');

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
