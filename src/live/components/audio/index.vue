<template>
  <div class="l-audio">
    <span class="iconfont icon-hssiconsrecord" @click="toggleRecorder" :class="{'active':active}"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { initAudio } from '@live/assets/js/audio';

  export default
  {
    name: 'v-audio',
    components: {
    },
    data() {
      return {
        active: false,
      };
    },
    computed: {
    },
    created() {
      initAudio();
    },
    methods: {
      toggleRecorder(){
          this.active = !this.active;
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
