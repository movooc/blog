<template>
  <div class="l-recorder" v-if="!isSending">
    <span class="iconfont icon-mic" @click="toggleRecorder" :class="{'active':active}"></span>
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
        active: false
      };
    },
    computed: {
      ...mapState({
        isSending: 'sending'
      })
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
