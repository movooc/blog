<template>
  <div class="l-audio">
    <audio :id="id" preload="auto">
      <source type="audio/wav">
      <!--<source type="audio/wav">-->
    </audio>
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
      let audio = document.getElementById(this.id);
      let objAudio = audiojs.create(audio, {css: ''});
      objAudio.element.children[0].setAttribute('src', self.src);

      // observer
      (function observerAudio() {
        if(!objAudio.playing){
          setTimeout(function(){observerAudio();}, 1500);
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
