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
    computed: {
    },
    data() {
      return {
        active: false,
        played: false,
      };
    },
    create() {

    },
    mounted() {
      let self = this;
      let audio = document.getElementById(this.id);
//      let source = audio.getElementsByTagName('source')[0];
      //objAudio.element.setAttribute('src', self.src);
//      (function observerAudio() {
//        if(audio.readyState > -1 && audio.readyState < 1){
//          setTimeout(function(){observerAudio();}, 1500);
//        }else {
//          //
//          let objAudio = audiojs.create(audio, {css: ''});
//        }
//      })();

      let objAudio = audiojs.create(audio, {css: ''});
      objAudio.element.setAttribute('src', self.src);
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
