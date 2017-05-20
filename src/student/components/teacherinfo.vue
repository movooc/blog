<template>
  <div class="teacher-info" v-if="teacher">
    <div class="t-tit">
      <span>讲师</span>
      <span class="focus">+关注</span>
    </div>
    <div class="t-con clearfix">
      <div class="t-img">
        <img :src="teacher.avatar" />
      </div>
      <div class="t-text">
        <div v-text="teacher.name"></div>
        <p v-text="teacher.about"></p>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    name: 'teacher-info',
    props: {
      teacher: {
        type: Object
      }
    },
    created() {

    },
    methods: {
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .teacher-info {
    padding: 0 30px;
    background: #fff;
    px2px(font-size, 36px);

    .t-tit {
      position: relative;
      padding: 38px 0 30px;

      :first-child {
        px2px(font-size, 42px);
      }
      .focus {
        position: absolute;
        right: 0;
        padding: 12px 18px;
        background: #f7f9fc;
        border-radius: 50px;
        -webkit-border-radius: 50px;
        color: #12B7F5;
        px2px(top, 28px);
        px2px(font-size, 32px);
      }
    }

    .t-con {
      padding-bottom: 30px;
      overflow: hidden;

      >* {
        float: left;
      }
      .t-img {
        margin-right: 40px;

        img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          -webkit-border-radius: 50%;
        }
      }
      .t-text {
        width: 550px;
        :first-child {
          color: #12b7f5;
          px2px(font-size, 40px);
        }
        :last-child {
          color: #70788C;
          margin: 10px 0 10px;
          px2px(font-size, 32px);
        }
      }
    }
  }
</style>
