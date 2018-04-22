<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center class="mb-5">
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-layout row justify-center>
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
