<template>
  <div class="l-recorder">
    <span class="iconfont icon-hssiconsrecord" @click="toggleRecorder" :class="{'active':active}"></span>
    <a id="save"></a>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { initRecorder, toggleRecording } from '@live/assets/js/recorder';

  export default
  {
    name: 'v-recorder',
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
      initRecorder();
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
