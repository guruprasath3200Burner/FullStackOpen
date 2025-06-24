const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_request, response) => {
  response.send("Hello World");
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const existingPerson = persons.find((n) => n.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: "Name must be unique" });
  }
  const newPerson = {
    id: (Math.random() * 10000).toFixed(0), // Simple

    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

app.get("/api/persons", (_request, response) => {
  if (persons.length === 0) {
    response.status(404).send({ error: "No persons found" });
  } else {
    response.json(persons);
  }
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((n) => n.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send({ error: "Person not found" });
  }
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
  const info = `Phone book has info for ${persons.length} people`;
  const date = new Date();
  response.send(`${info}\n${date}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
