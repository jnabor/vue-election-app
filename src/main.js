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
import AppRegistered from './components/Auth/Registered.vue'
import AppForgot from './components/Auth/Forgot.vue'
import AppConfirm from './components/Auth/Confirm.vue'
import AppChanged from './components/Auth/Changed.vue'
import AppProfile from './components/Profile/Index.vue'
import { store } from './store/index'
import axios from 'axios'
import config from './config'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

axios.defaults.baseURL = config.apiBaseUrl
Vue.use(Vuetify, {
  theme: {
    primary: colors.deepPurple.darken1,
    secondary: colors.amber.lighten3,
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
Vue.component('app-registered', AppRegistered)
Vue.component('app-forgot', AppForgot)
Vue.component('app-confirm', AppConfirm)
Vue.component('app-changed', AppChanged)
Vue.component('app-profile', AppProfile)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
