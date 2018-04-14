import Vue from 'vue'
import Vuex from 'Vuex'
import router from '../routes'
import * as config from '../config'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userPool: [],
    authDetails: '',
    userData: '',
    cognitoUser: '',
    username: '',
    errcode: '',
    authenticated: false
  },
  getters: {
  },
  mutations: {
    signOut (state) {
      state.cognitoUser.signOut()
      state.authenticated = false
      state.username = ''
      state.userPool = []
    },
    signIn (state) {
      state.authenticated = true
    },
    setUserPool (state) {
      state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
    },
    setCognitoUser (state, payload) {
      state.cognitoUser = payload
    },
    setCognitoDetails (state, authData) {
      state.authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
      state.userData = { Username: authData.Username, Pool: state.userPool }
      state.cognitoUser = new AmazonCognitoIdentity.CognitoUser(state.userData)
    },
    setUsername (state, payload) {
      state.username = payload
    },
    setError (state, payload) {
      state.errcode = payload
    },
    clearError (state) {
      state.errcode = ''
    }
  },
  actions: {
    signIn ({ commit, state, dispatch }, authData) {
      commit('clearError')
      commit('setUserPool')
      commit('setCognitoDetails', authData)
      state.cognitoUser.authenticateUser(state.authDetails, {
        onSuccess: (result) => {
          console.log('sign in success')
          commit('signIn')
          commit('setUsername', authData.Username)
          router.push('/profile')
          dispatch('setLogoutTimer', 3600)
        },
        onFailure: (err) => {
          console.log('sign in failure')
          commit('setError', JSON.stringify(err.code))
        }
      })
    },
    tryAutoSignIn ({ commit, state, dispatch }) {
      commit('setUserPool')
      let cognitoUser = state.userPool.getCurrentUser()
      if (cognitoUser != null) {
        commit('setCognitoUser', cognitoUser)
        state.cognitoUser.getSession(function (err, session) {
          if (err) {
            console.log(JSON.stringify(err))
          } else {
            commit('signIn')
            state.cognitoUser.getUserAttributes(function (err, attributes) {
              if (err) {
                console.log(JSON.stringify(err))
              } else {
                console.log(attributes)
                for (let attribute of attributes) {
                  if (attribute.Name === 'email') {
                    commit('setUsername', attribute.Value)
                  }
                }
              }
            })
            dispatch('setLogoutTimer', 3600)
          }
        })
      }
    },
    setLogoutTimer ({ commit, state, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch('signOut')
      }, expirationTime * 1000)
    },
    signOut ({ commit }) {
      commit('signOut')
      router.push('/home')
    }
  }
})
