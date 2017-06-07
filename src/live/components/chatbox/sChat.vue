<template>
  <div class="l-chatbox">
    <div class="box" v-if="lessonInfo.step!='finish'">
      <span class="box-more">
        <button @click="showModule">
          <span class="iconfont icon-list"></span>
        </button>
      </span>
      <div class="box-msg">
        <button class="comment" @click="showComment" v-if="!commentShow">讨论区</button>
        <input v-model="msgVal" placeholder="请输入文字..." @focus="focusEvent" />
      </div>
      <v-refund></v-refund>
      <button class="box-send" @click="sendMsg" v-if="commentShow">发送</button>
      <div class="more-choice" v-if="moduleShow">
        <button @click="backHome">回到首页</button>
        <button @click="showEva" v-if="!isEvaluate && !lessonInfo.rated">评价</button>
        <button @click="showRefund" v-if="lessonInfo.price">申请退款</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim_comment';
  import vRefund from '@live/components/chatbox/refund';
  // scroll
  var vScroll = null;

  export default
  {
    name: 's-chatbox',
    components: {
      vRefund,
    },
    data() {
      return {
        msgVal: '',
        moduleShow: false,
      };
    },
    computed: {
      ...mapState([
        'commentShow',
        'lessonInfo',
        'studentHost',
        'isEvaluate'
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
        if(!vScroll){
          vScroll = document.getElementById('live-body');
        };
        //setTimeout(()=>{
        //  vScroll.scrollTop = vScroll.scrollHeight;
        //}, 400);
      },
      showModule() {
        this.moduleShow = !this.moduleShow;
      },
      showRefund() {
        this.$store.commit('UPDATE_REFUND_SHOW', true);
      },
      showEva() {
        this.$store.commit('UPDATE_EVALUATE_SHOW', true);
        this.moduleShow = false;
      },
      backHome() {
        window.location.href = this.studentHost;
      },
      focusEvent() {
        let ios = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
        if(ios){
          setTimeout(()=>{
            document.body.scrollTop = document.body.scrollHeight;
          },400);
        }
      }
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
