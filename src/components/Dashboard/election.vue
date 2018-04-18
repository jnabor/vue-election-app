<template>
<v-card height="800">
  <v-toolbar flat color="amber lighten-3>">
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="subheading text-xs-center">
          Election Details
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>
  <v-divider></v-divider>
  <div class="ma-5">
    <v-data-table
      :items="details"
      class="elevation-1"
      hide-actions
      hide-headers>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.label }}</td>
        <td>{{ props.item.value }}</td>
      </template>
    </v-data-table>
  </div>
</v-card>
</template>
<script>
export default {
  props: {
    election: Object
  },
  data () {
    return {
      details: [
        { label: 'Election ID', value: this.election.electionId },
        { label: 'Creation Date', value: this.election.creationTimeStamp },
        { label: 'Election Name', value: this.election.electionName },
        { label: 'Total Votes', value: this.election.totalVotes },
        { label: 'Registered Voters', value: this.election.registeredVoters },
        { label: 'Status', value: this.election.status }
      ]
    }
  },
  watched: {
    datetime () {
      this.date = this.datetime.getDate()
      this.time = this.datetime
    }
  },
  computed: {
    datetime () {
      // return this.election.creationTimeStamp
      return Date.now()
    }
  },
  method: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
