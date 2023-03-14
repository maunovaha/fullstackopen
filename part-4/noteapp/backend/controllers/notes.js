const notesRouter = require('express').Router();
const User = require('../models/User');
const Note = require('../models/Note');

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (req, res, next) => {
  const { content, important, userId } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content missing' });
  }

  try {
    const user = await User.findById(userId);
    const note = new Note({ content, important: important || false, user: user.id });
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
    res.status(201).json(savedNote);
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