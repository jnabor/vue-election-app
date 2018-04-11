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
    errcode: '',
    authenticated: false
  },
  mutations: {
    signOut (state) {
      state.cognitoUser.signOut()
      state.authenticated = false
      state.username = ''
      state.userPool = []
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('signOut')
      }, expirationTime)
    },
    signOut ({ commit }) {
      commit('signOut')
      router.push('/home')
    },
    getAuthenticatedUser (state) {
      return state.userPool.getCurrentUser()
    },
    signIn ({ commit, state }, authData) {
      state.errcode = ''
      state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      let authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
      let userData = {
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
          state.errcode = JSON.stringify(err.code)
        }
      })
    }
  }
})
