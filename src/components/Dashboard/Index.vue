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
        </div>
        <div class="cardcontainer mt-1 pa-1">
          <div :class="cardleftview">
            <v-data-table
              v-if="master"
              :headers="headersElectionDetailed"
              :items="elections"
              :loading="loadingElections"
              class="elevation-1">
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <tr @click="viewDetails(props.item.electionId)">
                  <td class="text-xs-left">{{ props.item.electionName      }}</td>
                  <td class="text-xs-left">{{ props.item.creationTimeStamp }}</td>
                  <td class="text-xs-left">{{ props.item.electionId        }}</td>
                  <td class="text-xs-left">{{ props.item.registeredVoters  }}</td>
                  <td class="text-xs-left">{{ props.item.totalVotes        }}</td>
                  <td class="text-xs-left">{{ props.item.status }}</td>
                </tr>
              </template>
            </v-data-table>
            <app-sidemenu
              v-if="detail"
              :header="'Election Name'"
              :current="viewindex"
              :links="sidelinks"
              @click="changeViewDetails($event)">
            </app-sidemenu>
          </div>
          <div v-if="detail" :class="cardrightview">
            <app-election
              :details="electionProp"
              @close="closeDetails()">
            </app-election>
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
      viewindex: 0,
      cardleftview: '',
      cardrightview: 'cardright',
      detail: false,
      master: true,
      dialog: false,
      electionName: '',
      headersElectionDetailed: [
        { text: 'Election Name', value: 'electionName' },
        { text: 'Created', value: 'creationTimeStamp' },
        { text: 'Election ID', value: 'electionId', sortable: false },
        { text: 'Total Votes', value: 'totalVotes' },
        { text: 'Registered', value: 'registeredVoters' },
        { text: 'Status', value: 'status' }
      ],
      sidelinks: []
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
    viewDetails (param) {
      let index = this.elections.findIndex(x => x.electionId === param)
      this.cardleftview = 'cardleft'
      this.cardrightview = 'cardright'
      this.detail = true
      this.master = false
      this.changeViewDetails(index)
    },
    changeViewDetails (params) {
      this.viewindex = params
    },
    closeDetails () {
      this.cardleftview = ''
      this.cardrightview = ''
      this.detail = false
      this.master = true
      this.viewindex = 0
    },
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
