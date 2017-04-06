<script src="../../../stylus-px2rem-master/lib/px2rem.js"></script>
<template>
  <div id="app">
    <img src="./assets/img/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    div
      font-size: 12px;

</style>
