<template>
  <section class="data-course course-list">
    <div class="data-title">课程数据</div>
    <ul>
      <li class="head">
        <span>课程</span>
        <span>报名人数</span>
        <span>听课人数</span>
        <span>退款人数</span>
        <span>课程收益</span>
        <span class="handle">&nbsp;</span>
      </li>
      <li v-for="item in dataCourse">
        <span v-text="item.lesson.title"></span>
        <span>{{ item.data | specKey('lesson.enroll.unique') }}</span>
        <span>{{ item.data | specKey('lesson.access.unique') }}</span>
        <span>{{ item.data | specKey('lesson.refund.unique') }}</span>
        <span class="price">&#65509;{{ item.data | specKey('lesson.income.sum') }}</span>
        <div class="handle">
          <a class="button" href="javascript:;" @click="goToOrigin(item.lesson.sn)">来源</a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'data-course',
    computed: {
      ...mapGetters({
        dataCourse: 'getDataCourse',
      })
    },
    created() {
      // 获取课程数据
      this.$store.dispatch('fetchDataCourse').then((data) => {
        console.log('success');
      }, (err) => {
        alert(err.message);
      });
    },
    methods: {
      goToOrigin(id) {
        this.$router.push({ name: 'data-origin', params: {lesson_sn:id,origin_id:'null'} });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
