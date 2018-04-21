<template>
<div>
  <v-tabs
    v-model="tab"
    centered>
    <v-tabs-slider></v-tabs-slider>
    <v-tab>Elections</v-tab>
    <v-tab>Candidates</v-tab>
    <v-tab>Registered Voters</v-tab>
    <v-tab>Votes</v-tab>
  </v-tabs>
  <v-tabs-items v-model="tab">
    <v-tab-item>
      <v-content>
        <section>
        <app-wrapper>
        <div class="mt-5">
          <v-dialog v-model="addDialog" max-width="500px">
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
        </div>
        <div class="mt-1 pa-1">
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
                  <td class="text-xs-left hidden-xs-only">{{ props.item.creationTimeStamp }}</td>
                  <td class="text-xs-left">{{ props.item.totalVotes }}</td>
                  <td class="text-xs-left">{{ props.item.registeredVoters }}</td>
                  <td class="text-xs-left layout ma-0 pa-0">
                    <v-btn flat icon class="mx-0" @click="editElection(props.item.electionId)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-dialog v-model="deleteDialog" persistent max-width="500px">
                      <v-btn flat icon slot="activator" class="mx-0" @click.native="deleteId = props.item.electionId" light>
                        <v-icon>delete</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title><h4>Delete Election</h4></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-tile>
                            <v-list-tile-content>Election ID:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.electionId }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Election Name:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.electionName }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Creation Time Stamp:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.creationTimeStamp }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Votes Submitted:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.totalVotes }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Registered Voters:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.registeredVoters }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Status:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.status }}</v-list-tile-content>
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
                          {{ challenge }}
                          {{ deleteId }}
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat @click.native="deleteDialog = false; challenge = ''">Cancel</v-btn>
                          <v-btn :disabled="!allowDelete" flat @click.native="deleteElection(props.item.electionId)">Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
        </app-wrapper>
        </section>
      </v-content>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <app-candidates></app-candidates>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        3
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        4
      </v-card>
    </v-tab-item>
  </v-tabs-items>
</div>
</template>
<script>
import wrapper from '../wrapper'
import election from './election'
import candidates from './candidates'
import sidemenu from './sidemenu'

export default {
  components: {
    'app-wrapper': wrapper,
    'app-election': election,
    'app-candidates': candidates,
    'app-sidemenu': sidemenu
  },
  data: () => {
    return {
      tab: null,
      addDialog: false,
      deleteDialog: false,
      editDialog: false,
      electionName: '',
      challenge: '',
      deleteId: '',
      allowDelete: false,
      headers: [
        { text: 'Election Name', value: 'electionName' },
        { text: 'Creation Time', value: 'creationTimeStamp' },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Actions', value: 'name', sortable: false }
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
    electionProp () {
      return this.elections[this.viewindex]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    elections () {
      this.sidelinks = []
      for (var key in this.elections) {
        this.sidelinks.push({ 'title': this.elections[key].electionName })
      }
    },
    challenge () {
      if (this.challenge.trim() === this.deleteId.trim()) {
        this.allowDelete = true
      } else {
        this.allowDelete = false
      }
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.electionName = ''
    },
    addElection () {
      let payload = {
        electionName: this.electionName
      }
      this.$store.dispatch('addElection', payload)
      this.close()
    },
    editElection (item) {
      console.log('edit item:' + JSON.stringify(item))
    },
    deleteElection (item) {
      this.deleteDialog = false
      console.log('delete item:' + JSON.stringify(item))

      // todo: delete election id from elections table
      // todo: delete election id from candidates table
      // todo: delete election id from votes table
      // todo: delete election id from registered voters table
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
.cardcontainer {
  overflow: auto;
}
.cardleft {
  float: left;
  width: 30%;
}
.cardright {
  float: right;
  width: 70%;
}
</style>
