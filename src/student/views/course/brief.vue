<template>
  <section class="course-brief">
    <div v-if="course">
      <div class="brief-info">
        <h4 v-text="course.title"></h4>
        <div class="info-detail">
          <span><em>{{`${course.plan.dtm_now}#${course.plan.dtm_start}` | moment}}</em>&nbsp;开课</span>
          <span><i class="iconfont icon-time"></i>&nbsp;{{course.plan.duration}}小时</span>
          <span><i class="iconfont icon-people"></i>&nbsp;{{course.participants}}</span>
        </div>
        <p class="info-price">
          <span class="price">&#65509;{{course.price}}&nbsp;<em></em></span>
          <span class="guarantee" @click="showGuar = !showGuar" v-bind:class="{ 'g-unfold': showGuar }">课程保障</span>
        </p>
        <div class="guarantee-text" v-show="showGuar">
          <dl>
            <dt>支付保障：</dt>
            <dd>微信付款，方便快捷</dd>
          </dl>
          <dl>
            <dt>消息通知：</dt>
            <dd>关注易灵微课公众号后可及时接收课程通知</dd>
          </dl>
          <dl>
            <dt>限时退款：</dt>
            <dd>听课一小时内，不满意无条件退款</dd>
          </dl>
          <dl>
            <dt>过期退款：</dt>
            <dd>课程结束15天后未听课自动退款</dd>
          </dl>
          <dl>
            <dt>申诉退款：</dt>
            <dd>超过退款时限，理由充分仍有机会申请退款。</dd>
          </dl>
        </div>
      </div>
      <div class="lesson-brief">
        <div class="brief-title">简介</div>
        <div class="brief-con">
          <div class="b-text break-word" ref="b-text" :class="{'fold':(!showBrief && briefFold)}">
            {{course.brief}}
          </div>
          <span class="unfold" @click="toggleFold" v-if="briefFold">
            <i class="iconfont icon-chevron-down" v-if="!showBrief"></i>
            <i class="iconfont icon-chevron-up" v-if="showBrief"></i>
            {{showBrief?'收起':'展开'}}
          </span>
        </div>
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
        showBrief: false,
        briefFold: false,
      };
    },
    computed: {
      ...mapGetters({
        'courseDetail': 'getCourseDetailInfo'
      })
    },
    created() {
      // 获取路由参数
      let query = this.$route.query;
      this.course = this.courseDetail[query.lesson_sn];
    },
    mounted() {
      this.briefFold = (this.$refs['b-text'].offsetHeight>302?true:false);
    },
    methods: {
      toggleFold() {
        this.showBrief = !this.showBrief;
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
