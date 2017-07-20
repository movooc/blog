<template>
  <section class="content detail">
    <div class="detail-img" v-if="courseDetail && courseDetail.cover">
      <img :src="`${courseDetail.cover}!cover`" />
    </div>
    <div class="tab" v-if="courseDetail">
      <router-link :to="{name:'brief',query:{lesson_sn:courseDetail.sn}}" replace>介绍</router-link>
      <router-link :to="{name:'notice',query:{lesson_sn:courseDetail.sn}}" replace>须知</router-link>
      <router-link :to="{name:'evaluate',query:{lesson_sn:courseDetail.sn}}" replace>评价</router-link>
    </div>
    <router-view :isEnroll="isEnroll" v-if="courseDetail"></router-view>
    <v-button :isEnroll="isEnroll" :courseDetail="courseDetail" :liveHost="liveHost"></v-button>
    <loading :show="showLoading"></loading>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import vButton from '@student/views/course/button.vue';
  import Loading from '@student/components/loading';

  export default{
    name: 'detail',
    components: {
      vButton,
      Loading,
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        enroll: 'getLessonEnroll',
        assetsHost:'getAssetsHost',
        canWXShare:'getCanWXShare',
      })
    },
    data() {
      return {
        liveHost: (process.env.NODE_ENV=='production'?process.env.LIVE_HOST.replace(/\/$/,'/live'):'/live.html'),
        studentHost: (process.env.NODE_ENV=='production'?process.env.STUDENT_HOST.replace(/\/$/,'?'):'/student.html?'),
        studentShareHost: (process.env.NODE_ENV=='production'?process.env.STUDENT_HOST:'/student.html?'),
        lessons: '',
        courseDetail: null,
        isEnroll: null,
        showLoading: true,
      };
    },
    created() {
      // 初始化
      this.getDetailInfo();
    },
    beforeRouteLeave(to, from, next) {
      //清空现有的iframe
      try{
        document.getElementsByTagName('iframe')[0].remove();
      }catch(e){};
      next();
    },
    methods: {
      writeIframe(query, data){
        // 把数据写入iframe
        console.log('detail');
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
      wxConfig(data) {
        // 请求配置接口
        // 微信操作
        try{
          wx.ready(() => {

            let shareAppMessageLink = `${this.studentShareHost}share?lesson_sn=${data.sn}&origin=wxShare-message`;
            let shareTimelineLink = `${this.studentShareHost}share?lesson_sn=${data.sn}&origin=wxShare-timeline`;
            let imgUrl = this.courseDetail.cover ? this.courseDetail.cover : `${this.assetsHost}/static/student/_static/student/img/default-lesson-share.png`;
              // 微信发送给朋友
            wx.onMenuShareAppMessage({
              title: `${data.teacher.name} | ${data.title}`, // 分享标题
              desc: data.brief, // 分享描述
              link: shareAppMessageLink, // 分享链接
              imgUrl: imgUrl, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: () => {
                // 用户确认分享后执行的回调函数
                console.log('success');
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                console.log('cancel');
              }
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: `${data.teacher.name} | ${data.title}`, // 分享标题
              link: shareTimelineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: () => {
                // 用户确认分享后执行的回调函数
                console.log('success');
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                console.log('cancel');
              }
            });
            // 展示页面
            this.showLoading = false;
          });
        }catch(e){
          // 展示页面
          this.showLoading = false;
        };
      },
      getDetailInfo() {
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
          }catch(e){};
          // 把数据写入iframe
          this.writeIframe(query, data);
          // 开始调用分享接口
          this.wxShare();
          /*// 微信分享功能
          let self = this;
          (function inspectShare(){
            if(self.canWXShare){
              if(self.canWXShare == 1){
                return self.wxConfig(self.courseDetail);
              }else{
                return console.log('分享配置失败!');
              }
            }
            // 重新监测
            setTimeout(()=>{
              inspectShare();
            }, 300);
          })();*/
        }, () => {
          console.log('fail');
        });
      },
      wxShare() {
        // 请求配置接口
        /*console.log(`${this.studentShareHost}#/course/detail/brief?lesson_sn=${this.courseDetail.sn}`);*/
        if(isWeiXin){
          this.$store.dispatch('fetchWXConfig', {url:encodeURIComponent(window.location.href)}).then((result)=>{
            // 微信操作
            wx.config({
              debug: false,
              appId: result.appId,
              timestamp: result.timestamp,
              nonceStr: result.nonceStr,
              signature: result.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            });
            // 可以分享了
            console.log('可以分享');
            this.wxConfig(this.courseDetail);
            //this.$store.commit('UPDATE_WXSHARE_SHARE', 1);
          },()=>{
            // 不能分享
            console.log('不能分享');
            // 展示页面
            this.showLoading = false;
            //this.$store.commit('UPDATE_WXSHARE_SHARE', 2);
          });
        } else {
          this.showLoading = false;
        }
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
