import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            usuario: null
        }
    },
    mutations: {
        SET_USER_DATA(state, usuario) {
            state.usuario = usuario
            console.log(state.usuario)
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
        }
    }
})

export default store