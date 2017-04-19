<template>
  <!-- 直播入口 -->
  <div class="l-enter">
    <div class="l-teacher" v-if="Owner">
      <v-live></v-live>
    </div>
    <div class="l-student" v-if="!Owner">
      <v-live></v-live>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vLive from '@live/components/live/index.vue';
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-enter',
    data() {
      return {
        Owner: false,
      }
    },
    components: {
      vLive,
    },
    computed: {
    },
    methods: {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
