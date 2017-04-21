<template>
  <div class="l-chatbox">
    <div class="box">
      <span class="box-more">
        <button @click="showComment">
          <span class="iconfont icon-dot-more"></span>
        </button>
      </span>
      <div class="box-msg">
        <textarea v-model="msgVal" placeholder="请输入文字..."></textarea>
      </div>
      <button class="box-send" @click="sendMsg">提交</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim';

  export default
  {
    name: 's-chatbox',
    components: {

    },
    data() {
      return {
        msgVal: '',
      };
    },
    computed: {

    },
    methods: {
      sendMsg() {
          alert('开发中...');
      },
      showComment() {
        this.$store.commit('UPDATE_COMMETN_SHOW', true);
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
