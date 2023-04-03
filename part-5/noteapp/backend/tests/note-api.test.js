const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const User = require('../models/User');
const Note = require('../models/Note');
const helper = require('./test-helper');
const app = require('../app');
const api = supertest(app);

describe('when there is initially some notes saved for particular user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'Mr. Root Boi', passwordHash });
    await user.save();
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only JavaScript');
  });

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const response = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual(noteToView);
    });

    test('fails with status code 404 when note does not exist', async () => {
      const response = await api.get(`/api/notes/640b0bfc79365d4bdfb91822`).expect(404);
      expect(response.body).toEqual({});
    });

    test('fails with status code 400 when id is invalid', async () => {
      const response = await api.get(`/api/notes/a-b-c-d-e-f-g`).expect(400);
      expect(response.body).toEqual({ error: 'malformatted id' });
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const allUsers = await helper.usersInDb();
      const user = allUsers[0];
      const userForToken = {
        username: user.username,
        id: user.id
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 }); // Token expires in one hour
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(note => note.content);
      expect(contents).toContain('async/await simplifies making async calls');
    });

    test('fails with status code 400 when data is invalid', async () => {
      const allUsers = await helper.usersInDb();
      const user = allUsers[0];
      const userForToken = {
        username: user.username,
        id: user.id
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 }); // Token expires in one hour
      const newNote = { important: true };

      await api
        .post('/api/notes')
        .set('Authorization', 'Bearer ' + token) 
        .send(newNote).expect(400);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
    });
  });
  
  describe('deletion of a note', () => {
    test('succeeds with status code 204 when id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

      const contents = notesAtEnd.map(note => note.content);
      expect(contents).not.toContain(noteToDelete.content);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});