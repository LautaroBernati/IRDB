const axios = require('axios');
const tokenService = require('./token');
const store = require('../store/store');

const apiClient = axios.create({
  baseURL: `http://localhost:4444`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:/*  `Bearer ${store/* .default._state.usuario.usuario.data.token} `*/ 
    
     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MThkZTdhOTZkNmRiNzZlYTBhYWJlNWUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluIiwiaWF0IjoxNjM3MDMwMjY1LCJleHAiOjE2Mzc2MzUwNjV9.FB337LFgCE3lKGycpiZ7WNvH-WxUNeoMFiwAQSJJ050',
  }
})

export default {
  getRestaurante() {
    //console.log(store.default.getters.getToken.usuario.data.token)
    //console.log(store.default._state.data.usuario.usuario.data.token)
    
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
    console.log(token)
    return apiClient.delete('/eliminarRestaurante/', 
    { data: { token: token}})
  },
  putRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.put('/modificarRestaurante/', {token})
  }, 

}