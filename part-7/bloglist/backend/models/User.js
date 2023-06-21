const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // The `transform` block might be called multiple times when e.g. returning a blog from API
    // that contains multiple comments from the same user. Consequently, we do the conversion only
    // once to avoid getting the `Cannot read properties of undefined (reading 'toString')` -error.
    if (!returnedObject.hasOwnProperty('_id')) {
      return;
    }

    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // The password hash should not be revealed
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);