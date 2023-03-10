require('dotenv').config(); // Reads the .env file variables

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;

module.exports = { PORT, MONGODB_URI }