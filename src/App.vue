<template>
  <div id="app">
    <v-app>
      <app-layout></app-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('auth/tryAutoSignIn')
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
