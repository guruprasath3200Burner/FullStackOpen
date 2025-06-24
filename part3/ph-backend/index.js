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

app.get("/", (_request, response) => {
  response.send("Hello World");
});

app.get("/api/persons", (_request, response) => {
  Entry.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
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

app.get("/api/persons/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => {
      next(error);
      // console.error("Error fetching person:", error);
      // response.status(400).send({ error: "Malformatted ID - Guru" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Entry.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const entry = {
    name: body.name,
    number: body.number,
    id: (Math.random() * 10000).toFixed(0),
  };

  Entry.findByIdAndUpdate(String(request.params.id), entry, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.get("/api/info", (_request, response) => {
  Entry.countDocuments().then((count) => {
    const info = `Phone book has info for ${count} people`;
    const date = new Date();
    response.send(`${info}\n${date}`);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
