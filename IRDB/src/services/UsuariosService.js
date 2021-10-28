import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:4444`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getUsuario() {
    return apiClient.get('/usuarios')
  },
  postUsuario(usuario) {
    return apiClient.post('/usuarios/', usuario)
  },
  deleteUsuario(id) {
    return apiClient.delete('/usuarios/' + id)
  },
  putUsuario(usuario) {
      console.log(usuario)
      return ('/usuarios/' + usuario.id , usuario)
  },
}