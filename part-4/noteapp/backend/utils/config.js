require('dotenv').config(); // Reads the .env file variables

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = { PORT, MONGODB_URI };
