<template>
  <div id="app">
    <v-app>
      <app-layout
        :sidebar="show"
        :path="path">
      </app-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      show: false,
      path: ''
    }
  },
  created () {
    this.path = JSON.stringify(this.$route.path)
    this.$store.dispatch('tryAutoSignIn')
    this.show = this.path.includes('dash') || false
  }
}
</script>

<style>

body {
  margin: 0px;
  padding: 0px;
}

.fadeout-enter-active, .fadeout-leave-active {
  transition: opacity 1s;
}
.fadeout-enter, .fadeout-leave-to {
  opacity: 0;
}

</style>
