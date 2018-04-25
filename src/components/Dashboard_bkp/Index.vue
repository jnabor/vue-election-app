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
            <v-data-table dark
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
                    <v-btn flat icon class="mx-0" @click="editElection(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon class="mx-0" @click="showDelete(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <app-deleteId
              :dialog="deleteDialog"
              :election="deleteItem"
              @close="deleteDialog = false; deleteItem = {}"
              @delete="deleteElection()">
            </app-deleteId>
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
import deleteView from './deleteView'
import editView from './editView'

export default {
  components: {
    'app-wrapper': wrapper,
    'app-delete': deleteView,
    'app-edit': editView
  },
  data: () => {
    return {
      tab: null,
      addDialog: false,
      deleteDialog: false,
      editDialog: false,
      electionName: '',
      deleteItem: {},
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
    }
  },
  methods: {
    showDelete (param) {
      this.deleteItem = param
      this.deleteDialog = true
      console.log('show delete election:' + param.electionId)
    },
    deleteElection () {
      this.deleteDialog = false
      console.log('delete election id:' + JSON.stringify(this.deleteItem.electionId))
      let payload = {
        electionId: this.deleteItem.electionId,
        creationTimeStamp: this.deleteItem.creationTimeStamp
      }
      // delete election id from elections table
      this.$store.dispatch('deleteElection', payload)
      // todo: delete election id from candidates table
      // todo: delete election id from votes table
      // todo: delete election id from registered voters table
      this.deleteItem = {}
    },
    close () {
      this.addDialog = false
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
      console.log('edit electionId:' + JSON.stringify(item.electionId))
      console.log('edit electionName:' + JSON.stringify(item.electionName))
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
