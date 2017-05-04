<template>
  <section class="content">
    <div class="title">课程详情</div>
    <button @click="startLesson" v-if="lessons">点击进入直播</button>
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
        courseList: 'getCourseListInfo',
        userInfo: 'getUserInfo',
      })
    },
    data() {
      return {
        lessons: '',
      }
    },
    created() {
      //获取路由参数
      let query = this.$route.params;
      //
      this.$store.dispatch('fetchCourseDetail', query).then((data) => {
        // 把数据写入iframe
        let userInfo = { ...this.userInfo };
        let lesson_info = encodeURIComponent(`${JSON.stringify(data)}`);
        let user_info = encodeURIComponent(`${JSON.stringify(userInfo)}`);
        let lesson = `lesson_info=${lesson_info}&lesson_sn=${query.lesson_sn}&user_info=${user_info}`;
        let iframe = document.createElement('iframe');
        let src = `${liveHost}?${lesson}`;
        iframe.src = src;
        document.body.appendChild(iframe);
      }, () => {
        console.log('fail');
      });
      // 获得开课信息
      this.$store.dispatch('fetchOpenInfo', query).then((data) => {
        let params = `?isOwner=yes&lesson_sn=${query.lesson_sn}`;
        for(let d in data){
          params = `${params}&${d}=${data[d]}`;
        };
        this.lessons = params;
      }, (err) => {
        alert(err.message);
      });
    },
    methods: {
      startLesson() {
        // 开始课程
        window.location.href = `${liveHost}${this.lessons}`;
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
