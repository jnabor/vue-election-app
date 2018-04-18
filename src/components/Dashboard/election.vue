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
  <div class="ma-5">
    <v-data-table
      :items="fields"
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
    details: Object
  },
  data () {
    return {
      fields: [
        { label: 'Election ID', value: this.details.electionId },
        { label: 'Creation Date', value: this.details.creationTimeStamp },
        { label: 'Election Name', value: this.details.electionName },
        { label: 'Total Votes', value: this.details.totalVotes },
        { label: 'Registered Voters', value: this.details.registeredVoters },
        { label: 'Status', value: this.details.status }
      ]
    }
  },
  watch: {
    details () {
      this.fields[0].value = this.details.electionId
      this.fields[1].value = this.details.creationTimeStamp
      this.fields[2].value = this.details.electionName
      this.fields[4].value = this.details.totalVotes
      this.fields[4].value = this.details.registeredVoters
      this.fields[5].value = this.details.status
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
