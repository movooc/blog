<template>
  <div class="loading">
    <div class="loading-dialog">
      <div class="loading-audio">
        <img :src="`${assetsHost}static/live/_static/live/img/recorder.gif`" v-show="!blobRecord" />
        <span v-show="blobRecord" class="audition">试听</span>
        <div class="time" v-if="!recorderStatus" v-text="recorderTimer"></div>
        <audio id="save" controls v-show="blobRecord"></audio>
      </div>
      <div class="is-recording">
        <button @click="cancleRecording" v-if="!blobRecord">取消</button>
        <button @click="cancleBlobRecording" v-if="blobRecord">取消</button>
        <!--开始-->
        <button @click="stopRecording" v-if="!recorderStatus">停止</button>
        <button v-if="recorderStatus && !blobRecord">录音中...</button>
        <button @click="startUpload" v-if="blobRecord">发送</button>
      </div>
      <button class="cancle" @click="cancleRecording" v-if="!blobRecord">&#88;</button>
      <button class="cancle" @click="cancleBlobRecording" v-if="blobRecord && !uploading">&#88;</button>
      <!-- 遮罩 -->
      <div class="uploading" v-if="uploading">
        <span class="progress">
          <em v-bind:style="sendWidth"></em>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { toggleRecording } from '@live/assets/js/recorder';
  import { uploadSound } from '@live/assets/js/webim';
  import { mapState } from 'vuex';

  export default {
    name: 'recording',
    props: {
    },
    data(){
      return {
        //stop: false,
        sendWidth: 0,
        uploading: false,
      }
    },
    computed: {
      ...mapState({
        blobRecord: 'blobRecord',
        recorderStatus: 'recorderStatus',
        recorderTimer: 'recorderTimer',
        assetsHost: 'assetsHost',
      })
    },
    created() {
      this.$store.commit('UPDATE_RECORDER_STATUS', false);
      this.$store.commit('UPDATE_RECORDER_TIMER', '0:01');
    },
    methods: {
      cancleRecording() {
        this.$store.commit('UPDATE_CANCLE_RECORD', true);
      },
      cancleBlobRecording() {
        this.$store.commit('UPDATE_RECORDING', false);
        this.$store.commit('UPDATE_BLOB_RECORDING', null);
      },
      stopRecording() {
        this.$store.commit('UPDATE_RECORDER_STATUS', true);
        toggleRecording();
      },
      startUpload() {
        // 开始上传
        // 打开上传状态
        this.uploading = true;
        //
        uploadSound(this.blobRecord, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.$store.commit('UPDATE_RECORDING', false);
          this.$store.commit('UPDATE_BLOB_RECORDING', null);
          console.log('上传成功!');
        }, (loadedSize, totalSize) => {
          this.sendWidth = `${(loadedSize / totalSize) * 100}%`;
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'index.styl';
  .loading
    display: flex;
    -webkit-display: flex;
    align-items:center;
    justify-content: center;
    z-index: 4;
    opacity: 1;
    background-color: rgba(0,0,0,.3);
    px2px(font-size, 32px);
    .loading-dialog
      position: relative;
      width: 310px;
      .uploading
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        background-color: rgba(255,255,255,.3);
      .loading-audio
        height: 100px;
        background: #12b7f5;
        text-align: center;
        .audition
          display: block;
          padding: 10px 0 20px;
          color: #fff;
        img
          margin-top: 25px;
          display: inline-block;
        .time
          color: #fff;
      .cancle
        position: absolute;
        right: -6px;
        top: -6px;
        padding: 4px 6px;
        color: #fff;
        background: #000;
        border: 0 none;
        line-height: 1;
        border-radius: 10px;
        -webkit-border-radius: 10px;
      .is-recording
        position: relative;
        color: #03a9f4;
        display: -webkit-box;
        display: box;
        button
          display: -webkit-box;
          display: box;
          padding: 8px 0;
          font-size: 16px;
          line-height: 1;
          -webkit-box-flex: 1;
          box-flex: 1;
          text-align: center;
          box-align: center;
          -webkit-box-align: center;
          box-pack: center;
          -webkit-box-pack: center;
          background: #fff;
          border: 0 none;
          cursor: pointer;
        button+button
          border-left: 1px solid #aaa;
      .progress
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        em
          display: block;
          width: 0;
          height: 100%;
          background: #12b7f5;
</style>
