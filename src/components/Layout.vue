<template>
  <v-app>

    <v-navigation-drawer
      fixed clipped
      v-model="drawer" app>
      <div class="caption my-4 mx-3">
        <div class="my-2">Under Development by <a href="https://www.sonabstudios.com">SonabStudios&trade;</a></div>
        <div class="my-2">Powered by <a href="https://vuejs.org/">Vue.js</a> and <a href="https://vuetifyjs.com/en/">Vuetify.js</a></div>
      </div>
      <v-divider class="mt-3"></v-divider>
      <v-subheader>ELECTIONS</v-subheader>
      <v-list>
        <v-list-tile @click="navigate('election')">
          <v-list-tile-action>
            <v-icon>fingerprint</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Elections
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigate('election')">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Candidates
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigate('election')">
          <v-list-tile-action>
            <v-icon>verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Registered Voters
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigate('election')">
          <v-list-tile-action>
            <v-icon>touch_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Votes
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>RESULTS</v-subheader>
      <v-divider></v-divider>
      <v-subheader>STATISTICS</v-subheader>
    </v-navigation-drawer>

    <v-toolbar
      color="primary"
      fixed clipped-left app>
      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text hidden-xs-only">Election App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" class="white--text" @click="navigate('election')" flat>Dashboard</v-btn>
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
      <v-btn v-if="!isAuthenticated" class="hidden-xs-only white--text" @click="navigate('signin')" flat>Sign In</v-btn>
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
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer fixed app>
      <v-layout column align-center justify-center>
        <div class="ml-3">
          <span>&copy; 2018 <a href="https://www.sonabstudios.com">SonabStudios&trade;</a> is a trademark of Jayson Nabor</span>
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
      username: '',
      drawer: true
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.auth.authenticated
    },
    email: function () {
      return this.$store.state.auth.username
    }
  },
  methods: {
    navigate: function (path) {
      console.log('navigating to ' + path)
      if (path === 'signout') {
        this.$store.dispatch('signOut')
        this.drawer = false
      } else if (path === 'election') {
        this.drawer = true
        router.push('/election')
      } else {
        router.push('/' + path)
        this.drawer = false
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
<style scoped>
.maincontent {
  border: 1px solid red;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>
