const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 100000);
}

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    phoneNumber: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    phoneNumber: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    phoneNumber: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    phoneNumber: '39-23-6423122'
  }
];

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is missing' });
  }

  if (persons.find(person => person.name === name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  if (!phoneNumber) {
    return res.status(400).json({ error: 'phoneNumber is missing' });
  }

  const person = { name, phoneNumber, id: generateId() };
  persons = persons.concat(person);

  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
