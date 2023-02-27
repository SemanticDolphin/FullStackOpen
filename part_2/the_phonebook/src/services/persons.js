import axios from "axios"

const SERVER_URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(SERVER_URL)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(SERVER_URL, newObject)
  return request.then(response => response.data)
}
const removePerson = (personId) => {
  const request = axios.delete(`${SERVER_URL}/${personId}`)
  return request // Probably not needed to extract the response data as it is just an empty object
}

const updateNumber = (personId, newObject) => {
  const request = axios.put(`${SERVER_URL}/${personId}`, newObject)
  return request.then(response => response.data)

}

export default { getAll, create, removePerson, updateNumber }
