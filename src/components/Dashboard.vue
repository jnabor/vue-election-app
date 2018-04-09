<template>
<div>
  <v-content>
    <section>
      <app-wrapper>
        <v-card class="mt-5">
          <div>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn color="accent" slot="activator" class="mb-2">Create New</v-btn>
              <v-card>
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
                  <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="headers"
              :items="items"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
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
        </v-card>
      </app-wrapper>
    </section>
  </v-content>
</div>
</template>
<script>
import axios from 'axios'
import wrapper from './wrapper'
export default {
  components: {
    'app-wrapper': wrapper
  },
  data: () => ({
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
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      let payload = {
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'vue-election-app-dev-election-app'
      }
      axios.post('/scanitems', payload)
        .then(res => {
          console.log('Response:')
          for (var key in res.data.Items) {
            this.readItem.electionId = res.data.Items[key].electionId.S
            this.readItem.creationDate = res.data.Items[key].creationDate.S
            this.readItem.electionName = res.data.Items[key].electionName.S
            this.readItem.totalVotes = res.data.Items[key].totalVotes.N
            this.readItem.registeredVoters = res.data.Items[key].registeredVoters.N
            this.readItem.status = res.data.Items[key].status.S
            this.items.push(this.readItem)
          }
        })
        .catch(err => {
          console.log('Error:')
          console.log(err)
          this.response = 'error!'
        })
        /*
      this.items = [
        {
          electionId: 'Frozen Yogurt',
          creationDate: '',
          electionName: '',
          totalVotes: 99,
          registeredVoters: 1000,
          status: 'Not Started'
        },
        {
          electionId: 'Ice cream sandwich',
          creationDate: '',
          electionName: '',
          totalVotes: 167,
          registeredVoters: 1000,
          status: 'Not Started'
        },
        {
          electionId: 'Eclair',
          creationDate: '',
          electionName: '',
          totalVotes: 134,
          registeredVoters: 1000,
          status: 'Not Started'
        }
      ] */
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
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
