<template>
  <section class="evaluate-lesson">
    <!-- evaluate -->
    <div class="eva-body">
      <div class="eva-title">
        课程评价
      </div>
      <div class="e-star">
        <v-star :mode="1" @updateStarNum="changeStarNum"></v-star>
      </div>
      <div class="textarea">
        <textarea v-model="data.remark" placeholder="亲，写下你对课程的看法吧！"></textarea>
      </div>
      <s-button :callBack="submitEva"></s-button>
    </div>
  </section>
</template>

<script>
  import vStar from '@student/components/star.vue';
  import sButton from '@student/components/button';

  export default{
    name: 'evaluate-lesson',
    components: {
      vStar,
      sButton
    },
    data() {
      return {
        data: {
          lesson_sn: null,
          remark: '',
          score: 0,
        }
      }
    },
    created() {
      this.data.lesson_sn = this.$route.params.lesson_sn;
    },
    methods: {
      changeStarNum(num) {
        this.data.score = num;
      },
      submitEva() {
        if(!this.data.lesson_sn)return swal({
          title: '错误提醒',
          text: '参数错误!',
          confirmButtonText: "知道了"
        });
        if(!this.data.score){
          return swal({
            title: '错误提醒',
            text: '请选择评价星级!',
            confirmButtonText: "知道了"
          });
        }
        // 评价开始
        this.$store.dispatch('fetchEvaluate', this.data).then(() => {
          swal({
            title: '',
            text: '评价成功!',
            confirmButtonText: "知道了"
          }, ()=>{
            this.$router.replace({ name: 'evaluate', query: {lesson_sn:this.data.lesson_sn} });
          });
        }, (error) => {
          if(error == 1){
            return swal({
              title: '',
              text: '未听课不能评价!',
              confirmButtonText: "知道了"
            }, ()=>{
              this.$router.replace({ name: 'enrolled' });
            });
          }
          if(error == 2){
            return swal({
              title: '',
              text: '您已经评价过，不能重复评价!',
              confirmButtonText: "知道了"
            }, ()=>{
              this.$router.replace({ name: 'enrolled' });
            });
          }
          //
          swal({
            title: '错误提醒',
            text: '网络连接失败!',
            confirmButtonText: "知道了"
          });
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .evaluate-lesson {
    background: #FFF;
    .eva-body {
      padding: 0 40px 40px;
    }
    .eva-title {
      padding: 39px 0;
      text-align: center;
      border-bottom: 1px solid #E6EAF2;
      px2px(font-size, 36px);
    }
    .e-star {
      padding: 40px 0 34px;
      .v-star {
        .iconfont {
          px2px(font-size, 64px);
        }
      }
    }
    .textarea {
      padding: 10px;
      background: #F4F6F9;
      textarea {
        width: 100%;
        height: 260px;
        border: 0 none;
        background: #F4F6F9;
        px2px(font-size, 32px);
      }
    }
  }
</style>
