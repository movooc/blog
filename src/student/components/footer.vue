<template>
  <footer class="footer">
    <router-link to="/course">
      <i class="iconfont icon-lesson"></i>
      <br />
      <span>课程列表</span>
    </router-link>
    <router-link to="/user">
      <i class="iconfont icon-user"></i>
      <br />
      <span>个人中心</span>
    </router-link>
  </footer>
</template>

<script>
    export default{
      name: 'v-footer',
      methods: {
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .footer {
    position: fixed;
    display: -webkit-box;
    display: box;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    background: #fff;
    -moz-box-shadow:0px -1px 10px #878787;
    -webkit-box-shadow:0px -1px 10px #878787;
    box-shadow:0px -1px 10px #878787;
    z-index: 6;
    px2px(font-size, 36px);

    >* {
      display: -webkit-box;
      display: box;
      -webkit-box-flex: 1;
      box-flex: 1;
      box-align: center;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      text-align: center;
      text-decoration: none;
      color: #7f8389;
      px2px(font-size, 24px);

      &.active{
        color: #00a551;
      }
      i{
        px2px(font-size, 40px);
      }
    }
  }
</style>
