import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
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
    canNotAddNameToPhonebook(newName) ?
      alert(`${newName} is already in the Phonebook`) :
      setPersons([...persons, { name: newName }])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App