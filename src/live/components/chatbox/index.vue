<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button>
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <textarea v-model="msgVal" class="box-msg" placeholder="请输入文字..." @blur="v_blur"></textarea>
    <button class="box-send" @click="sendMsg">提交</button>
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
        vSendMsg(this.msgVal).then((err, data) => {
          this.msgVal = '';
        },(err, data) => {
          console.log(err);
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
