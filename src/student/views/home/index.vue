<template>
  <section class="content">
    首页
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'home',
    computed: {
      ...mapGetters({
        homeLists: 'getHomeLists',
      })
    },
    created() {
      this.$store.dispatch('fetchHomeLists', {page: 1, count: 5});
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
