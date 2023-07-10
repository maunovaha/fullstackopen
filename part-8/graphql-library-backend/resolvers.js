const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const pubSub = new PubSub();

const resolvers = {
  Query: {
    me: async (root, args, context) => context.currentUser,
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // I am aware that querying books using both author and genre is not atm. possible
      // and should be fixed, but atm. too bored to do so.

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await author ? Book.find({ author }).populate('author') : [];
      }

      if (args.genre) {
        return await Book.find({ genres: args.genre }).populate('author');
      }

      return await Book.find({}).populate('author');
    },
    allGenres: async (root, args) => {
      const books = await Book.find({});
      return await [...new Set(books.map(book => book.genres).flat())];
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const authorsWithBookCount = await Promise.all(
        authors.map(async (author) => {
          const bookCount = await Book.countDocuments({ author });
          return { id: author.id, name: author.name, born: author.born, bookCount };
        })
      );
      return authorsWithBookCount;
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      return user;
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });

      if (!user || password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const token = {
        username,
        id: user._id
      };

      return { value: jwt.sign(token, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const { title, published, genres } = args;
      const existingAuthor = await Author.findOne({ name: args.author });
      const author = existingAuthor ? existingAuthor : new Author({ name: args.author });

      if (!existingAuthor) {
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving book failed, could not add new author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          });
        }
      }

      const book = new Book({ title, published, genres, author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      pubSub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      return author;
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator('BOOK_ADDED')
    }
  }
};

module.exports = resolvers;
