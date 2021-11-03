import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`, //Hay que poner 4444 para la api
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