const mongoose = require('mongoose');
const supertest = require('supertest');
const Note = require('../models/Note');
const helper = require('./test-helper');
const app = require('../app');
const api = supertest(app);


describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
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

      const result = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(result.body).toEqual(noteToView);
    });

    test('fails with status code 404 when note does not exist', async () => {
      const result = await api.get(`/api/notes/640b0bfc79365d4bdfb91822`).expect(404);
      expect(result.body).toEqual({});
    });

    test('fails with status code 400 when id is invalid', async () => {
      const result = await api.get(`/api/notes/a-b-c-d-e-f-g`).expect(400);
      expect(result.body).toEqual({ error: 'malformatted id' });
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(n => n.content);
      expect(contents).toContain('async/await simplifies making async calls');
    });

    test('fails with status code 400 when data is invalid', async () => {
      const newNote = { important: true };

      await api.post('/api/notes').send(newNote).expect(400);

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

      const contents = notesAtEnd.map(r => r.content);
      expect(contents).not.toContain(noteToDelete.content);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});