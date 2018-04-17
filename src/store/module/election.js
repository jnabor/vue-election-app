import axios from 'axios'
import config from '../../config'

const state = {
  responseElections: '',
  responseCandidates: '',
  loadingElections: true,
  loadingCandidates: true,
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
  },
  getCandidates (state) {
    return state.candidates
  },
  getCandidatesLoadingState (state) {
    return state.loadingCandidates
  }
}

const mutations = {
  pushElection (state, payload) {
    state.elections.push(payload)
  },
  pushCandidate (state, payload) {
    state.candidates.push(payload)
  }
}

const actions = {
  fetchElections ({ state, commit }) {
    state.elections = []
    state.loadingElections = true
    let payload = {
      ReturnConsumedCapacity: 'TOTAL',
      TableName: config.databaseName + config.electionTable
    }
    axios.post('/scanitems', payload)
      .then(res => {
        state.items = []
        for (var key in res.data.Items) {
          let item = {
            electionId: res.data.Items[key].electionId.S,
            creationTimeStamp: res.data.Items[key].creationTimeStamp.S,
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
        console.err(err)
        state.responseElections = 'error!'
        state.loadingElections = false
      })
  },
  fetchCandidates ({ state, commit }) {
    state.candidates = []
    state.loadingCandidates = true
    let payload = {
      ReturnConsumedCapacity: 'TOTAL',
      TableName: config.databaseName + config.candidateTable
    }
    axios.post('/scanitems', payload)
      .then(res => {
        state.items = []
        for (var key in res.data.Items) {
          let candidateUserId = ''
          if ('candidateUserId' in res.data.Items[key]) {
            candidateUserId = res.data.Items[key].candidateUserId.S
          }
          let item = {
            electionId: res.data.Items[key].electionId.S,
            positionName: res.data.Items[key].positionName.S,
            candidateUserId: candidateUserId,
            voteCount: res.data.Items[key].voteCount.N
          }
          console.log(item)
          commit('pushCandidate', item)
        }
        state.loadingCandidates = false
      })
      .catch(err => {
        console.err(err)
        state.responseCandidates = 'error!'
        state.loadingCandidates = false
      })
  },
  addElection ({ state, commit, dispatch }, payload) {
    let electionId = Math.random().toString(36).substring(7) + Date.now().toString()
    let creationTimeStamp = Date.now().toString()
    let payloaddb = {
      Item: {
        electionId: {
          S: electionId
        },
        creationTimeStamp: {
          S: creationTimeStamp
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
        },
        positions: {
          SS: ['President', 'Vice President', 'Secretary', 'Treasurer']
        }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: config.databaseName + config.electionTable
    }
    axios.post('/additem', payloaddb)
      .then(res => {
        console.log(res)
        dispatch('fetchElections')
      })
      .catch(err => {
        console.err(err)
      })
  },
  addDefaultPositions ({ dispatch }, electionId) {
    let payload = {
      Items: [
        {
          'positionName': { 'S': 'President' },
          'electionId': { 'S': electionId },
          'candidateUserId': { 'S': 'sampleUserId' },
          'voteCount': { 'N': '0' }
        },
        {
          'positionName': { 'S': 'VP Internal' },
          'electionId': { 'S': electionId },
          'candidateUserId': { 'S': 'sampleUserId' },
          'voteCount': { 'N': '0' }
        },
        {
          'positionName': { 'S': 'VP External' },
          'electionId': { 'S': electionId },
          'candidateUserId': { 'S': 'sampleUserId' },
          'voteCount': { 'N': '0' }
        },
        {
          'positionName': { 'S': 'Secretary' },
          'electionId': { 'S': electionId },
          'candidateUserId': { 'S': 'sampleUserId' },
          'voteCount': { 'N': '0' }
        },
        {
          'positionName': { 'S': 'Treasurer' },
          'electionId': { 'S': electionId },
          'candidateUserId': { 'S': 'sampleUserId' },
          'voteCount': { 'N': '0' }
        }
      ],
      ReturnConsumedCapacity: 'TOTAL',
      TableName: config.databaseName + config.candidateTable
    }
    axios.post('/additems', payload)
      .then(res => {
        console.log(res)
        dispatch('fetchCandidates')
      })
      .catch(err => {
        console.err(err)
      })
  },
  addCandidate ({ dispatch }, payload) {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
