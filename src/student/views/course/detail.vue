<template>
  <section class="content detail">
    <div class="detail-img">
      <img :src="courseDetail && courseDetail.cover" />
    </div>
    <div class="tab" v-if="courseDetail">
      <router-link :to="{name:'brief',query:{lesson_sn:courseDetail.sn}}" replace>介绍</router-link>
      <router-link :to="{name:'notice',query:{lesson_sn:courseDetail.sn}}" replace>须知</router-link>
      <!--<router-link to="/course/L5900888378d29/comment" replace>评价</router-link>-->
    </div>
    <router-view v-if="courseDetail"></router-view>
    <v-button :isEnroll="isEnroll" :courseDetail="courseDetail" :liveHost="liveHost"></v-button>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import vButton from '@student/views/course/button.vue';

  export default{
    name: 'detail',
    components: {
      vButton,
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        enroll: 'getLessonEnroll',
      })
    },
    data() {
      return {
        liveHost: (process.env.NODE_ENV=='production'?process.env.LIVE_HOST.replace(/\/$/,'/live'):'/live.html'),
        lessons: '',
        courseDetail: null,
        isEnroll: null,
      }
    },
    created() {
      //获取路由参数
      let query = this.$route.query;
      //
      this.$store.dispatch('fetchCourseDetail', query).then((data) => {
        // 赋值
        this.courseDetail = data;
        // 是否报名
        this.isEnroll = data.event;
        //清空现有的iframe
        try{
          document.getElementsByTagName('iframe')[0].remove();
        }catch(e){}
        // 把数据写入iframe
        this.writeIframe(query, data);
      }, () => {
        console.log('fail');
      });
      // 获得开课信息
      //this.lessonAccess(query);
    },
    methods: {
      writeIframe(query, data){
        // 把数据写入iframe
        let userInfo = { ...this.userInfo };
        let lesson_info = encodeURIComponent(`${JSON.stringify(data)}`);
        let user_info = encodeURIComponent(`${JSON.stringify(userInfo)}`);
        let lesson = `lesson_info=${lesson_info}&lesson_sn=${query.lesson_sn}&user_info=${user_info}`;
        let iframe = document.createElement('iframe');
        let src = `${this.liveHost}?${lesson}`;
        iframe.src = src;
        iframe.style.height = 0;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
