<template>
<div>
  <v-content>
    <section>
      <app-wrapper>
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
          </v-data-table>
        </v-card>
      </app-wrapper>
    </section>
  </v-content>
</div>

</template>
<script>
import wrapper from '../wrapper'
export default {
  components: {
    'app-wrapper': wrapper
  },
  data: () => {
    return {
      dialog: false,
      headersCandidate: [
        { text: 'Election ID', value: 'electionId' },
        { text: 'Position', value: 'positionName' },
        { text: 'Votes', value: 'voteCount' },
        { text: 'Candidate', value: 'candidateUserId' }
      ]
    }
  },
  computed: {
    loadingCandidates () {
      return this.$store.getters.getCandidatesLoadingState
    },
    candidates () {
      return this.$store.getters.getCandidates
    }
  },
  created () {
    if (this.candidates.length === 0) {
      console.log('fetcing candidates data')
      this.$store.dispatch('fetchCandidates')
    }
  }
}
</script>
<style>
</style>
