<template>
  <div class="hello">
    <v-enter v-if="userInfo"></v-enter>
  </div>
</template>

<script>
  import vEnter from '@live/components/enter/index.vue';
  import { setStore, getStore, removeStore, getQueryString } from '@lib/js/mUtils';
  import {mapState} from 'vuex';

  export default {
    name: 'hello',
    components: {
      vEnter,
    },
    computed: {
      ...mapState([
        'userInfo',
      ])
    },
    data() {
      return {
        open: {
          isOwner: webim.Tool.getQueryString('isOwner'),
          teach: webim.Tool.getQueryString('teach'),
          discuss: webim.Tool.getQueryString('discuss'),
          lesson_sn: webim.Tool.getQueryString('lesson_sn'),
          lesson_info: webim.Tool.getQueryString('lesson_info'),
          user_info: webim.Tool.getQueryString('user_info'),
          userSig: '',
        }
      };
    },
    mounted() {
      var _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'') : '/api';

      let userUrl = `${_prefix}/user-profile.api`;
      let lessonUrl = `${_prefix}/lesson-detail.api?lesson_sn=${this.open.lesson_sn}`;
      let userSigUrl = `${_prefix}/live-tim-user_sig.api`;

      // 是否有lessonInfo 存入localstory
      if(this.open.lesson_info && this.open.lesson_sn && this.open.user_info){
        // 清除
        removeStore(this.open.lesson_sn);
        // 组装
        let opt = {
          user_info: JSON.parse(this.open.user_info),
          lesson_info: JSON.parse(this.open.lesson_info),
        };
        // 添加
        return setStore(this.open.lesson_sn, opt);
      }

      // 获得userSig
      this.$http.get(userSigUrl).then((json)=>{
        if(json.ok){
          this.open.userSig = json.body.data;
          //
          try{
            var jsonData = getStore(this.open.lesson_sn);
            if(jsonData){
              jsonData = JSON.parse(jsonData);
              // 直播间id
              jsonData.lesson_info.teach = this.open.teach;
              jsonData.lesson_info.discuss = this.open.discuss;
              // 用户信息
              this.open.sn = jsonData.user_info.sn;
              this.open.name = jsonData.user_info.name;
              this.open.avatar = jsonData.user_info.avatar;
              this.open.groupId = this.open.teach;
              this.open.discuss = this.open.discuss;
              // 用户详情
              this.$store.commit('UPDATE_USERINFO', this.open);
              // 课程详情
              this.$store.commit('UPDATE_LESSONINFO', jsonData.lesson_info);
              // 老师详情
              this.$store.commit('UPDATE_TEACHERINFO', jsonData.lesson_info.teacher);
              // 老师头像
              this.$store.commit('UPDATE_AVATAR', jsonData.lesson_info.teacher.avatar);
              return;
            }
          }catch(e){};
          // 获得lesson info
          this.$http.get(lessonUrl).then((json)=>{
            if(json.ok){
              let data = json.body.data;
              // 增加id
              data.teach = this.open.teach;
              data.discuss = this.open.discuss;
              // 课程详情
              this.$store.commit('UPDATE_LESSONINFO', data);
              this.$store.commit('UPDATE_TEACHERINFO', data.teacher);
              this.$store.commit('UPDATE_AVATAR', data.teacher.avatar);
              // 获得user info
              this.$http.get(userUrl).then((json)=>{
                if(json.ok){
                  let data = json.body.data;
                  // 重组用户信息
                  this.open.sn = data.sn;
                  this.open.name = data.name;
                  this.open.avatar = data.avatar;
                  this.open.groupId = this.open.teach;
                  this.open.discuss = this.open.discuss;
                  this.$store.commit('UPDATE_USERINFO', this.open);
                }
              },(err)=>{
                console.log(err);
              });
              /*---end---*/
            }

          },(err)=>{
            console.log(err);
          });
          /*---end---*/
        }

      },(err)=>{
        console.log(err);
      });
      /*---end---*/
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello {
    height: 100%;
  }
</style>
