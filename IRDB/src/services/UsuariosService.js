const axios = require('axios');
const tokenService = require('./token');
const store = require('../store/store');

const apiClient = axios.create({
  baseURL: `http://localhost:4444`, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default {
  login(usuario) {
    return apiClient.post('/login', usuario);
  },
  getUsuarioId(id) {
    return apiClient.get('/usuarios/' + id, {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  },
  getUsuario() {
    return apiClient.get('/usuarios', {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  },
  postUsuario(usuario) {
    let token = tokenService.createToken(usuario)
    return apiClient.post('/register/', {token})
  },
  deleteUsuario(usuario) {
    let token = tokenService.createToken(usuario)
    return apiClient.delete('/eliminarUsuario/' + token)
  },
  putUsuario(usuario) {
    let token = tokenService.createToken(usuario)
    return apiClient.put('/modificarUsuario/', {token}, {headers: {Authorization: `Bearer ${store.default.getters.getToken.usuario.data.token}`}})
  },
}
