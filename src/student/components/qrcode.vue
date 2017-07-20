<template>
  <div class="qrcode">
    <!--<div @click="backToHome">
      <i class="iconfont icon-home"></i>
      <br />
      返回首页
    </div>-->
    <div>
      长按识别二维码
      <br />
      关注易灵微课&nbsp;
      <!--<br />-->
      <!--获取更多课程&nbsp;-->
      <div class="qrcode-img">
        &nbsp;&nbsp;
        <img :src="`${assetsHost}/static/student/_static/student/img/qrcode.png`" />
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default{
      name: 'qr-code',
      computed: {
        ...mapGetters({
          assetsHost: 'getAssetsHost',
        })
      },
      methods: {
        backToHome() {
          this.$router.push({ name: 'course' });
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .qrcode
    display: -webkit-box;
    display: box;
    padding: 36px 0;
    border-top: 1px solid #e6eaf2;
    background: #fff;
    px2px(font-size, 32px);
    >*
      display: -webkit-box;
      display: box;
      -webkit-box-flex: 1;
      box-flex: 1;
      text-align: center;
      box-align: center;
      -webkit-box-align: center;
      box-pack: center;
      -webkit-box-pack: center;
      px2px(line-height, 50px);

      &:first-child
        /*color: #12b7f5;*/
        px2px(font-size, 30px);
      &:nth-of-type(2)
        border-left: 1px solid #e6eaf2;
        color: #9ca7c1;
        px2px(font-size, 30px);
      .iconfont
        px2px(font-size, 80px);
    .qrcode-img
      img
        width: 220px;
        height: 220px;

</style>
