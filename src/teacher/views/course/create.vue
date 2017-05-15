<template>
  <section class="content-create">

  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'create',
    components: {
      courseList
    },
    computed: {
      ...mapGetters({

      })
    },
    created() {
      this.$store.dispatch('fetchCourseList').then(() => {
        console.log('success');
      }, () => {
        console.log('fail');
      });
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content-create
    padding: 20px;
    background: #fff;
</style>
