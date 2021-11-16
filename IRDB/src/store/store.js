import { createStore } from 'vuex';
const token = require('../services/token');

const store = createStore({
    state() {
        return {
            usuario: null,  /* {id: 1224, email:"admin@admin", password: 1234, esAdmin:true, name:"administrador"} */
            decodedUser: null
        }
    },
    mutations: {
        SET_USER_DATA(state, usuario) {
            state.usuario = usuario
            token.decodeToken(state.usuario.usuario.data.token).then(tokenUser => {

                let emailAdmin = tokenUser.email.split('@')[1]

                let esAdmin = false;

                if (emailAdmin === 'irdb.com') {

                    esAdmin = true;

                }

                let user = {
                    email: tokenUser.email,
                    name: tokenUser.name,
                    admin: esAdmin
                }

                state.decodedUser = user
            }).catch(err => {
                console.log(err)
            })
            localStorage.setItem('usuario', usuario)
        },
        CLEAR_USER_DATA(state) {
            localStorage.removeItem('usuario')
            state.usuario = null
            state.decodedUser = null
        },
    },
    actions: {
        login({ commit }, usuario) {
            commit('SET_USER_DATA', usuario)
        },
        logout({ commit }) {
            commit('CLEAR_USER_DATA')
        },
    },
    getters: {
        islogin(state) {
            return !!state.usuario
        },
        getUsuario(state) {
            return state.decodedUser
        }
    }
})

export default store