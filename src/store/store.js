import Vue from 'vue'
import Vuex from 'Vuex'
import router from '../routes'
import * as config from '../components/config'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userPool: [],
    cognitoUser: '',
    username: '',
    authenticated: false
  },
  mutations: {
    authUser (state, authData) {
      var authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
      state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      var userData = {
        Username: authData.Username,
        Pool: state.userPool
      }
      state.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      state.cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('sign in success')
          state.authenticated = true
          state.username = authData.Username
          router.push('/profile')
        },
        onFailure: (err) => {
          console.log('sign in failure')
          console.log(err.code)
        }
      })
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
    signIn ({commit}, authData) {
      commit('authUser', authData)
    },
    signOut ({commit}) {
      commit('clearAuthData')
      router.push('/home')
    }
  },
  getters: {

  }
})
