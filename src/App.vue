<template>
  <div id="app">
    <v-app>
      <app-layout
        :sidebar="show">
      </app-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      show: false
    }
  },
  created () {
    let path = JSON.stringify(this.$route.path)
    this.$store.dispatch('tryAutoSignIn')
    console.log(path)
    this.show = path.includes('dash') || false
    console.log(this.show)
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
