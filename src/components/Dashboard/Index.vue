<template>
<div>
  <v-content>
    <section>
      <app-wrapper>
        <div class="mt-5">
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn color="accent" slot="activator" class="mb-3" light>Create New</v-btn>
              <v-card >
                <v-card-title>
                  <span class="headline">New Election</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm8 md8>
                        <v-text-field label="Election Name" v-model="electionName"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="addElection">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="headersElection"
              :items="elections"
              :loading="loadingElections"
              hide-actions
              class="elevation-1">
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.electionId        }}</td>
                <td class="text-xs-left">{{ props.item.creationTimeStamp }}</td>
                <td class="text-xs-left">{{ props.item.electionName      }}</td>
                <td class="text-xs-left">{{ props.item.registeredVoters  }}</td>
                <td class="text-xs-left">{{ props.item.totalVotes        }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
              </template>
              <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
        </div>
        <v-card class="mt-5">
          <v-data-table
            :headers="headersCandidate"
            :items="candidates"
            :loading="loadingCandidates"
            hide-actions
            class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.electionId      }}</td>
              <td class="text-xs-left">{{ props.item.positionName    }}</td>
              <td class="text-xs-left">{{ props.item.voteCount       }}</td>
              <td class="text-xs-left">{{ props.item.candidateUserId }}</td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </app-wrapper>
    </section>
  </v-content>
</div>

</template>
<script>
import wrapper from '../wrapper'
import election from './election'
export default {
  components: {
    'app-wrapper': wrapper,
    'app-election': election
  },
  data: () => {
    return {
      dialog: false,
      headersElection: [
        { text: 'Election ID', value: 'electionId' },
        { text: 'Created', value: 'creationTimeStamp' },
        { text: 'Election Name', value: 'electionName' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: ' ' }
      ],
      headersCandidate: [
        { text: 'Election ID', value: 'electionId' },
        { text: 'Position', value: 'positionName' },
        { text: 'Votes', value: 'voteCount' },
        { text: 'Candidate', value: 'candidateUserId' }
      ],
      electionName: ''
    }
  },
  computed: {
    loadingElections () {
      return this.$store.getters.getElectionsLoadingState
    },
    loadingCandidates () {
      return this.$store.getters.getCandidatesLoadingState
    },
    elections () {
      return this.$store.getters.getElections
    },
    candidates () {
      return this.$store.getters.getCandidates
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.electionName = ''
    },
    addElection () {
      console.log('Creating new election')
      let payload = {
        electionName: this.electionName
      }
      this.$store.dispatch('addElection', payload)
      this.close()
    }
  },
  created () {
    if (this.elections.length === 0) {
      console.log('fetcing election data')
      this.$store.dispatch('fetchElections')
    }
    if (this.elections.length === 0) {
      console.log('fetcing candidates data')
      this.$store.dispatch('fetchCandidates')
    }
  }
}
</script>
<style>
</style>
