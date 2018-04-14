<template>
<div>
  <v-content>
    <section>
      <app-wrapper>
        <div class="mt-5">
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn color="accent" slot="activator" class="mb-3">Create New</v-btn>
              <v-card >
                <v-card-title>
                  <span class="headline">New Election</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm8 md8>
                        <v-text-field label="Election Name" v-model="addItem.electionName"></v-text-field>
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
              :headers="headers"
              :items="items"
              :loading="loading"
              hide-actions
              class="elevation-1">
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template v-if="!loading" slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.electionId       }}</td>
                <td class="text-xs-left">{{ props.item.creationDate     }}</td>
                <td class="text-xs-left">{{ props.item.electionName     }}</td>
                <td class="text-xs-left">{{ props.item.totalVotes       }}</td>
                <td class="text-xs-left">{{ props.item.registeredVoters }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
              </template>
              <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
        </div>
      </app-wrapper>
    </section>
  </v-content>
</div>
</template>
<script>
import axios from 'axios'
import wrapper from '../wrapper'
import config from '../../config'
import election from './election'

export default {
  components: {
    'app-wrapper': wrapper,
    'app-election': election
  },
  data: () => {
    return {
      loading: true,
      dialog: false,
      headers: [
        { text: 'Election ID', value: 'electionId' },
        { text: 'Creation Date', value: 'creationDate' },
        { text: 'Election Name', value: 'electionName' },
        { text: 'Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: ' ' }
      ],
      items: [],
      addItem: {
        electionId: '',
        creationDate: '',
        electionName: '',
        totalVotes: '',
        registeredVoters: '',
        status: ''
      },
      defaultItem: {
        electionId: '',
        creationDate: '',
        electionName: '',
        totalVotes: '',
        registeredVoters: '',
        status: ''
      },
      readItem: {
        electionId: '',
        creationDate: '',
        electionName: '',
        totalVotes: '',
        registeredVoters: '',
        status: ''
      }
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    if (this.items.length > 0) {

    } else {
      this.initialize()
      setTimeout(() => { this.loading = false }, 1000)
    }
  },
  methods: {
    initialize () {
      let payload = {
        ReturnConsumedCapacity: 'TOTAL',
        TableName: config.databaseName
      }
      axios.post('/scanitems', payload)
        .then(res => {
          this.items = []
          for (var key in res.data.Items) {
            let item = {
              electionId: res.data.Items[key].electionId.S,
              creationDate: res.data.Items[key].creationDate.S,
              electionName: res.data.Items[key].electionName.S,
              totalVotes: res.data.Items[key].totalVotes.N,
              registeredVoters: res.data.Items[key].registeredVoters.N,
              status: res.data.Items[key].status.S
            }
            this.items.push(item)
          }
        })
        .catch(err => {
          console.log('Error:')
          console.log(err)
          this.response = 'error!'
        })
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },
    close () {
      this.dialog = false
      this.addItem = Object.assign({}, this.defaultItem)
    },
    addElection () {
      console.log('Creating new election')
      this.addItem.electionId = Math.random().toString(36).substring(7) + Date.now().toString()
      this.addItem.creationDate = Date.now().toString()
      let payload = {
        Item: {
          electionId: {
            S: this.addItem.electionId
          },
          creationDate: {
            S: this.addItem.creationDate
          },
          electionName: {
            S: this.addItem.electionName
          },
          totalVotes: {
            N: '0'
          },
          registeredVoters: {
            N: '0'
          },
          status: {
            S: 'Draft'
          }
        },
        ReturnConsumedCapacity: 'TOTAL',
        TableName: config.databaseName
      }
      axios.post('/additem', payload)
        .then(res => {
          console.log('Response:')
          console.log(res)
          this.initialize()
        })
        .catch(err => {
          console.log('Error:')
          console.log(err)
        })
      this.close()
    }
  }
}
</script>
<style>
</style>
