const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title: 'Best of blogs of 2021 with 50+ examples',
    author: 'Ogi Djuraskovic',
    url: 'https://firstsiteguide.com/examples-of-blogs',
    likes: 5
  },
  {
    title: 'How to Paint',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.wikihow.com/Paint',
    likes: 22
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
