<template>
  <div class="app">
    <nav-bar></nav-bar>
    <div class="loading" v-show="loading"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch('getUserInfo').then(() => {
      console.log(11)
    }, () => {
      console.log(22)
    });
  },
  computed: mapGetters({
    loading: 'getLoading'
  })
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
