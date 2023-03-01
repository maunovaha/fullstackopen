require('dotenv').config(); // Reads the .env file variables

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
const app = express();

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(error);
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', async (req, res, next) => {
  try {
    const personCount = await Person.countDocuments({}).exec();
    res.send(`
      <p>Phonebook has info for ${personCount} people.</p>
      <p>${new Date()}</p>
    `);
  } catch (error) {
    next(error);
  }
});

app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.post('/api/persons', async (req, res, next) => {
  const { name, phoneNumber } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  if (!phoneNumber) {
    return res.status(400).json({ error: 'phoneNumber is missing' });
  }

  try {
    const existingPerson = await Person.findOne({ name: name }).exec();

    if (existingPerson) {
      return res.status(400).json({ error: 'name must be unique' });
    }

    const person = new Person({ name, phoneNumber });
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const person = { name, phoneNumber };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, person, { new: true });
    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
