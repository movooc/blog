<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button @click="showModule">
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <div class="box-msg">
      <textarea v-model="msgVal" placeholder="请输入文字..." @blur="v_blur"></textarea>
      <v-audio class="reorder"></v-audio>
    </div>
    <button class="box-send" @click="sendMsg">提交</button>
    <ul class="more-choice" v-if="moduleShow">
      <li>
        <button @click="showImage">上传图片</button>
      </li>
    </ul>
    <!-- 遮罩层 -->
    <div class="modal-dialog" v-if="imgShow">
      <div class="modal-header">发送图片</div>
      <div class="modal-body">
        <div class="">
          <span>选择</span>
          <input id="upd_pic" type="file" @change="fileOnChange" />
          <img v-if="imgInfo.show" v-bind:src="imgInfo.src" style="width:30%" />
          <button class="upload" @click="startUploadFile">开始上传</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex';
  import { vSendMsg, uploadImage } from '@live/assets/js/webim';
  import { checkPic } from '@lib/js/mUtils';
  import vAudio from '@live/components/audio/index.vue';

  export default
  {
    name: 'v-chatbox',
    components: {
      vAudio
    },
    data() {
      return {
        msgVal: '',
        imgShow: false,
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
      showModule() {
        this.moduleShow = !this.moduleShow;
      },
      fileOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFile = event.target;
        var file = uploadFile.files[0];
        var fileSize = file.size;
        var el = this;

        //先检查图片类型和大小
        if (!checkPic(uploadFile, fileSize)) {
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
      startUploadFile() {
        var uploadFiles = document.getElementById('upd_pic');
        var file = uploadFiles.files[0];
        //上传图片
        uploadImage(file, (err, data) => {
          if(err)alert(err.ErrorInfo);
          this.imgShow = false;
          this.moduleShow = false;
        });
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
