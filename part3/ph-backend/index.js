const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Entry = require("./models/persons");

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// const password = process.argv[2];
// const url = `mongodb+srv://Guru:${password}@phonebook-backend.unj6q7z.mongodb.net/phonebook?retryWrites=true&w=majority&appName=PhoneBook-Backend`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (_request, response) => {
  response.send("Hello World");
});

app.get("/api/persons", (_request, response) => {
  Entry.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.error("Error fetching persons:", error);
      response.status(500).send({ error: "Failed to fetch persons" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }
  const entry = new Entry({
    ...body,
    id: (Math.random() * 10000).toFixed(0),
  });

  entry.save().then((result) => {
    response.status(201).json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Entry.findById(request.params.id).then((entry) => {
    response.json(entry);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const initialLength = persons.length;
  persons = persons.filter((n) => n.id !== id);
  if (persons.length < initialLength) {
    response.status(204).end();
  } else {
    response.status(404).send({ error: "Person not found" });
  }
});

app.get("/api/info", (_request, response) => {
  Entry.countDocuments().then((count) => {
    const info = `Phone book has info for ${count} people`;
    const date = new Date();
    response.send(`${info}\n${date}`);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
