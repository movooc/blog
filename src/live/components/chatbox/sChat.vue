<template>
  <div class="l-chatbox">
    <div class="box">
      <span class="box-more">
        <button @click="showModule">
          <span class="iconfont icon-list"></span>
        </button>
      </span>
      <div class="box-msg" v-if="lessonInfo.step!='finish' && lessonInfo.step!='closed'">
        <button class="comment" @click="showComment" v-if="!commentShow">讨论区</button>
        <input v-model="msgVal" placeholder="请输入文字..." @focus="focusEvent" />
      </div>
      <div class="box-msg c-finish" v-if="lessonInfo.step=='finish' || lessonInfo.step=='closed'">
        <button class="comment" v-if="!commentShow">讨论区</button>
      </div>
      <v-refund></v-refund>
      <button class="box-send" @click="sendMsg" v-if="commentShow">发送</button>
      <div class="more-choice" v-if="boxMoreShow">
        <button @click="backHome">回到首页</button>
        <button @click="showEva" v-if="!isEvaluate && !lessonInfo.rated && (lessonInfo.event != 'refund')">评价课程</button>
        <button @click="showRefund" v-if="lessonInfo.event != 'refund' && lessonInfo.price && !lessonInfo.refund_info">申请退款</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg } from '@live/assets/js/webim_comment';
  import vRefund from '@live/components/chatbox/refund';
  import swal from 'sweetalert';
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
      };
    },
    computed: {
      ...mapState([
        'commentShow',
        'lessonInfo',
        'studentHost',
        'isEvaluate',
        'boxMoreShow',
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
              swal({
                  title: '错误提醒',
                  text: '您已被踢出群！现在要将您送回课程列表!',
                  confirmButtonText: "知道了"
                }, ()=>{
                  window.location.href = this.studentHost;
              });
            }else if(err.ErrorCode == 10017){
              swal({
                title: '错误提醒',
                text: '您已被禁言!',
                confirmButtonText: "知道了"
              });
            }else{
              swal({
                title: '错误提醒',
                text: err.SrcErrorInfo,
                confirmButtonText: "知道了"
              });
            }
          }
        });
      },
      showComment() {
        this.$store.commit('UPDATE_COMMETN_SHOW', true);
        // 更多菜单
        if(this.boxMoreShow){
          this.$store.commit('UPDATE_BOX_MORE', false);
        }
      },
      showModule() {
        this.$store.commit('UPDATE_BOX_MORE', !this.boxMoreShow);
      },
      showRefund() {
        // 组装
        let params = {
          lesson_sn: this.lessonInfo.sn,
          mode: this.lessonInfo.refund_mode,
          title: this.lessonInfo.title,
          price: this.lessonInfo.price,
          teacher: this.lessonInfo.teacher.name,
        };
        let paramsStr = `lesson_sn=${params.lesson_sn}&origin=live`;
        /*let count = 0;*/
        // 组装
        /*for (let p in params){
          paramsStr = (count++) ? `${paramsStr}&${p}=${encodeURIComponent(params[p])}` : `${p}=${encodeURIComponent(params[p])}`;
        };*/

        // 跳转
        window.location.href = `${this.studentHost}#/course/refund?${paramsStr}`;
      },
      showEva() {
        this.$store.commit('UPDATE_EVALUATE_SHOW', true);
        this.$store.commit('UPDATE_BOX_MORE', false);
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
