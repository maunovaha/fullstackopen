const mongoose = require('mongoose');
const listExistingPhoneNumbers = process.argv.length === 3;
const addNewPhoneNumber = process.argv.length === 5;

if (!listExistingPhoneNumbers && !addNewPhoneNumber) {
  console.log("Usage:");
  console.log('  node mongo.js yourpassword \t\t\t List existing phone numbers');
  console.log('  node mongo.js yourpassword Anna 040-1234556 \t Add new phone number');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://maunovaha:${password}@fullstackopen.ek0jibx.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({ name: String, phoneNumber: String });
const Person = mongoose.model('Person', personSchema);

if (listExistingPhoneNumbers) {
  console.log("Phonebook:");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.phoneNumber}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];
  const person = new Person({ name, phoneNumber });

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.phoneNumber} to phonebook.`);
    mongoose.connection.close();
  });
}
