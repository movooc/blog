<template>
  <div class="l-chatbox">
    <div class="box">
      <span class="box-more" v-if="lessonInfo.price">
        <button @click="showRefund">
          <span class="iconfont icon-list"></span>
        </button>
      </span>
      <div class="box-msg">
        <button class="comment" @click="showComment" v-if="!commentShow">讨论区</button>
        <input v-model="msgVal" placeholder="请输入文字..." />
      </div>
      <v-refund></v-refund>
      <button class="box-send" @click="sendMsg" v-if="commentShow">提交</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim_comment';
  import vRefund from '@live/components/chatbox/refund';

  export default
  {
    name: 's-chatbox',
    components: {
      vRefund,
    },
    data() {
      return {
        msgVal: '',
      };
    },
    computed: {
      ...mapState([
        'commentShow',
        'lessonInfo',
        'studentHost'
      ])
    },
    methods: {
      sendMsg() {
        vSendMsg(this.msgVal, (err, data) => {
          if(!err){
            this.msgVal = '';
            this.commentShow || this.showComment();
          }else{
            if(err.ErrorCode == 10007){
              alert('您已被踢出群！现在要将您送回课程列表!');
              window.location.href = this.studentHost;
            }
          }
        });
      },
      showComment() {
        this.$store.commit('UPDATE_COMMETN_SHOW', true);
      },
      showRefund() {
        this.$store.commit('UPDATE_REFUND_SHOW', true);
      }
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
