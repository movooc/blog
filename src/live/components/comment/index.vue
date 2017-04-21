<template>
  <div class="l-comment" v-if=commentShow>
    <div class="back-live" v-if="!isPC"><button @click="hideComment">回到直播</button></div>
    <div class="comment-body">
      <div class="comment-title">讨论区</div>
      <div class="comment-content">
        <ul>
          <li>
            <div class="user-img">
              <img src="static/_static/live/img/user-img.png" alt="">
            </div>
            <div class="user-content">
              <div class="con-title">用户</div>
              <div class="con-time">2017-03-26 20:33 <a href="javascrip:;">操作</a></div>
              <div class="con-text">老师说的好！</div>
            </div>
          </li>
          <li>
            <div class="user-img">
              <img src="static/_static/live/img/user-img.png" alt="">
            </div>
            <div class="user-content">
              <div class="con-title">用户</div>
              <div class="con-time">2017-03-26 20:33 <a href="javascrip:;">操作</a></div>
              <div class="con-text">老师说的好！</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-comment',
    components: {

    },
    data() {
      return {
        isPC,
      };
    },
    updated(){

    },
    computed: {
      ...mapState([
        'commentShow',
      ])
    },
    methods: {
      hideComment() {
        this.$store.commit('UPDATE_COMMETN_SHOW', false);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
