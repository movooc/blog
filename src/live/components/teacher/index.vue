<template>
  <div class="teacher-bar">
    <div></div>
    <ul>
      <li>
        <router-link to="/course/list">点击进入课程列表</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'v-teacher',
    props: {

    },
    created(){
      //console.log(this);
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
</style>
