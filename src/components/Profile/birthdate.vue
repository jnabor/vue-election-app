<template>
<div>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-sub-title>
        <v-icon class="mr-1">date_range</v-icon>
        {{ caption }}
      </v-list-tile-sub-title>
      <v-list-tile-title>{{ birthDateUpdate === '' ? '...' : birthDateUpdate }}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon flat class="pa-0 ma-0" @click="dialog = !dialog">
        <v-icon v-if="birthDateUpdate !== ''" color="editicon">edit</v-icon>
        <v-icon v-else color="editicon">add</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Edit Date</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-date-picker
          full-width
          class="mb-3 grey lighten-4 black--text"
          v-model="birthDateUpdate"
          :max="new Date().toISOString().substr(0, 10)">
        </v-date-picker>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3 mb-2" @click="cancelEdit()">CANCEL</v-btn>
          <v-btn class="mx-3 mb-2" :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: {
    caption: String,
    birthdate: String
  },
  data: function () {
    return {
      dialog: false,
      birthDateUpdate: '',
      fullscreen: true,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      this.birthDateUpdate = JSON.parse(JSON.stringify(this.birthdate))
      this.dialog = false
    },
    updateAttribute: function () {
      this.$emit('updateBirthDate', this.birthDateUpdate)
      this.enableSave = false
      this.dialog = false
    },
    setHeaders (param) {
      if (param === 'xs') {
        this.fullscreen = true
      } else {
        this.fullscreen = false
      }
    }
  },
  computed: {
    birthDateUp: function () {
      return this.birthDateUpdate
    },
    birthDateProp: function () {
      return this.birthdate
    },
    breakpoint () {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    birthDateUp: function () {
      if (this.birthDateUpdate !== this.birthdate) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    birthDateProp: function () {
      this.birthDateUpdate = JSON.parse(JSON.stringify(this.birthdate))
    },
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  created () {
    this.birthDateUpdate = JSON.parse(JSON.stringify(this.birthdate))
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
