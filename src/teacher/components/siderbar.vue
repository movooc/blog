<template>
  <div class="siderbar">
    <div class="bar-info clearfix">
      <div class="bar-img pull-left">
        <img :src="userInfo.avatar">
      </div>
      <div class="bar-text pull-left">
        <h4 v-text="userInfo.name"></h4>
        <p>恩咕啦</p>
      </div>
    </div>
    <ul class="bar-list">
      <li>
        <router-link to="/all">
          <i class="iconfont icon-all"></i>
          &nbsp;&nbsp;
          我的总览
        </router-link>
      </li>
      <li>
        <router-link to="/course">
          <i class="iconfont icon-menu"></i>
          &nbsp;&nbsp;
          我的课程
        </router-link>
      </li>
      <li>
        <router-link to="/profit">
          <i class="iconfont icon-earning"></i>
          &nbsp;&nbsp;
          查看收益
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default{
    name: 'sider-bar',
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
      })
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pull-left {
    float: left;
  }
  .siderbar {
    float: left;
    width: 270px;
    height: 544px;
    background: #fff;

    a {
      text-decoration: none;
    }
    .bar-img {
      padding: 28px 24px;
      img {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style-type: none;
        a {
          position: relative;
          display: block;
          padding: 20px 0 20px 40px;
          color: #aaaaaa;
          &:before {
            position: absolute;
            left: -2px;
            top: 20px;
            bottom: 20px;
            width: 0;
            content: "";
            background: #12B7F5;
            z-index: 1;
          }
          &.active {
            color: #12B7F5;
            &:before {
              width: 2px;
            }
          }
        }
      }
    }
  }
</style>
