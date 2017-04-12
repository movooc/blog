<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button>
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <div class="box-msg">
      <textarea v-model="msgVal" placeholder="请输入文字..." @blur="v_blur"></textarea>
      <span class="iconfont icon-hssiconsrecord"></span>
    </div>
    <button class="box-send" @click="sendMsg">提交</button>
    <ul class="more-choice">
      <li>
        <button>上传图片</button>
      </li>
      <li>2</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim';

  export default
  {
    name: 'v-chatbox',
    components: {

    },
    data() {
      return {
        show: false,
        msgVal: '',
      };
    },
    computed: {
    },
    methods: {
      sendMsg() {
        vSendMsg(this.msgVal, (err, data) => {
          if(!err){
              this.msgVal = '';
          }
        });
      },
      isShow() {
        this.$store.commit('UPDATE_MENUSHOW');
      },
      v_blur() {
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
