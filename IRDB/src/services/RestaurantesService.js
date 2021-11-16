const axios = require('axios');
const tokenService = require('./token');

const apiClient = axios.create({
  baseURL: `http://localhost:4444`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTkxM2UzMTU2MWRmMGIxY2Y3M2E0MWMiLCJuYW1lIjoiQ2FtaWxhIiwiZW1haWwiOiJjYW1pQGFkbWluIiwiaWF0IjpudWxsLCJleHAiOjE2MzgxMTk2MzN9.xsxg6wtCm9X0RBta5wBhYlSrTlTCAv6z_pRh2UtRUPU',
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
    return apiClient.post('/altaRestaurante/', token)
  },
  deleteRestaurante(id) {
    return apiClient.delete('/eliminarRestaurante/' + id)
  },
  putRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.put('/modificarRestaurante/', token)
  }
}