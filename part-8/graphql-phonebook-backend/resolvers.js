const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const Person = require('./models/Person');
const User = require('./models/User');
const pubSub = new PubSub();

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}); // .populate('friendOf');
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' }}); // .populate('friendOf');
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name })
  },
  Mutation: {
    addAsFriend: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const nonFriendAlready = (person) => {
        return !currentUser.friends.map(f => f._id.toString()).includes(person._id.toString());
      };

      const person = await Person.findOne({ name: args.name });

      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const person = new Person({ ...args });
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      // Notifies via WebSocket to client(s) that a new person is added
      pubSub.publish('PERSON_ADDED', { personAdded: person });

      return person;
    },
    editNumber: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }
      return person;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
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
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubSub.asyncIterator('PERSON_ADDED')
    }
  },
  Person: {
    address: ({ street, city }) => { // Destructs params from `root` 
      return {
        street,
        city
      };
    },
    // The query below will cause n+1 problem which could be fixed by storing
    // friendOf as part of Person schema, but not doing it atm, e.g.
    //
    // friendOf: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
    // ],
    friendOf: async (root) => {
      const friends = await User.find({
        friends: {
          $in: [root._id]
        }
      });
      return friends;
    }
  }
};

module.exports = resolvers;
