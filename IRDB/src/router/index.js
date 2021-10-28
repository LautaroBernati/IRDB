import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LogIn from '../views/Login.vue'
import Register from '../views/Register.vue'
import AgregarResto from '../views/AgregarResto.vue'
import Usuarios from '../views/Usuarios.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/agregarResto',
    name: 'AgregarResto',
    component: AgregarResto
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
