<template>
<v-card height="800">
  <v-toolbar flat dense>
    <v-toolbar-title>Election Details</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon  @click="close()">
      <v-icon>close</v-icon>
    </v-btn>
  </v-toolbar>
  <v-divider></v-divider>
  <div class="mt-5 ml-5 mr-5">
    <v-data-table
      :items="fields"
      class="elevation-1"
      hide-actions
      hide-headers>
      <template slot="items" slot-scope="props">
        <td class="labelstyle">{{ props.item.label }}</td>
        <td>{{ props.item.value }}</td>
      </template>
    </v-data-table>
  </div>
  <div class="mt-4 ml-5 mr-5">
    <v-card>
    <v-toolbar tabs dense class="elevation-0">
      <v-toolbar-title class="subheading">Positions and Candidates</v-toolbar-title>
      <v-tabs
        slot="extension"
        v-model="tab"
        show-arrows >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="item in positions" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card-text>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in positions" :key="item">
        {{ text }}
      </v-tab-item>
    </v-tabs-items>
    </v-card-text>

    </v-card>
  </div>
</v-card>
</template>
<script>
export default {
  props: {
    details: Object
  },
  data () {
    return {
      tab: null,
      fields: [
        { label: 'Election Name', value: '' },
        { label: 'Creation Date', value: '' },
        { label: 'Election ID', value: '' },
        { label: 'Total Votes', value: '' },
        { label: 'Registered Voters', value: '' },
        { label: 'Status', value: '' }
      ],
      positions: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  watch: {
    details () {
      this.fields[0].value = this.details.electionName
      this.fields[1].value = this.details.creationTimeStamp
      this.fields[2].value = this.details.electionId
      this.fields[3].value = this.details.totalVotes
      this.fields[4].value = this.details.registeredVoters
      this.fields[5].value = this.details.status
      let posJSON = JSON.parse(this.details.positions)
      this.positions = posJSON.positions
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  },
  created: function () {
    this.fields[0].value = this.details.electionId
    this.fields[1].value = this.details.creationTimeStamp
    this.fields[2].value = this.details.electionName
    this.fields[4].value = this.details.totalVotes
    this.fields[4].value = this.details.registeredVoters
    this.fields[5].value = this.details.status
    let posJSON = JSON.parse(this.details.positions)
    this.positions = posJSON.positions
  }
}
</script>

<style scoped>
.labelstyle {
  width: 40%;
  font-weight: bold;
}
</style>
