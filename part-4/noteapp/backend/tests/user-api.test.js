const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/User');
const helper = require('./test-helper');
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersBefore = await helper.usersInDb();
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    const usernames = usersAfter.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with status code 400 and message if username is already taken', async () => {
    const usersBefore = await helper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual({ 
      error: 'User validation failed: username: Error, expected `username` to be unique. Value: `root`'
    });

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});