<template>
  <section class="content-list">
    <course-list :lists="courseList"></course-list>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import courseList from '@student/components/courseList.vue';

  export default{
    name: 'list',
    components: {
      courseList
    },
    computed: {
      ...mapGetters({
        courseList: 'getCourseListInfo',
      })
    },
    created() {
      // 已经请求过就返回
      if(this.courseList.length)return;
      this.$store.dispatch('fetchCourseList').then(() => {
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
