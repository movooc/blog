<template>
  <section class="enroll">
    <enroll-list :lists="lists"></enroll-list>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import enrollList from '@student/components/enrollList';

  export default{
    name: 'enrolled',
    components: {
      enrollList
    },
    computed: {
      ...mapGetters({
        lists: 'getUserEnroll',
      })
    },
    created() {
      this.$store.dispatch('fetchEnrollList').then(() => {
        console.log('success');
      }, () => {
        console.log('fail');
      });
    },
    methods: {
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
