<template>
  <section class="content">
    <div class="title">课程详情</div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'detail',
    components: {

    },
    computed: {
      ...mapGetters({
        courseList: 'getCourseListInfo',
      })
    },
    created() {
      //获取路由参数
      let query = this.$route.params;
      //
      this.$store.dispatch('fetchCourseDetail', query).then(() => {
        console.log('success');
      }, () => {
        console.log('fail');
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
