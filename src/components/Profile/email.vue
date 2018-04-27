<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-sub-title>
        <v-icon small class="mr-1">email</v-icon>
        Email Address
      </v-list-tile-sub-title>
      <v-list-tile-title>{{ emailUp === '  ' ? '...' : emailUp }}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    email: String
  },
  data: function () {
    return {
      emailUpdate: '',
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
  },
  computed: {
    emailUp: function () {
      return this.emailUpdate
    },
    emailProp: function () {
      return this.email
    }
  },
  watch: {
    emailUp: function () {
      if (this.emailUpdate !== this.email) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    emailProp: function () {
      this.emailUpdate = JSON.parse(JSON.stringify(this.email))
    }
  }
}
</script>
<style scoped>
</style>
