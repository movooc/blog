<template>
  <section class="guarantee">
    <dl>
      <dt>支付保障：</dt>
      <dd>全程使用微信支付，无额外第三方参与，保证支付安全</dd>
    </dl>
    <dl>
      <dt>有效回看：</dt>
      <dd>课程结束后可以进行回放观看</dd>
    </dl>
    <dl>
      <dt>自动退款：</dt>
      <dd>未进入听课界面，在课程结束24小时后自动退款到微信钱包内</dd>
    </dl>
    <dl>
      <dt>申述退款：</dt>
      <dd>由讲师及工作人员进行处理</dd>
    </dl>
    <dl>
      <dt>无条件退款：</dt>
      <dd>听课时长一小时以内可无条件退款</dd>
    </dl>
  </section>
</template>

<script>
  export default{
    name: 'guarantee',
    components: {
    },
    mounted() {

    },
    methods: {
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .guarantee
    padding: 20px;
    px2px(font-size, 28px);
    dl
      margin: 0;
      padding: 5px 0;
      &:after
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      dt,dd
        float: left;
      dt
        width: 180px;
        color: #12b7f5;
      dd
        width: 480px;
</style>
