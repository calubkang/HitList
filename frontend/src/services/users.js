import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUser = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (newUserInfo) => {
  const response = await axios.post(baseUrl, newUserInfo)
  return response.data
}

const userService = {getUser, createUser}

export default userService