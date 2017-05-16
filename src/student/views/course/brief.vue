<template>
  <section class="course-brief">
    <div v-if="course">
      <div class="brief-info">
        <h4 v-text="course.title"></h4>
        <div class="info-detail">
          <span><em v-text="course.plan.dtm_start"></em>开课</span>
          <span>预计耗时{{course.plan.duration}}小时</span>
          <span>1000人已预约</span>
        </div>
        <p class="info-price">
          <span class="price">&#65509;{{course.price}}&nbsp;<em>&nbsp;</em></span>
          <span class="guarantee">课程保障</span>
        </p>
      </div>
      <div class="lesson-brief">
        <div class="brief-title">简介</div>
        <p class="brief-con" v-text="course.brief"></p>
      </div>
      <teacher-info :teacher="course.teacher"></teacher-info>
      <qr-code></qr-code>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import teacherInfo from '@student/components/teacherinfo.vue';
  import qrCode from '@student/components/qrcode.vue';

  export default{
    name: 'course-brief',
    components: {
      teacherInfo,
      qrCode,
    },
    data() {
      return {
        course: null,
      }
    },
    computed: {
      ...mapGetters({
        'courseDetail': 'getCourseDetailInfo'
      })
    },
    created() {
      //获取路由参数
      let query = this.$route.query;
      this.course = this.courseDetail[query.lesson_sn];
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
