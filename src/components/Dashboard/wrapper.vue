<template>
  <v-container fluid class="ma-0 pa-0">
    <v-layout justify-center class="ma-0 pa-0">
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-layout row justify-center class="ma-0 pa-0">
          <slot>
          </slot>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>
