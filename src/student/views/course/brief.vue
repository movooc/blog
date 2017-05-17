<template>
  <section class="course-brief">
    <div v-if="course">
      <div class="brief-info">
        <h4 v-text="course.title"></h4>
        <div class="info-detail">
          <span><em v-text="course.plan.dtm_start"></em>&nbsp;开课</span>
          <span><i class="iconfont icon-time"></i>&nbsp;{{course.plan.duration}}小时</span>
          <span><i class="iconfont icon-people"></i>&nbsp;1000</span>
        </div>
        <p class="info-price">
          <span class="price">&#65509;{{course.price}}&nbsp;<em></em></span>
          <span class="guarantee" @click="showGuar = !showGuar" v-bind:class="{ unfold: showGuar }">课程保障</span>
        </p>
        <div class="guarantee-text" v-show="showGuar">
          <dl>
            <dt>支付保障：</dt>
            <dd>全程使用微信支付，无额外第三方参与，保证支付安全</dd>
          </dl>
          <dl>
            <dt>有效回看：</dt>
            <dd>课程结束后可以进行回放观看</dd>
          </dl>
          <dl>
            <dt>自动退款：</dt>
            <dd>未进入听课界面，在课程结束24小时后自动退款到微信钱包内</dd>
          </dl>
          <dl>
            <dt>申述退款：</dt>
            <dd>由讲师及工作人员进行处理</dd>
          </dl>
          <dl>
            <dt>无条件退款：</dt>
            <dd>听课时长一小时以内可无条件退款</dd>
          </dl>
        </div>
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
        showGuar: false,
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
    methods: {
      toggleFold() {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
