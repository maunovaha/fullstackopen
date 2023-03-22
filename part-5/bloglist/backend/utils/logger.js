const log = (logger, ...params) => {
  if (process.env.NODE_ENV !== 'test') {
    logger(...params);
  }
};

const info = (...params) => {
  log(console.log, ...params);
};

const error = (...params) => {
  log(console.error, ...params);
};

module.exports = { info, error };
