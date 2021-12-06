import { createStore } from 'vuex';
//const token = require('../services/token');

const store = createStore({
    state() {
        return {
            usuario: null,  
            decodedUser: null
        }
    },
    mutations: {
        SET_USER_DATA(state, usuario) {
            state.usuario = usuario.usuario;
            
            let emailAdmin = usuario.decodedUser.email.split('@')[1];

            let esAdmin = false;

            if (emailAdmin === 'irdb.com') {

                esAdmin = true;

            }

            let user = {
                email: usuario.decodedUser.email,
                name: usuario.decodedUser.name,
                admin: esAdmin
            }

            localStorage.setItem('usuario', usuario);
            state.decodedUser = user;
        },
        CLEAR_USER_DATA(state) {
            localStorage.removeItem('usuario');
            state.usuario = null;
            state.decodedUser = null;
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
        },
        getToken(state) {
            return state.usuario
        }
    }
})

export default store