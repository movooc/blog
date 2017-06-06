<template>
  <!-- live start -->
  <!--<div class="live-page" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">-->
  <div class="live-page">
    <div class="live-sms-header" v-if="isPC">授课区
      <span class="end" @click="showHandle(true)" v-if="isOwner && lessonInfo.step != 'finish'">
        <i class="iconfont icon-jieshu"></i>
        结束授课
      </span>
    </div>
    <div class="live-sms-left" v-if="isPC"></div>
    <!--<div class="live-sms-right" v-if="isPC"></div>-->
    <!-- player -->
    <v-player v-if="playingAudio"></v-player>
    <!-- live entity -->
    <div class="live-body" id="live-body" :class="{'owner':isOwner}">
      <!--<p class="pullMsgs" v-if="canPullMsgs"><a href="javascript:;" @click="pullMsgs">点击拉取历史消息</a></p>-->
      <!--<p class="pullMsgs" v-if="!canPullMsgs"><span>已经无历史消息</span></p>-->
      <!-- header -->
      <l-header></l-header>
      <!-- message entity -->
      <ul class="live-sms-list" id="live_sms_list" v-bind:class="{'commentShow':commentShow}">
        <li v-for="(msg, index) in messageInfo">
          <div class="user-img" v-if="!msg.isSystem">
            <img :src="loadingImg" width="45px">
          </div>
          <div class="live-sms" v-if="!msg.isSystem">
            <div class="speaker-name" v-text="msg.nickname"></div>
            <div class="sms-content" v-for="con in msg.content">
              <div class="content-text" v-text="con.text" v-if="con.type==msg.MSG_ELEMENT_TYPE.GROUP_TIP"></div>
              <div class="content-text" v-html="textFormat(con.text)" v-if="con.type==msg.MSG_ELEMENT_TYPE.TEXT"></div>
              <div class="content-text" v-if="con.type==msg.MSG_ELEMENT_TYPE.FILE">
                <a v-for="file in con.fileArr" :href="file.url" target="__blank">点击下载</a>
              </div>
              <div class="content-text custom" v-if="con.type==msg.MSG_ELEMENT_TYPE.CUSTOM">
                <div class="custom" v-for="cus in con.custom">
                  <div class="content-audio" :data-audio-src="cus.type" v-if="cus.type == 'SOUND'">
                    <v-audio ref="audios" :history="con.history" :id="cus.id" :src="cus.src" :index="index"></v-audio>
                  </div>
                  <div class="content-audio" :data-audio-src="cus.type" v-if="cus.type == 'FILE'">
                    <a :href="cus.src" target="__blank">点击下载{{cus.name}}</a>
                  </div>
                </div>
              </div>
              <div class="content-img" v-if="con.type==msg.MSG_ELEMENT_TYPE.IMAGE">
                <a href="javascript:;" v-for="img in con.imgArr"><img v-bind:src="img" @click="showLiveImage(img)"></a>
              </div>
            </div>
          </div>
          <div class="live-system" v-if="msg.isSystem && !isOwner">
            <p>---{{msg.message}}---</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- comment -->
    <v-comment></v-comment>
    <!-- chatbox -->
    <v-chatbox v-if="isOwner"></v-chatbox>
    <s-chatbox v-if="!isOwner"></s-chatbox>
    <!-- handle -->
    <v-handle :callBack="showHandle" :show="handleShow"></v-handle>
    <show-image v-show="showImg" :img="liveImg"></show-image>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import lHeader from './header.vue';
  import vPlayer from './player.vue';
  import vHandle from './handle.vue';
  import showImage from './image.vue';
  import { exportAssembleMsg } from '@live/assets/js/webim_comment';
  import vComment from '@live/components/comment/index.vue';
  import vChatbox from '@live/components/chatbox/index.vue';
  import sChatbox from '@live/components/chatbox/sChat.vue';
  import vAudio from '@live/components/audio/index.vue';

  export default
  {
    name: 'v-live',
    props: {
      lesson: {
        type: String
      }
    },
    components: {
      vComment,
      lHeader,
      vChatbox,
      sChatbox,
      vAudio,
      vPlayer,
      vHandle,
      showImage,
    },
    data() {
      return {
        isPC,
        show: false,
        busy: false,
        handleShow: false,
        canPullMsgs: true,
        showImg: false,
        liveImg: '',
      };
    },
    computed: {
      ...mapState([
        'headerTitle',
        'messageInfo',
        'lessonInfo',
        'menuShow',
        'isOwner',
        'teacherInfo',
        'loadingImg',
        'playingAudio',
        'commentShow',
      ])
    },
    mounted(){
      this.pullMsgs();
    },
    methods: {
      isShow() {
        //this.$store.commit('UPDATE_MENUSHOW');
      },
      showLiveImage(img){
        this.showImg = true;
        this.liveImg = img;
      },
      pullMsgs() {
        if(this.lesson){
          //
          this.$store.dispatch('fetchHistory', {lesson_sn:this.lesson.split('-')[0]}).then((msgList) => {
            //
            if (msgList.length == 0) {
              return;
            }
            // 重组备份
            let tempList = [];
            // 循环
            for (var i = 0; i <= msgList.length - 1; i++) {//遍历消息，按照时间从后往前
              var msg = msgList[i];
              // 是否有昵称
              msg.accountNick = this.teacherInfo.name || msg.accountNick;
              msg.history = true;
              tempList.push(exportAssembleMsg(msg));
            }
            // 实施
            this.$store.commit('UPDATE_HISTORY_MESSAGE', tempList);
            // 课程是否已结束
            if(this.lessonInfo.step=='finish')return;
            this.$nextTick(()=>{
              var vScroll = document.getElementById('live-body');
              var count = 0;
              // 开始迭代
              (function nextAction(){
                if(vScroll.scrollHeight && count<2500){
                  return vScroll.scrollTop = vScroll.scrollHeight;
                };
                count = count + 500;
                setTimeout(()=>{
                  nextAction();
                },500);
              })();
            });
          }, () => {
            console.log('fail');
          });
        }
      },
      showHandle(show) {
        this.handleShow = show;
      },
      textFormat(value){
        return value.replace(/\n/g, '<br>');
      },
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
