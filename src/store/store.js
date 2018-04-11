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
    signIn ({ commit, state, dispatch }, authData) {
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
          dispatch('setLogoutTimer', 3600)
        },
        onFailure: (err) => {
          console.log('sign in failure')
          state.errcode = JSON.stringify(err.code)
        }
      })
    },
    tryAutoSignIn ({ state, dispatch }) {
      state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      state.cognitoUser = state.userPool.getCurrentUser()
      if (state.cognitoUser != null) {
        state.cognitoUser.getSession(function (err, session) {
          if (err) {
            console.log(JSON.stringify(err))
          } else {
            state.authenticated = true
            state.cognitoUser.getUserAttributes(function (err, attributes) {
              if (err) {
                console.log(JSON.stringify(err))
              } else {
                console.log(attributes)
                for (let attribute of attributes) {
                  if (attribute.Name === 'email') {
                    state.username = attribute.Value
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
