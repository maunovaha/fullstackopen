require('dotenv').config(); // Reads the .env file variables

const express = require('express');
const cors = require('cors');
const Note = require('./models/Note');
const app = express();

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    content: content,
    important: important || false
  });

  note.save().then(savedNote => {
    res.json(savedNote);
  });
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  /* TODO...
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  */
  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
