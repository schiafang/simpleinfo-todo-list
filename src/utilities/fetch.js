import axios from 'axios'

const apiServer = 'https://todos.d.simpleinfo.tw/api'
const apiKey = '2dd86b5f-2e51-4181-aed4-8ccccf90c31a'

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
