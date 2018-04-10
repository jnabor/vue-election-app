import Vue from 'vue'
import Vuex from 'Vuex'
import router from '../routes'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userPool: [],
    cognitoUser: '',
    username: '',
    authenticated: false
  },
  mutations: {
    authUser (state) {

    },
    storeUser (state) {

    },
    clearAuthData (state) {
      state.authenticated = false
      state.username = ''
      state.cognitoUser = ''
      state.userPool = []
    }
  },
  actions: {
    signOut ({commit}) {
      commit('clearAuthData')
      router.push('/home')
    }
  },
  getters: {

  }
})
