import axios from 'axios'

const apiServer = 'https://todos.d.simpleinfo.tw/api'
const apiKey = process.env.APIKEY || ''

const createRequest = axios.create({
  baseURL: apiServer,
  headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
})

export default {
  get: () => createRequest.get('/todos'),
  post: (data) => createRequest.post('/todos', data),
  put: (todoId, data) => createRequest.post(`/todos/${todoId}`, data),
  delete: (todoId) => createRequest.delete(`/todos/${todoId}`),
}
