<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',

  beforeCreate () {
    this.$store.dispatch('checkStorage').then(() => {
      if (!this.$store.state.account || !this.$store.state.balance) {
        this.$store.commit('logout')
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>
