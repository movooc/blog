<template>
  <!-- live start -->
  <div class="live-page" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <!-- live entity -->
    <div class="live-body" id="live-body">
      <!-- header -->
      <l-header></l-header>
      <!-- message entity -->
      <ul class="live-sms-list" id="live_sms_list">
        <li>
            <div class="user-img">
              <img src="static/_static/live/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content">
                  <div class="content-img">
                    <a href=""><img src="static/_static/live/img/back-img2.png"></a>
                    <a href=""><img src="static/_static/live/img/back-img2.png"></a>
                    <a href=""><img src="static/_static/live/img/back-img2.png"></a>
                  </div>
                </div>
            </div>
        </li>
        <!--<li>-->
          <!--<div class="user-img">-->
            <!--<img src="~@live/assets/img/user-img.png" width="45px">-->
          <!--</div>-->
          <!--<div class="live-sms">-->
            <!--<div class="speaker-name">主讲人</div>-->
            <!--<div class="sms-content w65per">-->
              <!--<div class="content-audio" data-audio-src="">-->
                <!--<span class="voice icon-dot1"></span>-->
                <!--<span class="timer">53"</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
        <li v-for="msg in messageInfo">
          <div class="user-img">
            <img src="static/_static/live/img/user-img.png" width="45px">
          </div>
          <div class="live-sms">
            <div class="speaker-name" v-text="msg.nickname"></div>
            <div class="sms-content" v-for="con in msg.content">
              <div class="content-text" v-text="con.text" v-if="con.type==msg.MSG_ELEMENT_TYPE.GROUP_TIP"></div>
              <div class="content-text" v-text="con.text" v-if="con.type==msg.MSG_ELEMENT_TYPE.TEXT"></div>
              <div class="content-text" v-if="con.type==msg.MSG_ELEMENT_TYPE.FILE">
                <a v-for="file in con.fileArr" :href="file.url" target="__blank">点击下载</a>
              </div>
              <div class="content-text" v-if="con.type==msg.MSG_ELEMENT_TYPE.CUSTOM">
                <div class="custom" v-for="cus in con.custom">
                  <div class="content-audio" :data-audio-src="cus.type" v-if="cus.type == 'SOUND'">
                    <v-audio :id="cus.id" :src="cus.src"></v-audio>
                  </div>
                </div>
              </div>
              <div class="content-img" v-if="con.type==msg.MSG_ELEMENT_TYPE.IMAGE">
                <a href="" v-for="img in con.imgArr"><img v-bind:src="img"></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- popular -->
      <!--<v-popular></v-popular>-->
    </div>
    <!-- comment -->
    <v-comment></v-comment>
    <!-- chatbox -->
    <v-chatbox v-if="isOwner"></v-chatbox>
    <s-chatbox v-if="!isOwner"></s-chatbox>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import lHeader from './header.vue';
  import vPopular from './popular.vue';
  import vComment from '@live/components/comment/index.vue';
  import vChatbox from '@live/components/chatbox/index.vue';
  import sChatbox from '@live/components/chatbox/sChat.vue';
  import vAudio from '@live/components/audio/index.vue';

  export default
  {
    name: 'v-live',
    components: {
      vComment,
      vPopular,
      lHeader,
      vChatbox,
      sChatbox,
      vAudio,
    },
    data() {
      return {
        show: false,
        busy: false,
      };
    },
    computed: {
      ...mapState([
        'headerTitle', 'messageInfo', 'teacherInfo', 'menuShow', 'isOwner',
      ])
    },
    updated() {
      setTimeout(()=>{
        var vScroll = document.getElementById('live-body');
        vScroll.scrollTop = vScroll.scrollHeight;
      });
    },
    created(){

    },
    methods: {
      isShow() {
        //this.$store.commit('UPDATE_MENUSHOW');
      },
      loadMore() {
        this.busy = true;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
