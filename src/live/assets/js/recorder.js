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
  link.href = url;
  link.download = "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" || 'output.wav';
  recIndex++;
  // 开始上传
  // 打开上传状态
  ctx.$store.commit('UPDATE_SENDING', true);
  ctx.$store.commit('UPDATE_SENDING_WIDTH', 0);
  uploadSound(blob, (err, data) => {
    ctx.$store.commit('UPDATE_SENDING', false);
    if(err)alert(err.ErrorInfo);
    console.log('上传成功!');
  }, (loadedSize, totalSize) => {
    let sendWidth = `${(loadedSize / totalSize) * 100}%`;
    ctx.$store.commit('UPDATE_SENDING_WIDTH', sendWidth);
  });
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


export const toggleRecording = function( self ) {
  //
  ctx = self;
  //
  if (self.active) {
    // stop recording
    self.active = false;
    self.$store.commit('UPDATE_RECORDING', false);
    audioRecorder.stop();
    audioRecorder.getBuffers( gotBuffers );
  } else {
    // start recording
    if (!audioRecorder)
      return;
    self.active = true;
    self.$store.commit('UPDATE_RECORDING', true);
    audioRecorder.clear();
    audioRecorder.record();
  }
}

export const initRecorder = function() {
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
