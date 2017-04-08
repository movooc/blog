<template>
  <!-- live start -->
  <div class="live-page" @click="isShow" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <!-- live entity -->
    <div class="live-body">
      <!-- header -->
      <l-header></l-header>
      <!-- message entity -->
      <ul class="live-sms-list" id="live_sms_list">
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content">
                  <div class="content-text">养殖户大会后付款是否可好可好看是否可哈萨克发挥开发和客户发卡号是分开哈萨克的发挥</div>
                </div>
            </div>
        </li>
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content">
                  <div class="content-img">
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                  </div>
                </div>
            </div>
        </li>
        <li>
          <div class="user-img">
            <img src="~@live/assets/img/user-img.png" width="45px">
          </div>
          <div class="live-sms">
            <div class="speaker-name">主讲人</div>
            <div class="sms-content w65per">
              <div class="content-audio" data-audio-src="">
                    <span class="voice icon-dot1"></span>
                <span class="timer">53"</span>
              </div>
            </div>
          </div>
        </li>
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content w65per">
                  <div class="content-audio" data-audio-src="">
                    <span class="voice icon-voice"></span>
                    <span class="timer">53"</span>
                  </div>
                </div>
            </div>
        </li>
      </ul>
      <!-- popular -->
      <v-popular></v-popular>
    </div>
    <!-- comment -->
    <v-comment></v-comment>
    <!-- chatbox -->
    <v-chatbox></v-chatbox>
    <!-- audio -->
    <v-audio></v-audio>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import lHeader from './header.vue';
  import vPopular from './popular.vue';
  import vAudio from './audio.vue';
  import vComment from '@live/components/comment/index.vue';
  import vChatbox from '@live/components/chatbox/index.vue';
  //import '@live/assets/js/live/jquery-2.1.4.min.js';
  import '@live/assets/js/sdk/webim.js';
  import '@live/assets/js/sdk/json2.js';
  import  {smsPicClick} from '@live/assets/js/live/demo_base.js';
  import '@live/assets/js/live/demo_group_notice.js';

  export default
  {
    name: 'v-live',
    components: {
      vComment,
      vPopular,
      lHeader,
      vChatbox,
      vAudio,
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
    },
    created(){
      console.log(this.state);
    },
    methods: {
      isShow() {
        this.$store.commit('UPDATE_MENUSHOW');
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
