import axios from 'axios'
import { useEffect, useState } from 'react'

const SERVER_URL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  useEffect(() => {
    axios
      .get(SERVER_URL)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameFilter = (event) => setNameFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const normalizeName = (name) => (name.replace(/\s+/g, '').toLowerCase());

  const canNotAddNameToPhonebook = (name) => {
    const existingNames = persons.reduce((previous, current) => {
      // return previous.concat(current.name) //Simple comparison
      return previous.concat(normalizeName(current.name)) //Removes spaces and sets name to lowercase to make comparison stricter
    }, [])
    // return existingNames.includes(name); // Simple comparison
    return existingNames.includes(normalizeName(name));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }
    canNotAddNameToPhonebook(newName) ?
      alert(`${newName} is already in the Phonebook`) :
      axios
        .post(SERVER_URL, newPerson)
        .then(res => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewNumber('')
        })
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
      <Persons persons={filteredPersons} />
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
const Persons = ({ persons }) => {
  return (
    persons.map((person => <Person key={person.id} name={person.name} number={person.number} />))
  )
}

const Person = ({ name, number }) => {
  return (
    <p>
      {name} | {number}
    </p>
  )
}

export default App
