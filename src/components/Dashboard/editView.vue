<template>
  <div class="mt-1 pa-1">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title><h4>Delete Election</h4></v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Election ID:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.electionId }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Election Name:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.electionName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Creation Time Stamp:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.creationTimeStamp }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Votes Submitted:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.totalVotes }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Registered Voters:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.registeredVoters }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Status:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ election.status }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-card-text>
            <div color="warning">
              <v-alert outline color="warning" icon="priority_high" :value="true">
                Enter election ID below to confirm
              </v-alert>
              <v-text-field v-model="challenge"></v-text-field>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="close()">Cancel</v-btn>
            <v-btn :disabled="!allowDelete" flat @click.native="deleteElection()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 </template>
<script>
export default {
  props: {
    dialog: Boolean,
    election: Object
  },
  data: () => {
    return {
      challenge: '',
      allowDelete: false
    }
  },
  watch: {
    challenge () {
      if (this.challenge === this.election.electionId) {
        this.allowDelete = true
      } else {
        this.allowDelete = false
      }
    }
  },
  methods: {
    close () {
      this.challenge = ''
      this.$emit('close')
    },
    deleteElection () {
      this.challenge = ''
      this.$emit('delete')
    }
  }
}
</script>
<style scoped>
</style>
