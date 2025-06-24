const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length == 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://Guru:${password}@phonebook-backend.unj6q7z.mongodb.net/phonebook?retryWrites=true&w=majority&appName=PhoneBook-Backend`;

  mongoose.connect(url);
  const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
  });
  const Entry = mongoose.model("Entry", entrySchema);
  Entry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length == 5) {
  const password = process.argv[2];

  const name = process.argv[3];
  const number = process.argv[4];

  const generatedId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    return randomNumber;
  };
  const url = `mongodb+srv://Guru:${password}@phonebook-backend.unj6q7z.mongodb.net/phonebook?retryWrites=true&w=majority&appName=PhoneBook-Backend`;

  mongoose.connect(url);
  const entrySchema = new mongoose.Schema({
    id: String,
    content: String,
    number: String,
  });
  const Entry = mongoose.model("Entry", entrySchema);
  const entry = new Entry({
    id: generatedId(),
    name: name,
    number: number,
  });

  entry.save().then((result) => {
    console.log("entry saved!");
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments");
  process.exit(1);
}
