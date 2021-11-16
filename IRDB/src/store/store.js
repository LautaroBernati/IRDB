import {createStore} from 'vuex';
const token = require('../services/token');

const store = createStore({
    state() {
        return {
            usuario: null  /* {id: 1224, email:"admin@admin", password: 1234, esAdmin:true, name:"administrador"} */
        }
    },
    mutations: {
        SET_USER_DATA(state, usuario) {
            state.usuario = usuario
            console.log(state.usuario.usuario.data)
            localStorage.setItem('usuario', usuario)
        },
        CLEAR_USER_DATA(state){
            localStorage.removeItem('usuario')
            state.usuario = null
        }
    },
    actions: {
        login({ commit }, usuario) {
           commit('SET_USER_DATA', usuario)
        },
        logout({ commit }){
            commit('CLEAR_USER_DATA')
        }
    },
    getters: {
        islogin(state) {
            return !!state.usuario
        },
        getUsuario(state){
            token.decodeToken(state.usuario).then(data => {
                let user = {
                    email: data.email,
                    name: data.name,
                    admin: false
                }
                console.log(user)
                return user
            }).catch(err => {
                console.log(err)
            })
            return {}
        }
    }
})

export default store