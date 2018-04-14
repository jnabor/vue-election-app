import axios from 'axios'
import config from '../../config'

const state = {
  response: '',
  loadingElections: true,
  elections: [],
  candidates: [],
  votes: []
}

const getters = {
  getElections (state) {
    return state.elections
  },
  getElectionsLoadingState (state) {
    return state.loadingElections
  }
}

const mutations = {
  pushElection (state, payload) {
    state.elections.push(payload)
  }
}

const actions = {
  fetchElections ({ state, commit }) {
    state.elections = []
    state.loadingElections = true
    let payload = {
      ReturnConsumedCapacity: 'TOTAL',
      TableName: config.databaseName
    }
    axios.post('/scanitems', payload)
      .then(res => {
        state.items = []
        for (var key in res.data.Items) {
          let item = {
            electionId: res.data.Items[key].electionId.S,
            creationDate: res.data.Items[key].creationDate.S,
            electionName: res.data.Items[key].electionName.S,
            totalVotes: res.data.Items[key].totalVotes.N,
            registeredVoters: res.data.Items[key].registeredVoters.N,
            status: res.data.Items[key].status.S
          }
          console.log(item)
          commit('pushElection', item)
        }
        state.loadingElections = false
      })
      .catch(err => {
        console.log('Error:')
        console.log(err)
        state.response = 'error!'
        state.loadingElections = false
      })
  },
  addElection ({ state, commit, dispatch }, payload) {
    let electionId = Math.random().toString(36).substring(7) + Date.now().toString()
    let creationDate = Date.now().toString()
    let payloaddb = {
      Item: {
        electionId: {
          S: electionId
        },
        creationDate: {
          S: creationDate
        },
        electionName: {
          S: payload.electionName
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
    axios.post('/additem', payloaddb)
      .then(res => {
        console.log('Response:')
        console.log(res)
        dispatch('fetchElections')
      })
      .catch(err => {
        console.log('Error:')
        console.log(err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
