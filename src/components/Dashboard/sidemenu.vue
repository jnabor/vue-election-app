<template>
  <v-navigation-drawer permanent floating>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="subheading">
            {{ header }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list class="pt-0">
      <div v-for="(item, index) in links" :key="item.title">
      <v-list-tile
        v-bind:class="{ highlight : (current == index) }"
        @click="$emit('click', index)">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    header: String,
    current: Number,
    links: Array
  }
}
</script>
<style scoped>
.highlight {
  border-right: 2px solid #FFCA28;
}
</style>
