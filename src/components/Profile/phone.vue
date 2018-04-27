<template>
<div>
  <v-subheader class="ma-0 a-0">
    <v-icon small class="mr-1">phone</v-icon>
    Phone Numbers
    <v-spacer></v-spacer>
    <v-btn icon flat class="pa-0 ma-0" @click="dialog = !dialog">
      <v-icon v-if="phoneUpdate.mobile === '' && phoneUpdate.business === '' && phoneUpdate.home === ''"
        color="grey lighten-2">
        add
      </v-icon>
      <v-icon v-else color="grey lighten-2">edit</v-icon>
    </v-btn>
  </v-subheader>

  <!--
  <v-list-tile>
    <v-list-tile-avatar>
      <v-icon small>mdi-cellphone</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ phoneUpdate.mobile === ''? '...' :  phoneUpdate.mobile }}</v-list-tile-title>
      <v-list-tile-sub-title>Mobile Number</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-list-tile>
    <v-list-tile-avatar>
      <v-icon small>mdi-deskphone</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ phoneUpdate.business === ''? '...' :  phoneUpdate.business }}</v-list-tile-title>
      <v-list-tile-sub-title>Business Number</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
  <v-list-tile>
    <v-list-tile-avatar>
      <v-icon small>mdi-home-variant</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ phoneUpdate.home === ''? '...' :  phoneUpdate.home }}</v-list-tile-title>
      <v-list-tile-sub-title>Home Number</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
  -->

  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Edit Phone Numbers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="phoneUpdate.mobile"
          label="Mobile Number">
        </v-text-field>
        <v-text-field
          v-model="phoneUpdate.business"
          label="Business Number">
        </v-text-field>
        <v-text-field
          v-model="phoneUpdate.home"
          label="Home Number">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mx-3 mb-2" @click="cancelEdit()">CANCEL</v-btn>
        <v-btn class="mx-3 mb-2" :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: {
    phone: Object
  },
  data: function () {
    return {
      dialog: false,
      phoneUpdate: {
        mobile: '',
        business: '',
        home: ''
      },
      fullscreen: true,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      this.phoneUpdate = JSON.parse(JSON.stringify(this.phone))
      this.dialog = false
    },
    updateAttribute: function () {
      this.$emit('updatePhoneNumber', this.phoneUpdate)
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
    phoneNumberUp: function () {
      return this.phoneUpdate.mobile + this.phoneUpdate.business + this.phoneUpdate.home
    },
    phoneNumberProp: function () {
      return this.phone.mobile + ' ' + this.phone.business + ' ' + this.phone.home
    },
    breakpoint () {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    phoneNumberUp: function () {
      if ((this.phoneUpdate.mobile !== this.phone.mobile) ||
          (this.phoneUpdate.business !== this.phone.business) ||
          (this.phoneUpdate.home !== this.phone.home)) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    phoneNumberProp: function () {
      this.phoneUpdate = JSON.parse(JSON.stringify(this.phone))
    },
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  created () {
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
