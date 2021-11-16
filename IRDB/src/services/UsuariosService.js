const axios = require('axios');
const tokenService = require('./token');

const apiClient = axios.create({
  baseURL: `http://localhost:4444`, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MThkZTdhOTZkNmRiNzZlYTBhYWJlNWUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluIiwiaWF0IjoxNjM3MDMwMjY1LCJleHAiOjE2Mzc2MzUwNjV9.FB337LFgCE3lKGycpiZ7WNvH-WxUNeoMFiwAQSJJ050',
  }
})

export default {
  login(usuario) {
    return apiClient.post('/login', usuario)
  },
  getUsuarioId(id) {
    return apiClient.get('/usuarios/' + id)
  },
  getUsuario() {
    return apiClient.get('/usuarios')
  },
  postUsuario(usuario) {
    let token = tokenService.createToken(usuario)
    return apiClient.post('/register/', {token})
  },
  deleteUsuario(usuario) {
    let token = tokenService.createToken(usuario)
    return apiClient.delete('/eliminarUsuario/', {token})
  },
  putUsuario(usuario) {
    let tokenUsuario = tokenService.createToken(usuario)
    return apiClient.put('/modificarUsuario/', {tokenUsuario})
  },
}