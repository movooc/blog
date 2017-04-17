<template>
  <div class="l-audio">
    <audio :id="id" v-bind:src="src"></audio>
    <span class="iconfont icon-dot" :class="{'hidden': played}"></span>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';

  export default
  {
    name: 'v-audio',
    props: {
      id: {
        type: Number
      },
      src: {
        type: String
      },
    },
    components: {
    },
    data() {
      return {
        active: false,
        played: false,
      };
    },
    computed: {
    },
    mounted() {
      let self = this;
      let objAudio = audiojs.create(document.getElementById(this.id), {css: ''});
      // observer
      (function observerAudio() {
        if(!objAudio.playing){
          setTimeout(function(){observerAudio();}, 500);
        }else{
          self.played = true;
        }
      })();
    },
    methods: {
      toggleRecorder(){

      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
