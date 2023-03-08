const notesRouter = require('express').Router();
const Note = require('../models/Note');

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (req, res, next) => {
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

notesRouter.get('/:id', async (req, res, next) => {
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

notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body;
  const note = { content, important };

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: 'query' });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;