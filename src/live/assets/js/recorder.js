import { uploadSound } from '@live/assets/js/webim';
/*-----*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
  realAudioInput = null,
  inputPoint = null,
  audioRecorder = null,
  analyserNode = null,
  zeroGain = null,
  recIndex = 0,
  ctx = null;

// 定义录制时间
var startTimer = 0;
// 开始监测状态
var starting = false;

/* TODO:

 - offer mono option
 - "Monitor input" switch
 */
function gotBuffers( buffers ) {
  // the ONLY time gotBuffers is called is right after a new recording is completed -
  // so here's where we should set up the download.
  audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var link = document.getElementById("save");
  link.setAttribute('src', url);
  //link.href = url;
  //link.download = 'myRecording' + ((recIndex<10)?'0':'') + recIndex + '.wav' || 'output.wav';
  recIndex++;
  // 更新录音资源
  ctx.$store.commit('UPDATE_BLOB_RECORDING', blob);
  ctx = null;
  // 开始上传
  // 打开上传状态
  // ctx.$store.commit('UPDATE_SENDING', true);
  // ctx.$store.commit('UPDATE_SENDING_WIDTH', 0);
  // uploadSound(blob, (err, data) => {
  //   ctx.$store.commit('UPDATE_SENDING', false);
  //   if(err)alert(err.ErrorInfo);
  //   console.log('上传成功!');
  // }, (loadedSize, totalSize) => {
  //   let sendWidth = `${(loadedSize / totalSize) * 100}%`;
  //   ctx.$store.commit('UPDATE_SENDING_WIDTH', sendWidth);
  // });
}

function gotStream(stream) {
  inputPoint = audioContext.createGain();

  // Create an AudioNode from the stream.
  realAudioInput = audioContext.createMediaStreamSource(stream);
  audioInput = realAudioInput;
  audioInput.connect(inputPoint);

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  inputPoint.connect( analyserNode );

  let cfg=process.env.NODE_ENV=='production'?{workerPath:'assets/static/live/_static/live/js/recorderjs/recorderWorker.min.js'}:{};

  audioRecorder = new Recorder( inputPoint, cfg );

  zeroGain = audioContext.createGain();
  zeroGain.gain.value = 0.0;
  inputPoint.connect( zeroGain );
  zeroGain.connect( audioContext.destination );
}

function inspectRecording(self) {
  if(!starting)return;
  // 取消发送
  if(self.cancleRecord){
    // stop recording
    self.active = false;
    self.$store.commit('UPDATE_RECORDING', false);
    self.$store.commit('UPDATE_CANCLE_RECORD', false);
    // 更新录音资源
    self.$store.commit('UPDATE_BLOB_RECORDING', null);
    self = null;
    starting = false;
    return audioRecorder.stop();
  }
  let endTimer = new Date().getTime();
  let diff = (endTimer - startTimer)/60000;
  if(diff >= 2.73){
    // stop recording
    self.active = false;
    starting = false;
    audioRecorder.stop();
    return audioRecorder.getBuffers( gotBuffers );
  }
  // 重新监测
  setTimeout(()=>{
    inspectRecording(self);
  }, 1000);
}

export const toggleRecording = function( self ) {
  //
  if(!ctx)ctx = self;
  //
  if (ctx.active) {
    // stop recording
    ctx.active = false;
    audioRecorder.stop();
    // 结束监测
    starting = false;
    // 录制时间是否过短
    if(new Date().getTime() - startTimer < 3000){
      // 清空
      ctx.$store.commit('UPDATE_RECORDING', false);
      ctx = null;
      alert('录制时间过短!');
    }else{
      audioRecorder.getBuffers( gotBuffers );
    }
  } else {
    // start recording
    if (!audioRecorder)
      return;
    startTimer = new Date().getTime();
    ctx.active = true;
    ctx.$store.commit('UPDATE_RECORDING', true);
    audioRecorder.clear();
    audioRecorder.record();
    // 开始监测
    starting = true;
    inspectRecording(ctx);
  }
};

export const initRecorder = function() {
  if(webim.Tool.getQueryString('lesson_info'))return;
  if(webim.Tool.getQueryString('isOwner') == 'no')return;

  if (!navigator.getUserMedia)
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (!navigator.cancelAnimationFrame)
    navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
  if (!navigator.requestAnimationFrame)
    navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

  navigator.getUserMedia(
    {
      //'audio': true,
      "audio": {
        "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
        },
        "optional": []
      },
  }, gotStream, function(e) {
      console.log('您的浏览器暂时不支持录音!');
      console.log(e);
    });
};

window.addEventListener('load', initRecorder );
