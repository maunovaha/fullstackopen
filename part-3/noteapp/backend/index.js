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
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.get('/api/notes', async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

app.post('/api/notes', async (req, res, next) => {
  const { content, important } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content missing' });
  }

  try {
    const note = new Note({ content: content, important: important || false });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    next(error);
  }
});

app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.put('/api/notes/:id', async (req, res, next) => {
  const { content, important } = req.body;
  const note = { content, important };

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: 'query' });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
