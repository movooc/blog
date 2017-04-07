<template>
  <!-- 老师直播 -->
  <div class="l-teacher">
    <v-live></v-live>
  </div>
</template>

<script type="text/ecmascript-6">
  import vLive from '@live/components/live/index.vue';
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-teacher',
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
