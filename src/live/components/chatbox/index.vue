<template>
  <div class="l-chatbox">
    <span class="box-more">
      <button>
        <span class="iconfont icon-dot-more"></span>
      </button>
    </span>
    <div class="box-msg">
      <textarea v-model="msgVal" placeholder="请输入文字..." @blur="v_blur"></textarea>
      <span class="iconfont icon-hssiconsrecord"></span>
    </div>
    <button class="box-send" @click="sendMsg">提交</button>
    <ul class="more-choice">
      <li>
        <button @click="showModule">上传图片</button>
      </li>
    </ul>
    <!-- 遮罩层 -->
    <div class="modal-dialog" v-if="isShow">
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
  import { vSendMsg, sendPic } from '@live/assets/js/webim';

  export default
  {
    name: 'v-chatbox',
    components: {
    },
    data() {
      return {
        show: false,
        msgVal: '',
        isShow: false,
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
      showModule() {
        this.isShow = true;
      },
      fileOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFile = event.target;
        var file = uploadFile.files[0];
        var fileSize = file.size;

        //先检查图片类型和大小
        if (!checkPic(uploadFile, fileSize)) {
            return;
        }

        let el = this;
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

        //检查文件类型和大小
        function checkPic(obj, fileSize) {
            var picExts = 'jpg|jpeg|png|bmp|gif|webp';
            var photoExt = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase();//获得文件后缀名
            var pos = picExts.indexOf(photoExt);
            if (pos < 0) {
                alert("您选中的文件不是图片，请重新选择");
                return false;
            }
            fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
            if (fileSize > 30 * 1024) {
                alert("您选择的图片大小超过限制(最大为30M)，请重新选择");
                return false;
            }
            return true;
        }
      },
      startUploadFile() {
        //上传图片
        var self = this;
        var uploadFiles = document.getElementById('upd_pic');
        var file = uploadFiles.files[0];
        var businessType;//业务类型，1-发群图片，2-向好友发图片
        if (selType == webim.SESSION_TYPE.C2C) {//向好友发图片
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
        } else if (selType == webim.SESSION_TYPE.GROUP) {//发群图片
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
        }
        //封装上传图片请求
        var opt = {
            'file': file, //图片对象
            //'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
            //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
            'To_Account': selToID, //接收者
            'businessType': businessType//业务类型
        };

        //上传图片
        webim.uploadPic(opt,
            function (resp) {
                //上传成功发送图片
                sendPic(resp, file.name);
                self.isShow = false;
            },
            function (err) {
                alert(err.ErrorInfo);
            }
        );
      },
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
