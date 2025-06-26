import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

axios.interceptors.request.use(
  (config) => {
    // Log the request configuration
    console.log("Request:", config)
    return config
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error)
  }
)

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, create, update, setToken, deleteBlog }
