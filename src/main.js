// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import Vuetify from 'vuetify'
import AppLayout from './components/Layout.vue'
import AppHome from './components/Home.vue'
import AppSignin from './components/Auth/Signin.vue'
import AppRegister from './components/Auth/Register.vue'
import { store } from './store/index'
import axios from 'axios'
import config from './config'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

axios.defaults.baseURL = config.apiBaseUrl
Vue.use(Vuetify, {
  theme: {
    primary: colors.deepPurple.darken1,
    secondary: colors.deepPurple.lighten5,
    accent: colors.amber.lighten2,
    error: '#f44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

Vue.component('app-layout', AppLayout)
Vue.component('app-home', AppHome)
Vue.component('app-signin', AppSignin)
Vue.component('app-register', AppRegister)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
