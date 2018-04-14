import Vue from 'vue'
import Vuex from 'Vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import auth from './module/authenticate'
import poll from './module/election'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  getters,
  mutations,
  actions,
  modules: {
    auth,
    poll
  }
})
