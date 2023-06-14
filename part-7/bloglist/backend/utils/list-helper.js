const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.length ? blogs.reduce(reducer, 0) : 0;
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return;
  }

  const likesCountByAuthor = blogs.reduce((allBlogs, blog) => {
    const likesCount = allBlogs[blog.author] ?? 0;
    return {
      ...allBlogs,
      [blog.author]: likesCount + blog.likes
    };
  }, {});

  const authorsOrderedByLikesCount = Object.fromEntries(Object.entries(likesCountByAuthor).sort(([,a],[,b]) => b - a));
  const mostPopularAuthor = Object.keys(authorsOrderedByLikesCount)[0];

  return {
    author: mostPopularAuthor,
    likes: likesCountByAuthor[mostPopularAuthor]
  };
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => favorite.likes > blog.likes ? favorite : blog;
  return blogs.length ? blogs.reduce(reducer) : undefined;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return;
  }

  const blogsCountByAuthor = blogs.reduce((allBlogs, blog) => {
    const blogsCount = allBlogs[blog.author] ?? 0;
    return {
      ...allBlogs,
      [blog.author]: blogsCount + 1
    };
  }, {});

  const authorsOrderedByBlogsCount = Object.fromEntries(Object.entries(blogsCountByAuthor).sort(([,a],[,b]) => b - a));
  const mostBloggedAuthor = Object.keys(authorsOrderedByBlogsCount)[0];

  return {
    author: mostBloggedAuthor,
    blogs: blogsCountByAuthor[mostBloggedAuthor]
  };
};

module.exports = { dummy, totalLikes, mostLikes, favoriteBlog, mostBlogs };
