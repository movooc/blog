<template>
  <section class="user-center">
    <div class="user-img">
      <div>
        <img :src="userInfo.avatar" />
      </div>
      <div class="name" v-text="userInfo.name"></div>
      <!--<div class="listen">已经听过2个教程</div>-->
    </div>
    <ul>
      <!--<li>-->
        <!--<router-link to="/course">-->
          <!--<i class="iconfont icon-follow"></i>-->
          <!--<span>已经关注的讲师</span>-->
          <!--<span class="arrow"></span>-->
        <!--</router-link>-->
      <!--</li>-->
      <li>
        <router-link to="/user/enrolled">
          <i class="iconfont icon-buy"></i>
          <span>已报名课程</span>
          <span class="arrow"></span>
        </router-link>
      </li>
    </ul>
    <ul>
      <!-- <li>
        <router-link to="/user/guarantee">
          <i class="iconfont icon-info"></i>
          <span>课程保障</span>
          <span class="arrow"></span>
        </router-link>
      </li> -->
      <li>
        <router-link to="/user/advise">
          <i class="iconfont icon-comment"></i>
          <span>建议与反馈</span>
          <span class="arrow"></span>
        </router-link>
      </li>
      <li>
        <router-link to="/user/about">
          <i class="iconfont icon-comment"></i>
          <span>关于我们</span>
          <span class="arrow"></span>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default{
    name: 'u-center',
    components: {
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
      })
    },
    mounted() {

    },
    methods: {
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
