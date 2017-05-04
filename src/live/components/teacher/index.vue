<template>
  <div class="teacher-bar">
    <div class="bar-title">
      <div class="img">
        <span><img :src="teacherInfo.avatar"></span>
      </div>
      <div class="info">
        <p v-text="teacherInfo.name"></p>
        <p class="grey">简介</p>
      </div>
    </div>
    <ul class="bar-list">
      <li><router-link to="/">我的总揽</router-link></li>
      <li><router-link to="/">我的课程</router-link></li>
      <li><router-link to="/">查看收益</router-link></li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    name: 'v-teacher',
    computed: {
      ...mapState([
        'teacherInfo',
      ])
    },
    props: {

    },
    created(){

    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
</style>
