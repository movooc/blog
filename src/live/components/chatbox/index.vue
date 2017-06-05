<template>
  <div class="l-chatbox owner">
    <div class="box" v-if="lessonInfo.step!='finish'">
      <span class="box-more">
        <button @click="showModule">
          <span class="iconfont icon-list"></span>
        </button>
      </span>
      <div class="box-msg">
        <textarea v-model="msgVal" placeholder="请输入文字或粘贴图片..." @blur="v_blur" @paste="v_paste"></textarea>
        <v-recorder class="reorder" v-if="!isPC"></v-recorder>
      </div>
      <button class="box-send" @click="sendMsg">发送</button>
      <v-recorder class="reorder" v-if="isPC"></v-recorder>
      <div class="more-choice" v-if="moduleShow">
        <!--<a class="close" href="javascript:;" @click="moduleShow = !moduleShow">&times</a>-->
        <button @click="showImage">上传图片</button>
        <button @click="showFile">上传文件</button>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="modal-dialog" v-if="imgShow">
      <div class="modal-header">发送图片</div>
      <div class="modal-body">
        <div class="modal-img">
          <span>选择</span>
          <input id="upd_pic" type="file" @change="imgOnChange" />
          <p>
            <span>预览:</span>
            <a :href="imgInfo.src" target="_blank"><img v-if="imgInfo.show" v-bind:src="imgInfo.src" style="width:30%" /></a>
          </p>
          <p>
            <span>发送进度:</span>
            <span class="progress">
              <em v-bind:style="widthStyle"></em>
            </span>
          </p>
          <button class="upload" @click="startUploadImg" v-if="!startSend">开始发送</button>
          <button class="upload" @click="cancleUploadImg" v-if="!startSend">取消发送</button>
          <button class="upload" v-if="startSend">正在发送...</button>
        </div>
      </div>
    </div>
    <!-- 截图遮罩层 -->
    <div class="modal-dialog" v-if="pasteInfo.show">
      <div class="modal-header">截图的图片</div>
      <div class="modal-body">
        <div class="modal-img">
          <p>
            <span>预览:</span>
            <a :href="pasteInfo.src" target="_blank"><img v-bind:src="pasteInfo.src" style="width:30%" /></a>
          </p>
          <p>
            <span>发送进度:</span>
            <span class="progress">
              <em v-bind:style="widthStyle"></em>
            </span>
          </p>
          <button class="upload" @click="startUploadPaste" v-if="!startSend">开始发送</button>
          <button class="upload" @click="canclePasteImg" v-if="!startSend">取消发送</button>
          <button class="upload" v-if="startSend">正在发送...</button>
        </div>
      </div>
    </div>
    <div class="modal-dialog" v-if="fileShow">
      <div class="modal-header">发送文件</div>
      <div class="modal-body">
        <div class="">
          <span>选择</span>
          <input id="upd_file" type="file" @change="fileOnChange" />
          <p>
            <span>发送进度:</span>
            <span class="progress">
              <em v-bind:style="widthFileStyle"></em>
            </span>
          </p>
          <button class="upload" @click="startUploadFile" v-if="!startSend">开始发送</button>
          <button class="upload" @click="cancleUploadFile" v-if="!startSend">取消发送</button>
          <button class="upload" v-if="startSend">正在发送...</button>
        </div>
      </div>
    </div>
    <recording :show="isRecording"></recording>
    <sending :show="isSending" :width="width"></sending>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg, uploadImage, uploadFile } from '@live/assets/js/webim';
  import { checkPic, checkFile, checkPastePic } from '@lib/js/mUtils';
  import vRecorder from '@live/components/recorder/index.vue';
  import Recording from '@live/components/loading/recording.vue';
  import Sending from '@live/components/loading/sending.vue';

  export default
  {
    name: 'v-chatbox',
    components: {
      vRecorder,
      Recording,
      Sending
    },
    data() {
      return {
        msgVal: '',
        imgShow: false,
        fileShow: false,
        moduleShow: false,
        startSend: false,
        isPC: isPC,
        imgInfo: {
          src: '',
          show: false,
        },
        pasteInfo: {
          blob: null,
          show: false,
          src: '',
          filename: '',
        },
        widthStyle: {
          width: 0
        },
        widthFileStyle: {
          width: 0
        },
      };
    },
    computed: {
      ...mapState({
        lessonInfo: 'lessonInfo',
        isRecording: 'recording',
        isSending: 'sending',
        width: 'sendWidth'
      })
    },
    methods: {
      sendMsg() {
        vSendMsg(this.msgVal, (err, data) => {
          if(!err){
              this.msgVal = '';
          }
        });
      },
      v_blur() {
      },
      v_paste(event) {
        // 添加到事件对象中的访问系统剪贴板的接口
        let clipboardData = event.clipboardData,
            i = 0,
            items, item, types;
        // 是否有数据
        if( clipboardData ){
          items = clipboardData.items;
          if( !items ){
            return;
          }
          item = items[0];
          // 保存在剪贴板中的数据类型
          types = clipboardData.types || [];
          for( ; i < types.length; i++ ){
            if( types[i] === 'Files' ){
              item = items[i];
              break;
            }
          }
          // 判断是否为图片数据
          if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
            this.showPasteImage( item );
          }
        }
      },
      showPasteImage(item) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }
        let el = this;
        let blob = item.getAsFile();
        //先检查图片类型和大小
        if (!checkPastePic(blob, blob.size)) {
          return;
        }
        //预览图片
        let reader = new FileReader();
        reader.onload = (function () {
          return function (e) {
            el.pasteInfo.show = true;
            el.pasteInfo.src = this.result;
            el.pasteInfo.blob = blob;
            el.pasteInfo.filename = blob.name;
          };
        })();
        //预览图片
        reader.readAsDataURL(blob);
      },
      showImage() {
        this.imgShow = true;
      },
      showFile() {
        this.fileShow = true;
      },
      showModule() {
        this.moduleShow = !this.moduleShow;
      },
      imgOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFiles = event.target;
        var file = uploadFiles.files[0];
        var fileSize = file.size;
        var el = this;

        //先检查图片类型和大小
        if (!checkPic(uploadFiles, fileSize)) {
          return;
        }

        //预览图片
        var reader = new FileReader();
        reader.onload = (function (file) {
          return function (e) {
            el.imgInfo.show = true;
            el.imgInfo.src = this.result;
            el.imgInfo.filename = file.name;
          };
        })(file);
        //预览图片
        reader.readAsDataURL(file);
      },
      startUploadImg() {
        var uploadFiles = document.getElementById('upd_pic');
        var file = uploadFiles.files[0];
        // 开始上传
        this.startSend = true;
        //上传图片
        uploadImage(file, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.imgShow = false;
          this.moduleShow = false;
          this.widthStyle.width = 0;
          this.imgInfo.src = '';
          this.startSend = false;
        }, (loadedSize, totalSize) => {
          this.widthStyle.width = `${(loadedSize / totalSize) * 100}%`;
        });
      },
      cancleUploadImg() {
        this.imgShow = false;
        this.moduleShow = false;
        this.imgInfo.show = false;
        this.widthStyle.width = 0;
        this.imgInfo.src = '';
      },
      startUploadPaste() {
        if(!this.pasteInfo.blob){
          return;
        }
        // 开始上传
        this.startSend = true;
        //上传图片
        uploadImage(this.pasteInfo.blob, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.pasteInfo.blob = null;
          this.pasteInfo.show = false;
          this.pasteInfo.src = '';
          this.pasteInfo.filename = '';
          this.widthStyle.width = 0;
          this.startSend = false;
        }, (loadedSize, totalSize) => {
          this.widthStyle.width = `${(loadedSize / totalSize) * 100}%`;
        });
      },
      canclePasteImg() {
        this.pasteInfo.blob = null;
        this.pasteInfo.show = false;
        this.pasteInfo.src = '';
        this.pasteInfo.filename = '';
        this.widthStyle.width = 0;
      },
      fileOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFiles = event.target;
        var file = uploadFiles.files[0];
        var fileSize = file.size;

        //先检查文件类型和大小
        if (!checkFile(file, fileSize)) {
          return;
        }
      },
      startUploadFile() {
        var uploadFiles = document.getElementById('upd_file');
        var file = uploadFiles.files[0];

        if(!file){
          return alert('请选择文件!');
        }
        // 开始上传
        this.startSend = true;
        //上传文件
        uploadFile(file, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.fileShow = false;
          this.moduleShow = false;
          this.widthFileStyle.width = 0;
          this.startSend = false;
        }, (loadedSize, totalSize) => {
          this.widthFileStyle.width = `${(loadedSize / totalSize) * 100}%`;
        });
      },
      cancleUploadFile() {
        this.fileShow = false;
        this.moduleShow = false;
        this.widthFileStyle.width = 0;
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
