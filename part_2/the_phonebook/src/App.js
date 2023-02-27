import axios from 'axios'
import { useEffect, useState } from 'react'
import personServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => console.log(`something went wrong: ${error}`))
  }, [])

  const handleNameFilter = (event) => setNameFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const normalizeName = (name) => (name.replace(/\s+/g, '').toLowerCase());

  const nameExists = (name) => {
    const existingNames = persons.reduce((previous, current) => {
      // return previous.concat(current.name) //Simple comparison
      return previous.concat(normalizeName(current.name)) //Removes spaces and sets name to lowercase to make comparison stricter
    }, [])
    // return existingNames.includes(name); // Simple comparison
    return existingNames.includes(normalizeName(name));
  }

  const personIdFromName = (name) => {
    const foundPerson = persons.find(person => normalizeName(person.name) === normalizeName(name))
    return foundPerson.id
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }

    nameExists(newName) ?
      window.confirm(`${newName} is already in the phonebook. Do you want to replace the number with the new one`) &&
      personServices
        .updateNumber(personIdFromName(newName), newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(`error: ${error}`)) :
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(`error: ${error}`))
  }

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Do you want to remove ${name} from the phonebook`)) {
      personServices
        .removePerson(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => (console.log(`error: ${error}`)));

    }
  }

  const filteredPersons = persons.filter(person => normalizeName(person.name).includes(normalizeName(nameFilter)))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleNameFilter} value={nameFilter} />
      <h2>Add a new person</h2>
      <PersonForm
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

const Filter = ({ onChange, value }) => {
  return (
    <p>Fitler shown with <input onChange={onChange} value={value} /></p>
  )
}

const PersonForm = ({ name, number, handleSubmit, handleNameChange, handleNumberChange, }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={name} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({ persons, removePerson }) => {
  return (
    persons.map((person => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        removePerson={() => removePerson(person)}
      />)
    ))
  )
}

const Person = ({ name, number, removePerson }) => {
  return (
    <p>
      {name} | {number} <button onClick={removePerson}>Delete</button>
    </p>
  )
}

export default App
