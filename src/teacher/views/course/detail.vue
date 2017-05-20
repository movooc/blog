<template>
  <section class="content detail" v-if="courseDetail">
    <div class="lesson">
      <div class="title clearfix">
        我的课程>课程详情
        <span class="title-handle pull-right" @click="backToCourse">返回</span>
        <span class="title-handle pull-right">编辑</span>
        <span class="title-handle pull-right" @click="startLesson" v-if="courseDetail.step=='opened'">点击开课</span>
        <span class="title-handle pull-right" @click="startLesson" v-if="courseDetail.step=='onlive' || courseDetail.step=='repose'">进入直播</span>
      </div>
      <div class="lesson-content clearfix">
        <div class="lesson-img">
          <img :src="courseDetail.cover" />
        </div>
        <div class="lesson-text">
          <h4>{{ courseDetail.title }}</h4>
          <p class="time clearfix">
            <span class="pull-right">预计课时：{{ courseDetail.plan.duration }}小时</span>
            开课时间：{{ courseDetail.plan.dtm_start }}
          </p>
          <div class="price clearfix">
            <span class="pull-right">已报名人数:人</span>
            <em>&#65509;{{ courseDetail.price }}</em>
          </div>
        </div>
      </div>
    </div>
    <div class="teacher">
      <div class="title">讲师介绍</div>
      <div class="teacher-content clearfix">
        <div class="teacher-img pull-left">
          <img :src="courseDetail.teacher.avatar" />
        </div>
        <div class="teacher-text pull-left">
          <div class="name" v-text="courseDetail.teacher.name"></div>
          <div>简介</div>
        </div>
      </div>
      <div class="teacher-content clearfix">
        <div class="lesson">
          <div class="title">课程介绍</div>
          <p class="teacher-brief" v-text="courseDetail.brief"></p>
          <p></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  // 获得config
  let liveHost = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'/live') : '/live.html';

  export default{
    name: 'detail',
    components: {

    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        courseDetail: 'getCourseDetailInfo',
      })
    },
    data() {
      return {
        //lessons: '',
      }
    },
    created() {
      //获取路由参数
      let query = this.$route.params;
      //
      this.$store.dispatch('fetchCourseDetail', query).then((data) => {
        //清空现有的iframe
        try{
          document.getElementsByTagName('iframe')[0].remove();
        }catch(e){}
        // 把数据写入iframe
        let userInfo = { ...this.userInfo };
        let lesson_info = encodeURIComponent(`${JSON.stringify(data)}`);
        let user_info = encodeURIComponent(`${JSON.stringify(userInfo)}`);
        let lesson = `lesson_info=${lesson_info}&lesson_sn=${query.lesson_sn}&user_info=${user_info}`;
        let iframe = document.createElement('iframe');
        let src = `${liveHost}?${lesson}`;
        iframe.src = src;
        iframe.style.height = 0;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }, () => {
        console.log('fail');
      });
    },
    methods: {
      startLesson() {
        // 开始课程
        // 获得开课信息
        this.$store.dispatch('fetchOpenInfo', query).then((data) => {
          let params = `?isOwner=yes&lesson_sn=${query.lesson_sn}`;
          for(let d in data){
            params = `${params}&${d}=${data[d]}`;
          };
          //this.lessons = params;
          // 开始进入课堂
          window.location.href = `${liveHost}${params}`;
        }, (err) => {
          alert(err.message);
        });
      },
      backToCourse() {
        this.$router.push({ name: 'course' })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  &.detail
    .title
      margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px solid #e6eaf2;
      .title-handle
        padding-left: 10px;
        color: #12b7f5;
        cursor: pointer;
    .lesson
      background: #fff;
      .lesson-content
        padding: 10px;
        >*
          float: left;
        .lesson-img
          margin-right: 20px;
          width: 400px;
          img
            width: 400px;
            height: 190px;
        .lesson-text
          width: 458px;
          h4
            margin: 0 0 50px;
            color: #3c4a55;
          .time
            margin: 0;
            padding-bottom: 4px;
            color: #aaa;
            border-bottom: 1px solid #e6eaf2;
            font-size: 12px;
          .price
            margin-top: 85px;
            em
              font-style: normal;
              color: #fb617f;
            span
              font-size: 12px;
    .teacher
      margin-top: 10px;
      background: #fff;
      .teacher-content
        padding: 10px;

        p {
          font-size: 12px;
        }
        .teacher-brief {
          padding: 10px;
        }
        .teacher-img
          width: 80px;
          img
            width: 80px;
            height: 80px;
            border-radius: 40px;
            -webkkit-border-radius: 40px;
      .teacher-text
        margin-left: 15px;
        .name
          margin: 0;
          padding-bottom: 15px;
          color: #12b7f5;
</style>
