<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button>
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <textarea class="box-msg" placeholder="请输入文字..."></textarea>
    <button class="box-send">提交</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-chatbox',
    components: {

    },
    data() {
      return {
        show: false
      };
    },
    computed: {
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
