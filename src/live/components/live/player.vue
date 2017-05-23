<template>
  <!-- popular -->
  <div class="playing-audio" @click="goToPlaying">
    <i class="iconfont icon-laba"></i>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  var vScroll = null;
  var vSms = null;

  export default
  {
    name: 'v-player',
    components: {
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
      ...mapState([
        'playingAudio',
      ])
    },
    methods: {
      goToPlaying() {
        if(!vScroll || !vSms){
          vScroll = document.getElementById('live-body');
          vSms = document.getElementById('live_sms_list');
        };
        let index = this.playingAudio.dataset.index;
        let liHeight = vSms.children[index].offsetTop;
        if(!isPC){
          liHeight -= 100;
        }
        vScroll.scrollTop = liHeight;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .playing-audio {
    position: absolute;
    padding: 4px 20px 2px 10px;
    width: 50px;
    height: 58px;
    background: #fff;
    cursor: pointer;
    z-index: 6;
    border-radius: 50% 0 0 50%;
    -webkit-border-radius: 50px 0 0 50px;
    px2px(right, 0);
    px2px(top, 150px);
    i {
      display: block;
      margin-left: -5px;
      padding: 6px;
      color: #fff;
      background: #12B7F5;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      px2px(font-size, 38px);
    }
  }
  .is-pc {
    .playing-audio {
      top: 50px;
      left: 530px;
      padding: 2px 18px 2px 10px;
      width: 22px;
      height: 30px;
      border-radius: 30px 0 0 30px;
      -webkit-border-radius: 30px 0 0 30px;
      i {
        margin-left: -7px;
        padding: 2px 2px 2px 3px;
        font-size: 22px;
      }
    }
  }
</style>
