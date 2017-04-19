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
        homeInfo: 'getHomeInfo',
      })
    },
    created() {
      this.$store.dispatch('changeHomeInfo', '欢迎欢迎!');
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
