import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/hitlist'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createHit = (newHit) => {
  const request = axios.post(baseUrl, newHit)
  return request.then(response => response.data)
}

const deleteHit = (hit) => {
  const request = axios.delete(`${baseUrl}/${hit.id}`)
  return request.then(response => response.data)
}

const updateHit = (hit, newObj) => {
  const request = axios.put(`${baseUrl}/${hit.id}`, newObj)
  return request.then(response => response.data)
}


const listService = {getAll, createHit, deleteHit, updateHit}
export default listService