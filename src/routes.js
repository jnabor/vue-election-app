import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import SignIn from '@/components/Auth/Signin'
import Register from '@/components/Auth/Register'
import Registered from '@/components/Auth/Registered'
import Forgot from '@/components/Auth/Forgot'
import Confirm from '@/components/Auth/Confirm'
import Changed from '@/components/Auth/Changed'
import Profile from '@/components/Profile/Index'
import Election from '@/components/Dashboard/Election'
import Candidates from '@/components/Dashboard/Candidates'
import Voters from '@/components/Dashboard/Registered'
import Votes from '@/components/Dashboard/Votes'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/register', name: 'Register', component: Register },
    { path: '/registered', name: 'Registered', component: Registered },
    { path: '/forgot', name: 'Forgot', component: Forgot },
    { path: '/confirm', name: 'Confirm', component: Confirm },
    { path: '/changed', name: 'Changed', component: Changed },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/dash-election', name: 'Election', component: Election },
    { path: '/dash-candidates', name: 'Candidates', component: Candidates },
    { path: '/dash-voters', name: 'Voters', component: Voters },
    { path: '/dash-votes', name: 'Votes', component: Votes }
  ],
  mode: 'history'
})
