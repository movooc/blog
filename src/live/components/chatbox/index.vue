<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button @click="showModule">
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <div class="box-msg">
      <textarea v-model="msgVal" placeholder="请输入文字..." @blur="v_blur"></textarea>
      <v-recorder class="reorder"></v-recorder>
    </div>
    <button class="box-send" @click="sendMsg">提交</button>
    <div class="more-choice" v-if="moduleShow">
      <button @click="showImage">上传图片</button>
      <button @click="showFile">上传文件</button>
    </div>
    <!-- 遮罩层 -->
    <div class="modal-dialog" v-if="imgShow">
      <div class="modal-header">发送图片</div>
      <div class="modal-body">
        <div class="">
          <span>选择</span>
          <input id="upd_pic" type="file" @change="imgOnChange" />
          <img v-if="imgInfo.show" v-bind:src="imgInfo.src" style="width:30%" />
          <button class="upload" @click="startUploadImg">开始发送</button>
          <button class="upload" @click="cancleUploadImg">取消发送</button>
        </div>
      </div>
    </div>
    <div class="modal-dialog" v-if="fileShow">
      <div class="modal-header">发送文件</div>
      <div class="modal-body">
        <div class="">
          <span>选择</span>
          <input id="upd_file" type="file" @change="fileOnChange" />
          <button class="upload" @click="startUploadFile">开始发送</button>
          <button class="upload" @click="cancleUploadFile">取消发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg, uploadImage, uploadFile } from '@live/assets/js/webim';
  import { checkPic, checkFile } from '@lib/js/mUtils';
  import vRecorder from '@live/components/recorder/index.vue';

  export default
  {
    name: 'v-chatbox',
    components: {
      vRecorder
    },
    data() {
      return {
        msgVal: '',
        imgShow: false,
        fileShow: false,
        moduleShow: false,
        imgInfo: {
          show: false,
        }
      };
    },
    computed: {
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
        //上传图片
        uploadImage(file, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.imgShow = false;
          this.moduleShow = false;
        });
      },
      cancleUploadImg() {
        this.imgShow = false;
        this.moduleShow = false;
        this.imgInfo.show = false;
      },
      fileOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFiles = event.target;
        var file = uploadFiles.files[0];
        var fileSize = file.size;

        //先检查图片类型和大小
        if (!checkFile(file, fileSize)) {
          return;
        }
      },
      startUploadFile() {
        var uploadFiles = document.getElementById('upd_file');
        var file = uploadFiles.files[0];
        //上传文件
        uploadFile(file, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.fileShow = false;
          this.moduleShow = false;
        });
      },
      cancleUploadFile() {
        this.fileShow = false;
        this.moduleShow = false;
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
