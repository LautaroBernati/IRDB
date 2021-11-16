const axios = require('axios');
const token = require('./token');

const apiClient = axios.create({
  baseURL: `http://localhost:4444`, //Hay que poner 4444 para la api
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTkxM2UzMTU2MWRmMGIxY2Y3M2E0MWMiLCJuYW1lIjoiQ2FtaWxhIiwiZW1haWwiOiJjYW1pQGFkbWluIiwiaWF0IjpudWxsLCJleHAiOjE2MzgxMTk2MzN9.xsxg6wtCm9X0RBta5wBhYlSrTlTCAv6z_pRh2UtRUPU',
  }
})

export default {
  logUserByEmailAndPassword(usuario) {
    return apiClient.post('/login', usuario)
  },
  getUsuarioId(id) {
    return apiClient.get('/usuarios/' + id)
  },
  getUsuario() {
    return apiClient.get('/usuarios')
  },
  postUsuario(usuario) {
    return apiClient.post('/register/', usuario)
  },
  deleteUsuario(id) {
    return apiClient.delete('/eliminarUsuario/' + id)
  },
  putUsuario(usuario) {
    let tokenUsuario = token.decodeToken(usuario)
    return apiClient.put('/modificarUsuario/' + usuario._id , tokenUsuario)
  },
}