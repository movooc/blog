<template>
  <div>
    <div class="page-cover" v-show="menuShow" @click="isShow"></div>
    <header class="header" :class="{'show': menuShow}" @click="isShow">
      <header class="bar">
        <div class="bar-nav back">
          <span class="iconfont icon-left"></span>
        </div>
        <div class="title">{{headerTitle}}</div>
        <div class="bar-nav more">
          <span class="iconfont icon-dot-more"></span>
        </div>
      </header>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-header',
    components: {

    },
    data() {
      return {
        show: false
      };
    },
    computed: {
      ...mapState([
        'headerTitle', 'menuShow'
      ])
    },
    methods: {
      isShow() {
        this.$store.commit('UPDATE_MENUSHOW');
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
