import Vue from 'vue'
import Vuex from 'Vuex'
import auth from './module/authenticate'
import poll from './module/election'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    poll
  }
})
