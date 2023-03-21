const User = require('../models/User');
const Blog = require('../models/Blog');

const initialBlogs = (userId) => {
  return [
    {
      title: 'Best of blogs of 2021 with 50+ examples',
      author: 'Ogi Djuraskovic',
      url: 'https://firstsiteguide.com/examples-of-blogs',
      likes: 5,
      user: userId
    },
    {
      title: 'How to Paint',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.wikihow.com/Paint',
      likes: 22,
      user: userId
    }
  ];
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
