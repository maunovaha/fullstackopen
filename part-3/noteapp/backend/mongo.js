const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://maunovaha:${password}@fullstackopen.ek0jibx.mongodb.net/noteapp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({ content: String, important: Boolean });
const Note = mongoose.model('Note', noteSchema);

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});
