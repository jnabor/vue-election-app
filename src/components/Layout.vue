<template>
  <v-app>

  <v-toolbar color="primary">
    <i class="material-icons white--text ml-2 ml-4">fingerprint</i>
    <v-toolbar-title class="white--text hidden-xs-only">Election App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="navigate('home')">
      <v-icon class="white--text">home</v-icon>
    </v-btn>

    <v-menu  v-if="isAuthenticated" bottom left class="mr-4 hidden-sm-and-up">
      <v-btn icon slot="activator">
        <v-icon class="white--text">person</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="navigate('profile')">
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="navigate('signout')">
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu  v-if="isAuthenticated" bottom left class="mr-4 hidden-xs-only">
      <v-btn depressed small color="primary" slot="activator">
        {{ username }}
        <v-icon class="white--text">arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="navigate('profile')">
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="navigate('signout')">
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn class="hidden-xs-only white--text" @click="navigate('dashboard')" flat>Dashboard</v-btn>
    <v-btn v-if="!isAuthenticated" class="hidden-xs-only white--text" @click="navigate('signin')" flat>Sign In</v-btn>
    <v-btn v-if="!isAuthenticated" class="hidden-xs-only white--text mr-4" @click="navigate('register')" flat>Register</v-btn>
    <v-menu v-if="!isAuthenticated" bottom left class="hidden-sm-and-up">
      <v-btn icon slot="activator" >
        <v-icon class="white--text">more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-if="!isAuthenticated"
          @click="navigate('signin')">
          <v-list-tile-title >
            Sign In
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="!isAuthenticated"
          @click="navigate('register')">
          <v-list-tile-title>
            Register
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>

  <v-content>
    <router-view></router-view>
  </v-content>

  <v-footer fixed app>
    <v-layout column align-center justify-center>
      <div class="ml-3">
        <span>&copy; 2018 <a href="http://sonabstudios.com">SonabStudios&trade;</a> is a trademark of Jayson Nabor</span>
      </div>
    </v-layout>
  </v-footer>

  </v-app>
</template>

<script>
import router from '../routes'

export default {
  data: () => {
    return {
      username: ''
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.authenticated
    },
    email: function () {
      return this.$store.state.username
    }
  },
  methods: {
    navigate: function (path) {
      console.log('navigating to ' + path)
      if (path === 'signout') {
        this.$store.dispatch('signOut')
      } else if (path === 'dashboard') {
        router.push('/dashboard')
      } else {
        router.push('/' + path)
      }
    }
  },
  watch: {
    email () {
      console.log('username: ' + this.email)
      var str = this.email
      var index = str.indexOf('@')
      this.username = str.substring(0, index)
    }
  }
}
</script>
<style>
</style>
