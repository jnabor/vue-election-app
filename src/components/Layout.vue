<template>
  <v-app>
    <v-navigation-drawer
      fixed clipped
      mobile-break-point="960"
      v-model="drawer" app>
      <div class="caption my-4 mx-3">
        <div class="my-2">Under Development by <a href="https://www.sonabstudios.com">SonabStudios&trade;</a></div>
        <div class="my-2">Powered by <a href="https://vuejs.org/">Vue.js</a> and <a href="https://vuetifyjs.com/en/">Vuetify.js</a></div>
      </div>
      <v-divider class="mt-3"></v-divider>
      <v-subheader>ADMINISTRATION</v-subheader>
      <v-list>
        <v-list-tile :color="active[0].color" @click="navigate('dash-election')">
          <v-list-tile-action>
            <v-icon :color="active[0].color">fingerprint</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Elections
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :color="active[1].color" @click="navigate('dash-candidates')">
          <v-list-tile-action>
            <v-icon :color="active[1].color">people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title >
              Candidates
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :color="active[2].color" @click="navigate('dash-voters')">
          <v-list-tile-action>
            <v-icon :color="active[2].color">verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Registered Voters
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :color="active[3].color" @click="navigate('dash-votes')">
          <v-list-tile-action>
            <v-icon :color="active[3].color">touch_app</v-icon>
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
      <v-toolbar-side-icon v-if="isAuthenticated" class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text hidden-xs-only">Election App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" icon @click="navigate('dash-election')">
        <v-icon class="white--text">fingerprint</v-icon>
      </v-btn>
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
          <v-list-tile @click="navSignOut()">
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
          <span>&copy; 2018 <a href="https://www.sonabstudios.com">SonabStudios&trade;</a> Jayson Nabor&trade;</span>
        </div>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import router from '../routes'

export default {
  props: {
    sidebar: Boolean,
    path: String
  },
  data: () => {
    return {
      username: '',
      drawer: this.sidebar,
      active: [
        { path: 'election', color: '' },
        { path: 'candidates', color: '' },
        { path: 'voters', color: '' },
        { path: 'votes', color: '' }
      ]
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
  watch: {
    email () {
      console.log('username: ' + this.email)
      var str = this.email
      var index = str.indexOf('@')
      this.username = str.substring(0, index)
    },
    $route (to, from) {
      this.updateSideBar(to.path)
    }
  },
  methods: {
    navSignOut: function () {
      this.$store.dispatch('signOut')
      router.push('/')
    },
    navigate: function (path) {
      router.push('/' + path)
    },
    setActive: function (path) {
      this.active = this.active.map((style) => {
        if (path.includes(style.path)) {
          style.color = 'accent'
        } else {
          style.color = ''
        }
        return style
      })
    },
    updateSideBar (path) {
      console.log('window.width: ' + window.innerWidth)
      if (window.innerWidth >= 960) {
        this.drawer = path.includes('dash') || false
      } else {
        this.drawer = false
      }
      this.setActive(path)
    }
  },
  created: function () {
    this.setActive(this.path)
    this.updateSideBar(this.path)
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
