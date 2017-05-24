<template>
  <div class="handle" v-if="show">
    <div class="handle-box">
      <div class="handle-title">请选择您要的操作！</div>
      <div class="handle-btn">
        <span @click="startComment" v-if="lessonInfo.step!='repose'">进入课后交流</span>
        <span @click="endLesson">结束授课</span>
        <span @click="close">关闭操作</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { removeStore } from '@lib/js/mUtils';

  export default
  {
    name: 'v-handle',
    props: {
      show: {
        type: Boolean,
      },
      callBack: {
        type: null,
      }
    },
    components: {
    },
    data() {
      return {
        refunding: false,
      };
    },
    computed: {
      ...mapState([
        'lessonInfo',
      ])
    },
    methods: {
      startComment() {
        let opt = {
          lesson_sn:this.lessonInfo.sn,
        };
        this.$store.dispatch('fetchStartComment', opt).then(() => {
          removeStore(opt.lesson_sn);
          alert('可以开始学员交流!');
          window.location.reload();
        }, () => {
          console.log('fail');
        });
        // 关闭
        this.callBack(false);
      },
      endLesson() {
        if(!window.confirm('课程结束，您和学员都无法继续发布内容，但仍可回看所有授课区内容')){
          return;
        }
        let opt = {
          lesson_sn:this.lessonInfo.sn,
        };
        this.$store.dispatch('fetchEndLesson', opt).then(() => {
          removeStore(opt.lesson_sn);
          alert('课程已结束!');
          window.location.reload();
        }, () => {
          console.log('fail');
        });
        // 关闭
        this.callBack(false);
      },
      close() {
        this.callBack(false);
      },
    },
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .handle
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100% !important;
    background-color: rgba(0,0,0,0.5);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .handle-box
      position: relative;
      margin: 0 auto;
      width: 300px;
      background: #fff;
      border-radius: 10px;
      -webkit-border-radius: 10px;
      .handle-title
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #D2D3D5;
        font-size: 16px;
      .handle-btn
        >*
          display: block;
          padding: 10px;
          font-size: 14px;
          text-align: center;
          color: #00C200;
          cursor: pointer;
        span+span
          border-top: 1px solid #D2D3D5;
          &:last-child
            color: #aaa;

</style>
