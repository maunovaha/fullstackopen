const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const helper = require('./test-helper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const contents = response.body.map(blog => blog.title);
  expect(contents).toContain('Best of blogs of 2021 with 50+ examples');
});

test('a blog should be marked with an id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String)
      })
    ])
  );
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'How to start blog',
    author: 'Anya Skrba',
    url: 'https://firstsiteguide.com/start-blog',
    likes: 11
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map(blog => blog.title);
  expect(contents).toContain('How to start blog');
});

test('blog is not added when title is missing', async () => {
  const newBlog = {
    author: 'Anya Skrba',
    url: 'https://firstsiteguide.com/start-blog',
    likes: 11
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('blog is not added when url is missing', async () => {
  const newBlog = {
    title: 'How to start blog',
    author: 'Anya Skrba',
    likes: 11
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('default value of likes should be zero when new blog is added', async () => {
  const newBlog = {
    title: 'How to start blog',
    author: 'Anya Skrba',
    url: 'https://firstsiteguide.com/start-blog'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toEqual(
    expect.objectContaining({
      likes: 0
    })
  );
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 when id is valid', async () => {
    const blogsBefore = await helper.blogsInDb();
    const blogToDelete = blogsBefore[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAfter.map(blog => blog.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('fails with status code 204 when blog does not exist', async () => {
    await api.delete(`/api/blogs/640b0bfc79365d4bdfb91621`).expect(204);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 when data is valid', async () => {
    const blogsBefore = await helper.blogsInDb();
    const blogToUpdate = blogsBefore[0];
    const updatedBlog = { likes: 1337 };
    
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: blogToUpdate.id,
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: updatedBlog.likes
      })
    );
  });

  test('fails with status code 400 when data is missing', async () => {
    const blogsBefore = await helper.blogsInDb();
    const blogToUpdate = blogsBefore[0];
    const updatedBlog = {};

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual({ error: 'likes is missing' });

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: blogToUpdate.id,
          likes: blogToUpdate.likes
        })
      ])
    );
  });

  test('fails with status code 404 when when blog does not exist', async () => {
    const updatedBlog = { likes: 7 };
    const response = await api
      .put('/api/blogs/640b0bfc79365d4bdfb91621')
      .send(updatedBlog)
      .expect(404);
    expect(response.body).toEqual({});
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

