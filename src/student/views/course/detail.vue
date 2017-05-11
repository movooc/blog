<template>
  <section class="content detail">
    <div class="detail-img">
      <img :src="courseDetail && courseDetail.cover" />
    </div>
    <div class="tab" v-if="courseDetail">
      <router-link :to="{name:'brief',query:{lesson_sn:courseDetail.sn}}" replace>介绍</router-link>
      <router-link :to="{name:'notice'}" replace>须知</router-link>
      <router-link to="/course/L5900888378d29/comment" replace>评价</router-link>
    </div>
    <router-view v-if="courseDetail"></router-view>
    <v-button @click="startLesson" :enrollData="myEnroll" :isEnroll="isEnroll" :courseDetail="courseDetail"></v-button>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import vButton from '@student/components/button.vue';

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
        myEnroll: null,
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
        this.isEnroll = data.event ? data.event : 'no';
        // 课程报名
        this.lessonEnroll(query);
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
      startLesson() {
        // 开始课程
        window.location.href = `${this.liveHost}${this.lessons}`;
      },
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
      lessonAccess(query) {
        // 进入课堂权限
        this.$store.dispatch('fetchLessonAccess', query).then((data) => {
          let params = `?isOwner=no&lesson_sn=${query.lesson_sn}`;
          for(let d in data){
            params = `${params}&${d}=${data[d]}`;
          };
          this.lessons = params;
        }, (err) => {
          alert(err.message);
        });
      },
      lessonEnroll(query) {
        // 课程报名
        this.$store.dispatch('fetchLessonEnroll', query).then((data) => {
          this.myEnroll = data;
        }, (err) => {
          alert(err.message);
        });
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
