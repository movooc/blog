<template>
  <!-- live start -->
  <div class="live-page">
    <div class="live-sms-header" v-if="isPC">授课区
      <span class="end" @click="endLesson" v-if="isOwner && lessonInfo.step != 'finish'">
        <!--<i class="iconfont icon-jieshu"></i>-->
        结束授课
      </span>
      <span class="end comment" @click="startComment" v-if="isOwner && lessonInfo.step != 'repose' && lessonInfo.step != 'finish'">
        进入课后交流
      </span>
    </div>
    <div class="live-sms-left" v-if="isPC"></div>
    <!--<div class="live-sms-right" v-if="isPC"></div>-->
    <!-- player -->
    <v-player v-if="playingAudio"></v-player>
    <!-- live entity -->
    <div class="live-body" id="live-body" :class="{'owner':isOwner}" @click="handleBody">
      <!--<p class="pullMsgs" v-if="canPullMsgs"><a href="javascript:;" @click="pullMsgs">点击拉取历史消息</a></p>-->
      <!--<p class="pullMsgs" v-if="!canPullMsgs"><span>已经无历史消息</span></p>-->
      <!-- header -->
      <l-header></l-header>
      <!-- message entity -->
      <ul class="live-sms-list" id="live_sms_list" v-bind:class="{'commentShow':commentShow}">
        <li v-for="(msg, index) in messageInfo" :class="{'is-system':msg.isSystem, 'is-quote':(msg.content && msg.content[0].type==msg.MSG_ELEMENT_TYPE.CUSTOM && msg.content[0].custom[0].type=='QUOTE')}">
          <div class="user-img" v-if="!msg.isSystem">
            <!--<img :src="loadingImg" width="45px">-->
            <img v-if="userAvatar && userAvatar[msg.account]" :src="userAvatar[msg.account]" width="45px">
            <img v-if="!userAvatar || !userAvatar[msg.account]" :src="`${assetsHost}static/live/_static/live/img/comment_default.png`" width="45px">
          </div>
          <div class="live-sms" v-if="!msg.isSystem">
            <div class="speaker-name">
              <span class="inline-block">
                <span class="nickname">{{msg.nickname}}</span>
                <span class="time">{{timeFormat(msg.time)}}</span>
              </span>
            </div>
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
                  <div v-if="cus.type == 'QUOTE'">
                    <!--<div class="quote">讲师引用：</div>-->
                    {{cus.text}}
                  </div>
                </div>
              </div>
              <div class="content-img" v-if="con.type==msg.MSG_ELEMENT_TYPE.IMAGE">
                <a href="javascript:;" v-for="img in con.imgArr"><img v-bind:src="img" @click="showLiveImage(img)"></a>
              </div>
            </div>
          </div>
          <div class="live-system" v-if="msg.isSystem && !isOwner">
            <p>{{msg.message}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- comment -->
    <v-comment :inComment="inComment"></v-comment>
    <!-- chatbox -->
    <v-chatbox v-if="isOwner"></v-chatbox>
    <s-chatbox v-if="!isOwner"></s-chatbox>
    <!-- handle -->
    <v-handle :callBack="showHandle" :show="handleShow"></v-handle>
    <show-image v-show="showImg" :img="liveImg"></show-image>
    <!-- evaluate -->
    <v-evaluate v-if="!isOwner && evaluateShow"></v-evaluate>
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
  import vEvaluate from '@live/components/live/evaluate.vue';
  import { removeStore } from '@lib/js/mUtils';
  // spec
  var _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'') : '/api';
  var userUrl = `${_prefix}/user-profile.api?usn=`;

  export default
  {
    name: 'v-live',
    props: {
      lesson: {
        type: String,
      },
      inComment: {
        type: Boolean,
      },
    },
    components: {
      vComment,
      lHeader,
      vChatbox,
      sChatbox,
      vAudio,
      vPlayer,
      vHandle,
      vEvaluate,
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
        'evaluateShow',
        'boxMoreShow',
        'assetsHost',
        'userAvatar',
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
        if(isPC){
          window.open(img.split('#')[2]);
        }else if(isWeiXin){
          wx.previewImage({
            current: img,
            urls: [this.liveImg = img.split('#')[2]]
          });
        }else{
          this.showImg = true;
          this.liveImg = img.split('#')[2];
        }
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
            let _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'') : '/api';
            let userUrl = `${_prefix}/user-profile.api?usn=`;
            // 循环
            for (var i = 0; i <= msgList.length - 1; i++) {//遍历消息，按照时间从后往前
              var msg = msgList[i];
              // 是否有昵称
              msg.accountNick = msg.accountNick || this.teacherInfo.name;
              msg.history = true;
              tempList.push(exportAssembleMsg(msg));
            }
            // 递归获取头像
            this.recursion(0, msgList.length, msgList);
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
      handleBody() {
        if(this.boxMoreShow){
          this.$store.commit('UPDATE_BOX_MORE', false);
        }
      },
      timeFormat(value) {
        value = value.replace(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{2}):(\d{2}):(\d{2})$/,'$2-$3 $4:$5');
        return value;
      },
      updateAvatar(account, avatar){
        //
        let opt = {};
        opt[account] = avatar;
        this.$store.commit('UPDATE_USER_AVATAR', opt);
      },
      recursion(i, length, msgList) {
        if(i > length){
          return
        }
        //
        let msg = msgList[i];
        //
        try{
          let avatar = this.userAvatar[msg.from_account];
          // 是否有头像
          if(avatar){
            // 继续递归
            this.recursion(++i, length, msgList);
          }else{
            throw new Error('there is no avatar');
          }
        }catch(e){
          // 获取用户信息
          if(!msg){
            // 继续递归
            return this.recursion(++i, length, msgList);
          };
          let url = `${userUrl}${msg.from_account}`;
          this.$http.get(url).then((json)=>{
            if(json.ok){
              //
              let data = json.body.data;
              msg.avatar = data.avatar;
              // 更新头像存储
              this.updateAvatar(msg.from_account, data.avatar);
              // 继续递归
              this.recursion(++i, length, msgList);
            }
          },(err)=>{});
        }
      },
      startComment() {
        // 确定进入学员交流
        swal({
          title: '',
          text: '学员和讲师在3天内可继续发言交流',
          confirmButtonText: '确定交流',
          showCancelButton:true,
          closeOnConfirm: false,
          cancelButtonText: '取消交流',
        }, ()=>{
          let opt = {
            lesson_sn:this.lessonInfo.sn,
          };
          this.$store.dispatch('fetchStartComment', opt).then(() => {
            removeStore(opt.lesson_sn);
            swal({
              title: '',
              text: '可以开始与学员交流!',
              confirmButtonText: "知道了"
            }, ()=>{
              window.location.reload();
            });
          }, () => {
            console.log('fail');
          });
        });
      },
      endLesson() {
        swal({
          title: '',
          text: '课程结束，学员讲师均不可继续发言，课程回放开启',
          confirmButtonText: '确定结束',
          showCancelButton:true,
          closeOnConfirm: false,
          cancelButtonText: '取消结束',
        }, ()=>{
          let opt = {
            lesson_sn:this.lessonInfo.sn,
          };
          this.$store.dispatch('fetchEndLesson', opt).then(() => {
            removeStore(opt.lesson_sn);
            swal({
              title: '',
              text: '课程已结束!',
              confirmButtonText: "知道了",
            }, ()=>{
              window.location.reload();
            });
          }, () => {
            console.log('fail');
          });
        });
      },
    },
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
