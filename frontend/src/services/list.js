import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/hitlist'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
 
  const response = await axios.get(baseUrl, {headers: {Authorization: token}})
  return response.data
}

const createHit = async newHit => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newHit, config)
  return response.data
}

const deleteHit = (hit) => {
  const request = axios.delete(`${baseUrl}/${hit.id}`)
  return request.then(response => response.data)
}

const updateHit = (hit, newObj) => {
  const request = axios.put(`${baseUrl}/${hit.id}`, newObj)
  return request.then(response => response.data)
}


const listService = {getAll, createHit, deleteHit, updateHit, setToken}
export default listService