import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClassName, setNotificationClassName] = useState(
    "notification"
  );

  const setNotification = (message, className) => {
    setNotificationMessage(message);
    setNotificationClassName(className);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 2000);
  };

  const filteredPersons =
    filter.trim().length === 0
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    personsService.getAll().then(persons => setPersons(persons));
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const addPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(person =>
      person.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then(person => {
            setPersons(
              persons.map(actualPerson =>
                actualPerson.id === existingPerson.id ? person : actualPerson
              )
            );
            setNotification(`Updated ${person.name}`, "successful");
          })
          .catch(_ => {
            setNotification(
              `Information of ${
                newPerson.name
              } has already been removed from server`,
              'error'
            );
          });
      }
    } else {
      personsService.create(newPerson).then(person => {
        setPersons(persons.concat(person));
        setNotification(`Added ${person.name}`, "successful");
      })
      .catch(error => {
        setNotification(error.error);
      });
    }
  };

  const deletePerson = id => () => {
    const personToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        notificationClassName={notificationClassName}
      />
      <Filter filterField={filter} filterFieldHandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPersonHandler={addPerson}
        newNameField={newName}
        newNameFieldHandler={handleNameChange}
        newNumberField={newNumber}
        newNumberFieldHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
