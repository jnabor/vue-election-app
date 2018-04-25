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
        <v-card class="ma-3">
            <v-data-table
              disable-initial-sort
              :headers="headers"
              :items="elections"
              :loading="loadingElections"
              class="elevation-1">
              <template slot="headers" slot-scope="props">
                <tr>
                  <th
                    @click="changeSort(headers[0].value)" class="text-xs-left"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', headers[0].value === pagination.sortBy ? 'active' : '']">
                    {{ headers[0].text }}
                  </th>
                  <th @click="changeSort(headers[1].value)" class="text-xs-left hidden-xs-only ">{{ headers[1].text }}</th>
                  <th class="text-xs-left hidden-md-and-down">{{ headers[2].text }}</th>
                  <th @click="changeSort(headers[3].value)" class="text-xs-left ">{{ headers[3].text }}</th>
                  <th @click="changeSort(headers[4].value)" class="text-xs-left hidden-sm-and-down">{{ headers[4].text }}</th>
                  <th @click="changeSort(headers[5].value)" class="text-xs-left hidden-xs-only">{{ headers[5].text }}</th>
                  <th @click="changeSort(headers[6].value)" class="text-xs-left ">{{ headers[6].text }}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.electionName      }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.creationTimeStamp }}</td>
                  <td class="text-xs-left hidden-md-and-down">{{ props.item.electionId }}</td>
                  <td class="text-xs-left">{{ props.item.totalVotes }}</td>
                  <td class="text-xs-left hidden-sm-and-down">{{ props.item.registeredVoters }}</td>
                  <td class="text-xs-left hidden-xs-only">{{ props.item.status }}</td>
                  <td class="text-xs-left layout ma-0 pa-0">
                    <v-btn flat icon class="mx-0" @click="viewElection(props.item)">
                      <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
        </v-card>
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
      pagination: {
        sortBy: 'name'
      },
      headers: [
        { text: 'Election Name', align: 'left', value: 'electionName' },
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
    viewElection (param) {

    }
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
