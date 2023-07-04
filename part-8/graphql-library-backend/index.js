require('dotenv').config(); // Reads the .env file variables

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /*
      let filteredBooks = [...books];

      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      }
      */
      return await Book.find({});
    },
    allAuthors: async () => {
      // authors.map(author => ({ ...author, bookCount: books.filter(book => book.author === author.name).length }))
      return await Author.find({});
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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

      return book;
    },
    editAuthor: (root, args) => {
      /*
      const author = authors.find(author => author.name === args.name);

      if (!author) {
        return null;
      }

      const modifiedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map(author => author.name === args.name ? modifiedAuthor : author);

      return modifiedAuthor;
      */
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
