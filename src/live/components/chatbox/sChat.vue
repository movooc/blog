<template>
  <div class="l-chatbox">
    <div class="box">
      <span class="box-more">
        <button @click="showComment">
          <span class="iconfont icon-list"></span>
        </button>
      </span>
      <div class="box-msg">
        <input v-model="msgVal" placeholder="请输入文字..." />
      </div>
      <button class="box-send" @click="sendMsg">提交</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim_comment';

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
      ...mapState([
        'commentShow',
      ])
    },
    methods: {
      sendMsg() {
        vSendMsg(this.msgVal, (err, data) => {
          if(!err){
            this.msgVal = '';
            this.commentShow || this.showComment();
          }
        });
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
