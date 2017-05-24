<template>
  <div class="button">
    <div class="submit">
      <button @click="clickEvent">提交</button>
    </div>
  </div>
</template>

<script>
    export default{
      name: 's-button',
      props: {
        text: {
          type: Boolean
        },
        callBack: {
          type: null
        }
      },
      methods: {
        clickEvent() {
          this.callBack();
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .button
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    background: #fff;
    z-index: 7;

    >*
      padding: 10px 30px;
      height: 80px;
    .submit
      button
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
        background: #09BB07;
        border: 0 none;
        border-radius: 12px;
        -webkit-border-radius: 12px;
        px2px(font-size, 36px);
        &[disabled]
          background: #aaa;
</style>
