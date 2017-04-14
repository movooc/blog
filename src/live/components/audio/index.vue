<template>
  <div class="l-audio">
    <span class="iconfont icon-hssiconsrecord" @click="toggleRecorder" :class="{'active':active}"></span>
    <a id="save"></a>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { initAudio, toggleRecording } from '@live/assets/js/audio';

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
          toggleRecording(this);
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
