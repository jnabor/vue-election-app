<template>
<app-wrapper>
  <v-layout column class="ma-0 pa-0">
    <v-toolbar color="secondary" class="elevation-0 ma-0 pa-0">
      <v-toolbar-title>
        ELECTIONS
      </v-toolbar-title>
    </v-toolbar>
    <v-container class="pa-0 ma-0">
      <v-layout row wrap>
        <v-flex xs-12>
          <v-card class="ma-3">
            <v-data-table
              disable-initial-sort
              :rows-per-page-items="rppi"
              :headers="headers"
              :items="elections"
              :loading="loadingElections"
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.electionName      }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.creationTimeStamp }}</td>
                  <td class="text-xs-left hidden-md-and-down">{{ props.item.electionId }}</td>
                  <td class="text-xs-left">{{ props.item.totalVotes }}</td>
                  <td class="text-xs-left hidden-sm-and-down">{{ props.item.registeredVoters }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.status }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
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
      rppi: [ 10, 20, 30, { 'text': 'All', 'value': -1 } ],
      headers: [],
      headersXs: [
        { text: 'Election Name', align: 'left', value: 'electionName' },
        { text: 'Total Votes', value: 'totalVotes' }
      ],
      headersSm: [
        { text: 'Election Name', align: 'left', value: 'electionName' },
        { text: 'Creation Time', value: 'creationTimeStamp' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Status', value: 'status' }
      ],
      headersMd: [
        { text: 'Election Name', align: 'left', value: 'electionName' },
        { text: 'Creation Time', value: 'creationTimeStamp' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: 'status' }
      ],
      headersAll: [
        { text: 'Election Name', align: 'left', value: 'electionName' },
        { text: 'Creation Time', value: 'creationTimeStamp' },
        { text: 'Election Id', value: 'electionId' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: 'status' }
      ]
    }
  },
  computed: {
    loadingElections () {
      return this.$store.getters.getElectionsLoadingState
    },
    elections () {
      return this.$store.getters.getElections
    },
    breakpoint () {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  methods: {
    viewElection (param) {

    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    setHeaders (param) {
      if (param === 'xs') {
        this.headers = this.headersXs
      } else if (param === 'sm') {
        this.headers = this.headersSm
      } else if (param === 'md') {
        this.headers = this.headersMd
      } else {
        this.headers = this.headersAll
      }
    }
  },
  created () {
    this.setHeaders(this.breakpoint)
    if (this.elections.length === 0) {
      this.$store.dispatch('fetchElections')
    }
  }
}
</script>
<style scoped>
</style>
