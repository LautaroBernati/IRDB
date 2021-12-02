const axios = require('axios');
const tokenService = require('./token'); 
const store = require('../store/store')

const apiClient = axios.create({
  baseURL: `http://localhost:4444`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default {
  getRestaurante() {
    return apiClient.get('/restaurantes', {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  },
  getRestauranteId(id) {
    return apiClient.get('/restaurantes/' + id,  {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}}) 
  },
  postRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.post('/altaRestaurante/', {token} ,  {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  },
  deleteRestaurante(addressParam) {
    let resto = {
      address: addressParam,
    }
    let token = tokenService.createRestoToken(resto)
    return apiClient.delete('/eliminarRestaurante/' + token,  {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}} )
  },
  putRestaurante(restaurante) {
    let token = tokenService.createRestoToken(restaurante)
    return apiClient.put('/modificarRestaurante/', {token},  {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  }, 

}