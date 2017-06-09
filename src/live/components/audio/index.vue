<template>
  <div class="rd-audio-player">
      <audio :id="id" :data-index="index"></audio>
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
          <div class="rd-audio-time duration">{{mu.state.lastTimeFormat}}/{{mu.state.durationTimerFormat}}</div>
      </div>
      <div class="buffer" v-if="buffering">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
      <div class="iconfont icon-dot" v-if="!played"></div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { setStore, getStore } from '@lib/js/mUtils';
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
        type: String
      },
      src: {
        type: String
      },
      index: {
        type: null
      },
      history: {
        type: Boolean
      },
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
        initAudio: [],
        firstLoad: true,
        buffering: false,
        played: false,
        isEnd: false,
      };
    },
    created() {
      // 初始化audio
      let refs = this.$parent.$refs;
      let audios = refs.audios;
      this.initAudio = Array.isArray(audios)?[...audios]:audios;
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
        });
        // 获取audio对象
        let _audio = getStore(`audio-${this.id}`);
        let audios = this.initAudio;
        // 开始
        if(_audio){
          _audio = JSON.parse(_audio);
          this.played = _audio.played || false;
        }else{
          // 是否是历史记录
          if(this.history)return;
          if(Array.isArray(audios)){
            let audio = audios[audios.length-1];
            if(audio.played && audio.isEnd){
              // 播放
              this.play();
            }
          }
        };
      },
      touchCover () {
          if (this.state.playing) {
              this.pause()
          } else {
              this.prePlay()
          }
      },
      touchSlider (e) {
          let time = e.layerX / e.target.offsetWidth * this.mu.state.duration
          this.mu.setTime(time)
      },
      prePlay () {
        this.play();
      },
      play () {
        var self = this;
        // 所有组件暂停
        self.pausePlaying();
        // 正在播放
        self.state.playing = true;
        // 结束标志设置
        self.isEnd = false;
        // 是否是首次加载
        if(self.firstLoad){
          let isIos = (navigator.userAgent.match(/(iPhone|iPad|ios)/i) == null)?false:true;
          // 是否是ios设备
          if(!isIos){
              // 是否已经播放过
            if(!self.played){
              setStore(`audio-${self.id}`, {played: true});
              self.played = true;
            }
            //
            self.firstLoad = false;
            // 记住正在播放的audio
            //self.$store.commit('UPDATE_PLAYER', self.mu.$Audio);
            self.$store.commit('UPDATE_PLAYER', self);
            return self.mu.play();
          }
          self.buffering = true;
          // ios开始加载
          self.mu.$Audio.load();
          // 计时开始
          let timeStart = new Date().getTime();
          let count = 0;
          let reCount = 0;
          // observer 是否可以播放
          (function observerAudio() {
            let time = new Date().getTime();
            // 是否已经加载好
            if(self.mu.$Audio.readyState < 2){
              if(isWeiXin && count<1){
                timeStart = new Date().getTime();
                // ios开始加载
                //self.mu.$Audio.load();
                WeixinJSBridge.invoke('getNetworkType', {}, (e) => {
                  self.mu.$Audio.play();
                  count++;
                });
              }else if((time-timeStart) > 2000){
                if(reCount<1){
                  self.mu.$Audio.load();
                }else{
                  self.buffering = false;
                  self.pause();
                  return;
                }
                reCount++;
                /*if(isWeiXin){
                  timeStart = new Date().getTime();
                  WeixinJSBridge.invoke('getNetworkType', {}, (e) => {
                    self.mu.$Audio.play();
                    count++;
                  });
                }else{
                  self.buffering = false;
                  self.pause();
                  return;
                }*/
              }
              setTimeout(function(){observerAudio();}, 1000);
            }else{
              self.buffering = false;
              // 是否正在播放
              if(!self.state.playing)return;
              // 是否已经播放过
              if(!self.played){
                setStore(`audio-${self.id}`, {played: true});
                self.played = true;
              }
              // 记住正在播放的audio
              self.$store.commit('UPDATE_PLAYER', self);
              // 开始播放
              self.mu.play();
              self.firstLoad = false;
            }
          })();
        }else{
          // 记住正在播放的audio
          self.$store.commit('UPDATE_PLAYER', self);
          self.mu.play();
        }
      },
      pause () {
        this.state.playing = false;
        this.buffering = false;
        this.mu.pause();
      },
      ended () {
        // 清楚正在播放的audio记录
        this.$store.commit('UPDATE_PLAYER', null);
        this.isEnd = true;
        this.pause();
        this.nextPlay();
      },
      nextPlay() {
        // 获取所有audio
        let refs = this.$parent.$refs;
        let audios = refs.audios;
        let canPlay = false;
        // 遍历所有audio
        if(Array.isArray(audios)){
          for(let au of audios){
            if(canPlay){
              au.play();
              break;
            }
            if(au.id == this.id){
              canPlay = true;
            }
          }
        }
      },
      pausePlaying() {
        // 获取所有audio
        let refs = this.$parent.$refs;
        let audios = refs.audios;
        // 遍历所有audio
        if(Array.isArray(audios)){
          for(let au of audios){
            if(au.state.playing){
              au.pause();
            }
          }
        }
      },
//      volplus () {
//          this.mu.setVolume(this.mu.state.volume + 0.1)
//      },
//      volminus () {
//          this.mu.setVolume(this.mu.state.volume - 0.1)
//      }
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
