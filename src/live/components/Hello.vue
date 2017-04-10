<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="startLive()">点击参与直播</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: '欢迎参与直播测试!!!',
    };
  },
  methods: {
    startLive() {
      this.$router.push('teacher');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  h1 {
    padding: 0 30px;
    font-weight: normal;
    font-size: 72px;
  }

  button {
    padding: 20px;
    width: 100%;
    color: #fff;
    background: #12B7F5;
    border: 0 none;
    px2px(font-size, 32px);
  }
</style>
