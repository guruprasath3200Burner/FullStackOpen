import { useState, useEffect } from "react";
import "./App.css";
import personService from "./services/persons.js";

import Persons from "./components/Persons.jsx";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    msg: null,
    type: "error",
  });

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }
      const person = persons.find((person) => person.name === newName);
      personService
        .update(person.id, { ...person, number: newNumber })
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : response.data))
          );
          setErrorMessage({
            msg: `Updated ${newName}`,
            type: "success",
          });
          setTimeout(() => {
            setErrorMessage({ msg: null, type: "error" });
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage({
            msg: `Information of ${newName} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage({ msg: null, type: "error" });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });

      setNewName("");
      setNewNumber("");

      return;
    }
    personService
      .create({ name: newName, number: newNumber })
      .then((response) => {
        setPersons(persons.concat(response.data));
        setErrorMessage({
          msg: `Added ${newName}`,
          type: "success",
        });
      })
      .catch((error) => {
        setErrorMessage({
          msg: error.response.data.error,
          type: "error",
        });
      });
    setTimeout(() => {
      setErrorMessage({ msg: null, type: "error" });
    }, 5000);
    // Clear input fields after submission

    setNewName("");
    setNewNumber("");
  };
  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setErrorMessage({
            msg: `Information of the person has already been removed from server`,
            type: "error",
          });
          personService.getAll().then((response) => {
            setPersons(response.data);
          });
          setTimeout(() => {
            setErrorMessage({ msg: null, type: "error" });
          }, 5000);
        });
    }
  };

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <Notification msg={errorMessage.msg} type={errorMessage.type} />
      <h2>Phonebook</h2>
      <Filter filter={filter} OnFilterChange={onFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={onSubmit}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.length > 0 ? (
          <Persons persons={filteredPersons} onDeletePerson={onDeletePerson} />
        ) : (
          <>No numbers with filter {filter}</>
        )}
      </ul>
    </div>
  );
};

const Notification = ({ msg, type }) => {
  if (!msg) {
    return null;
  }

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return (
    <>
      {type === "success" ? (
        <div style={successStyle}>{msg}</div>
      ) : (
        <div style={errorStyle}>{msg}</div>
      )}
    </>
  );
};

export default App;
