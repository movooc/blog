<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="startLive('create')">老师界面直播</button>
    <button @click="startLive('join')">学员界面直播</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: '课程详情!!!',
    };
  },
  methods: {
    startLive(str) {
      str == 'create' ? this.$router.push({path:'teacher', query: {createRoom:true}}) :
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
    margin-bottom: 10px;
    padding: 20px;
    width: 100%;
    color: #fff;
    background: #12B7F5;
    border: 0 none;
    cursor: pointer;
    px2px(font-size, 32px);
  }

  .is-pc h1{
    text-align: center;
    font-size: 24px;
  }
</style>
