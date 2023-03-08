const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  test('should return zero for empty list', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7
      }, 
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Best of blogs of 2021 with 50+ examples',
        author: 'Ogi Djuraskovic',
        url: 'https://firstsiteguide.com/examples-of-blogs',
        likes: 5
      }
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(12);
  });
});

describe('mostLikes', () => {
  test('should return undefined for empty list', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(undefined);
  });

  test('should return details of an author with most likes', () => {
    const blogs = [
      {
        id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7
      },
      {
        id: '5a422aa71b54a676234d17f0',
        title: 'How to Paint',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.wikihow.com/Paint',
        likes: 22
      }, 
      {
        id: '5a422aa71b54a676234d17f5',
        title: 'Do it yourself',
        author: 'Anya Skrba',
        url: 'https://en.wikipedia.org/wiki/Do_it_yourself',
        likes: 2
      },
      {
        id: '5a422aa71b54a676234d17f1',
        title: 'Cool design',
        author: 'Anya Skrba',
        url: 'https://cooldesign.fr',
        likes: 2
      },
      {
        id: '5a422aa71b54a676234d17f9',
        title: 'How to start blog',
        author: 'Anya Skrba',
        url: 'https://firstsiteguide.com/start-blog',
        likes: 11
      },
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Best of blogs of 2021 with 50+ examples',
        author: 'Ogi Djuraskovic',
        url: 'https://firstsiteguide.com/examples-of-blogs',
        likes: 5
      }
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 29
    });
  });
});

describe('favoriteBlog', () => {
  test('should return undefined for empty list', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(undefined);
  });

  test('should return details of a most popular blog', () => {
    const blogs = [
      {
        id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7
      }, 
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Best of blogs of 2021 with 50+ examples',
        author: 'Ogi Djuraskovic',
        url: 'https://firstsiteguide.com/examples-of-blogs',
        likes: 5
      },
      {
        id: '5a422aa71b54a676234d17f9',
        title: 'How to start blog',
        author: 'Anya Skrba',
        url: 'https://firstsiteguide.com/start-blog',
        likes: 11
      }
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      id: '5a422aa71b54a676234d17f9',
      title: 'How to start blog',
      author: 'Anya Skrba',
      url: 'https://firstsiteguide.com/start-blog',
      likes: 11
    });
  });
});

describe('mostBlogs', () => {
  test('should return undefined for empty list', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(undefined);
  });

  test('should return details of an author with most blogs', () => {
    const blogs = [
      {
        id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7
      }, 
      {
        id: '5a422aa71b54a676234d17f5',
        title: 'Cool design',
        author: 'Anya Skrba',
        url: 'https://cooldesign.fr',
        likes: 2
      },
      {
        id: '5a422aa71b54a676234d17f9',
        title: 'How to start blog',
        author: 'Anya Skrba',
        url: 'https://firstsiteguide.com/start-blog',
        likes: 11
      },
      {
        id: '5a422aa71b54a676234d17f8',
        title: 'Best of blogs of 2021 with 50+ examples',
        author: 'Ogi Djuraskovic',
        url: 'https://firstsiteguide.com/examples-of-blogs',
        likes: 5
      }
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Anya Skrba",
      blogs: 2
    });
  });
});
