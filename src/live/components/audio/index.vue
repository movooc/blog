<template>
  <div class="rd-audio-player">
      <audio :id="id" preload="auto"></audio>
      <div class="rd-audio-cover" @click="touchCover">
          <button class="rd-audio-player-btn" transition="bounce" :class="{'pause':state.playing}"></button>
      </div>
      <div class="rd-audio-contrl">
          <div class="rd-audio-slider-container" @click="touchSlider">
              <div class="rd-audio-slider">
                  <div class="rd-audio-slider-rail">
                      <div class="rd-audio-slider-rail-inner" :style="{ 'width': mu.state.progress + '%' }"></div>
                  </div>
              </div>
          </div>
          <div class="rd-audio-time duration">{{mu.state.lastTimeFormat}}</div>
      </div>
      <div class="buffer" v-if="buffering">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import VueAudio from './VueAudio.js';

  const pad = (val) => {
    val = Math.floor(val)
    if (val < 10) {
        return '0' + val
    }
    return val + ''
  }
  const timeParse = (sec) => {
    let min = 0
    min = Math.floor(sec / 60)
    sec = sec - min * 60
    return pad(min) + ':' + pad(sec)
  }

  export default
  {
    name: 'v-audio',
    props: {
      id: {
        type: Number
      },
      src: {
        type: String
      }
    },
    components: {
    },
    computed: {
      ...mapState([
        'audioPause'
      ])
    },
    data() {
      return {
        mu: {
          state: {
            startLoad: false,
            failed: false,
            try: 3,
            tried: 0,
            playing: false,
            paused: false,
            playbackRate: 1.0,
            progress: 0,
            currentTime: 0,
            duration: 0,
            volume: 0.5,
            loaded: '0',
            durationTimerFormat: '00:00',
            currentTimeFormat: '00:00',
            lastTimeFormat: '00:00'
          }
        },
        state: {
          liked: false,
          playing: false
        },
        firstLoad: true,
        buffering: false,
      };
    },
    create() {

    },
    mounted() {
      this.init();
    },
    updated() {
    },
    methods: {
      init () {
        this.mu = new VueAudio(this.src, {
          preload: true,
          autoplay: false,
          rate: 1,
          loop: false,
          volume: 0.5,
          audio: document.getElementById(this.id),
          ended: ()=>{
              this.ended()
          }
        })
      },
      touchCover () {
          if (this.state.playing) {
              this.pause()
          } else {
              this.prePlay()
          }
      },
      touchSlider (e) {
          let time
          time = e.layerX / e.target.offsetWidth * this.mu.state.duration
          this.mu.setTime(time)
      },
      prePlay () {
        // 所有audio暂停播放
        //this.$store.commit('UPDATE_AUDIO_PAUSE', true);
        this.play();
      },
      play () {
          var self = this;
          self.state.playing = true;
          if(self.firstLoad){
            let isIos = (navigator.userAgent.match(/(iPhone|iPad|ios)/i) == null)?false:true;
            if(!isIos){
              return self.mu.play();
            }
            self.buffering = true;
            // ios开始加载
            self.mu.$Audio.load();
            // observer
            (function observerAudio() {
              if(self.mu.$Audio.readyState < 2){
                self.mu.$Audio.load();
                setTimeout(function(){observerAudio();}, 1000);
              }else{
                self.buffering = false;
                // 是否正在播放
                if(!self.state.playing)return;
                self.mu.play();
                self.firstLoad = false;
              }
            })();
          }else{
            self.mu.play();
          }
      },
      pause () {
          this.state.playing = false
          this.mu.pause()
      },
      ended () {
        this.pause()
      },
      volplus () {
          this.mu.setVolume(this.mu.state.volume + 0.1)
      },
      volminus () {
          this.mu.setVolume(this.mu.state.volume - 0.1)
      }
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
