import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:4444`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
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
    return apiClient.post('/restaurantes/', restaurante)
  },
  deleteRestaurante(id) {
    return apiClient.delete('/restaurantes/' + id)
  },
  putRestaurante(restaurante) {
      return apiClient.put('/restaurantes/' + restaurante.id , restaurante)
  },
}