import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRestaurante() {
    return apiClient.get('/restaurantes')
  },
  postRestaurante(restaurante) {
    return apiClient.post('/restaurantes/', restaurante)
  },
  deleteRestaurante(id) {
    return apiClient.delete('/restaurantes/' + id)
  },
  putRestaurante(restaurante) {
      console.log(restaurante)
      return ('/restaurantes/' + restaurante.id , restaurante)
  },
}