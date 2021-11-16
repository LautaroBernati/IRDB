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
  getRestaurante() {
    return apiClient.get('/restaurantes')
  },
  getRestauranteId(id) {
    return apiClient.get('/restaurantes/' + id)
  },
  postRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.post('/altaRestaurante/', {token})
  },
  deleteRestaurante(addressParam) {
    let resto = {
      address: addressParam,
    }
    let token = tokenService.createRestoToken(resto)
    return apiClient.delete('/eliminarRestaurante/', {token})
  },
  putRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.put('/modificarRestaurante/', {token})
  }
}