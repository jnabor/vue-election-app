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
                <tr @click="viewElection(props.item)">
                  <td class="text-xs-left">{{ props.item.electionName }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.creationTimeStamp }}</td>
                  <td class="text-xs-left hidden-md-and-down">{{ props.item.electionId }}</td>
                  <td class="text-xs-left">{{ props.item.totalVotes }}</td>
                  <td class="text-xs-left hidden-sm-and-down">{{ props.item.registeredVoters }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.status }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-dialog
              v-model="dialog.show"
              :fullscreen="fullscreen"
              max-width="800"
              transition="dialog-bottom-transition"
              scrollable>
              <v-card>
                <v-toolbar card dark color="primary">
                  <v-toolbar-title>Election Settings</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.native="dialog.show = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  {{ dialog.election.electionId }}<br/>
                  {{ dialog.election.electionName }}<br/>
                  {{ dialog.election.creationTimeStamp }}<br/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog.show = false">Disagree</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog.show = false">Agree</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      dialog: {
        show: false,
        election: {}
      },
      fullscreen: true,
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
      console.log('view election: ' + param)
      this.dialog.show = true
      this.dialog.election = param
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
        this.fullscreen = true
      } else if (param === 'sm') {
        this.headers = this.headersSm
        this.fullscreen = false
      } else if (param === 'md') {
        this.headers = this.headersMd
        this.fullscreen = false
      } else {
        this.headers = this.headersAll
        this.fullscreen = false
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
