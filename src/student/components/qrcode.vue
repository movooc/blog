<template>
  <div class="qrcode">
    <div>
      <i class="iconfont icon-home"></i>
      <br />
      返回首页
    </div>
    <div>
      长按识别二维码
      <br />
      关注易灵公众号
      <br />
      获得更多课程&nbsp;
    </div>
    <div>
      <img src="static/_static/student/img/qrcode.png" />
    </div>
  </div>
</template>

<script>
    export default{
      name: 'qr-code',
      methods: {
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .qrcode
    display: -webkit-box;
    display: box;
    padding: 28px 0;
    px2px(font-size, 36px);
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
        color: #12b7f5;
      &:nth-of-type(2)
        border-left: 1px solid #e6eaf2;
        color: #9ca7c1;
      .iconfont
        px2px(font-size, 80px);

</style>
