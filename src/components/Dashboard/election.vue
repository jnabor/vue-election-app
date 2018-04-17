<template>
  <div  class="pa-4">
    Election ID   : {{ election.electionId }} <br/>
    Created       : {{ election.creationTimeStamp }} <br/>
    Election Name : {{ election.electionName }} <br/>
    Total Votes   : {{ election.totalVotes }} <br/>
    Registered    : {{ election.registeredVoters }} <br/>
    Status        : {{ election.status }} <br/>
    Positions     : {{ election.positions }} <br/>
  </div>
</template>
<script>
export default {
  props: {
    election: Object
  },
  method: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
