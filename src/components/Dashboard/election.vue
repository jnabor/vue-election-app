<template>
<app-wrapper>
  <v-container class="pa-0 ma-0">
    <v-layout row wrap>
    <v-toolbar color="secondary" class="elevation-0 ma-0 pa-0">
      <v-toolbar-title>
        ELECTIONS
      </v-toolbar-title>
    </v-toolbar>
  </v-layout>
  <v-layout row wrap>
      <v-card class="ma-3">
        <div>
          <v-data-table
            :headers="headers"
            :items="elections"
            :loading="loadingElections"
            class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left">{{ props.item.electionName      }}</td>
                <td class="text-xs-left ">{{ props.item.creationTimeStamp }}</td>
                <td class="text-xs-left ">{{ props.item.electionId }}</td>
                <td class="text-xs-left">{{ props.item.totalVotes }}</td>
                <td class="text-xs-left">{{ props.item.registeredVoters }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
                <td class="text-xs-left layout ma-0 pa-0">
                  <v-btn flat icon class="mx-0" @click="viewElection(props.item)">
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</app-wrapper>
</template>
<script>
import wrapper from './wrapper'

export default {
  components: {
    'app-wrapper': wrapper
  },
  data: () => {
    return {
      headers: [
        { text: 'Election Name', value: 'electionName' },
        { text: 'Creation Time', value: 'creationTimeStamp' },
        { text: 'Election Id', value: 'electionId' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: 'status' },
        { text: '', value: 'action' }
      ]
    }
  },
  computed: {
    loadingElections () {
      return this.$store.getters.getElectionsLoadingState
    },
    elections () {
      return this.$store.getters.getElections
    }
  },
  watch: {
  },
  methods: {
  },
  created () {
    if (this.elections.length === 0) {
      this.$store.dispatch('fetchElections')
    }
  }
}
</script>
<style scoped>
</style>
