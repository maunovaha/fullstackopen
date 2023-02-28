require('dotenv').config(); // Reads the .env file variables

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', async (req, res) => {
  const personCount = await Person.countDocuments({}).exec();
  res.send(`
    <p>Phonebook has info for ${personCount} people.</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons', async (req, res) => {
  const people = await Person.find({});
  res.json(people);
});

app.post('/api/persons', async (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  /* TODO...
  if (persons.find(person => person.name === name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }
  */

  if (!phoneNumber) {
    return res.status(400).json({ error: 'phoneNumber is missing' });
  }

  const person = new Person({ name, phoneNumber });
  const savedPerson = await person.save();

  res.json(savedPerson);
});

app.get('/api/persons/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  /* TODO...
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  */
  res.status(204).end();
});

const PORT = process.env.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
