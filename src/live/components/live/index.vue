<template>
  <!-- live start -->
  <div class="live-page" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <!-- live entity -->
    <div class="live-body" id="live-body">
      <!-- header -->
      <l-header></l-header>
      <!-- message entity -->
      <ul class="live-sms-list" id="live_sms_list">
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">{{ menuShow }}</div>
                <div class="sms-content">
                  <div class="content-text">
                    <audio autoplay="true" src="http://183.192.197.114/asn.com/stddownload_common_file?authkey=3043020101043c303a02010102010102040d08314a02037a1aff020472c5c0b7020472c5c0b702037a1dbb02043880337902044c803379020458f7911b020421ffa7150400&bid=10001&subbid=1400001692&fileid=304d0201000446304402010004013002037a1afd02041f16a3b4020458efa86c042531363136333837383132333131343330393638325fab8e6b4370dffcfcc1b5855bf948f1140201000201000400&filetype=2107&openid=@v_tls&ver=0&filename=4018834830"></audio>
                  </div>
                </div>
            </div>
        </li>
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content">
                  <div class="content-img">
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                    <a href=""><img src="~@live/assets/img/back-img2.png"></a>
                  </div>
                </div>
            </div>
        </li>
        <li>
          <div class="user-img">
            <img src="~@live/assets/img/user-img.png" width="45px">
          </div>
          <div class="live-sms">
            <div class="speaker-name">主讲人</div>
            <div class="sms-content w65per">
              <div class="content-audio" data-audio-src="">
                <span class="voice icon-dot1"></span>
                <span class="timer">53"</span>
              </div>
            </div>
          </div>
        </li>
        <li>
            <div class="user-img">
              <img src="~@live/assets/img/user-img.png" width="45px">
            </div>
            <div class="live-sms">
                <div class="speaker-name">主讲人</div>
                <div class="sms-content w65per">
                  <div class="content-audio" data-audio-src="">
                    <span class="voice icon-voice"></span>
                    <span class="timer">53"</span>
                  </div>
                </div>
            </div>
        </li>
        <li v-for="msg in messageInfo">
          <div class="user-img">
            <img src="~@live/assets/img/user-img.png" width="45px">
          </div>
          <div class="live-sms">
            <div class="speaker-name" v-text="msg.account"></div>
            <div class="sms-content" v-for="con in msg.content">
              <div class="content-text" v-text="con.text" v-if="con.type==msg.MSG_ELEMENT_TYPE.GROUP_TIP"></div>
              <div class="content-text" v-text="con.text" v-if="con.type==msg.MSG_ELEMENT_TYPE.TEXT"></div>
              <div class="content-text" v-if="con.type==msg.MSG_ELEMENT_TYPE.FILE">
                <a v-for="file in con.fileArr" :href="file.url" target="__blank">点击下载</a>
              </div>
              <div class="content-text" v-if="con.type==msg.MSG_ELEMENT_TYPE.CUSTOM">
                <div class="custom" v-for="cus in con.custom">
                  <div class="content-audio" :data-audio-src="cus.type" v-if="cus.type == 'SOUND'">
                    <!--<span class="voice icon-voice"></span>-->
                    <!--<span class="timer">53"</span>-->
                    <audio :id="cus.id" autoplay="true" v-bind:src="cus.src" controls></audio>
                  </div>
                </div>
              </div>
              <div class="content-img" v-if="con.type==msg.MSG_ELEMENT_TYPE.IMAGE">
                <a href="" v-for="img in con.imgArr"><img v-bind:src="img"></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- popular -->
      <v-popular></v-popular>
    </div>
    <!-- comment -->
    <v-comment></v-comment>
    <!-- chatbox -->
    <v-chatbox></v-chatbox>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import lHeader from './header.vue';
  import vPopular from './popular.vue';
  //import vAudio from './audio.vue';
  import { vBigGroupMsgNotify, jsonpCallback, onMsgNotify, exportSdkLogin } from '@live/assets/js/webim';
  import { onDestoryGroupNotify, onRevokeGroupNotify, onCustomGroupNotify, onGroupInfoChangeNotify } from '@live/assets/js/webim_group_notice';
  import vComment from '@live/components/comment/index.vue';
  import vChatbox from '@live/components/chatbox/index.vue';


  export default
  {
    name: 'v-live',
    components: {
      vComment,
      vPopular,
      lHeader,
      vChatbox,
      //vAudio,
    },
    data() {
      return {
        show: false,
        busy: false,
      };
    },
    computed: {
      ...mapState([
        'headerTitle', 'messageInfo', 'teacherInfo', 'menuShow'
      ])
    },
    updated() {
      setTimeout(()=>{
        var vScroll = document.getElementById('live-body');
        vScroll.scrollTop = vScroll.scrollHeight;
      });
    },
    created(){
      _init.prototype.constructor.call(this);
    },
    methods: {
      isShow() {
        //this.$store.commit('UPDATE_MENUSHOW');
      },
      loadMore() {
        this.busy = true;
      }
    }
  };


  function _init() {
    //帐号模式，0-表示独立模式，1-表示托管模式。
    window.accountMode=1;

    //官方 demo appid,需要开发者自己修改（托管模式）
    let sdkAppID = 1400001692;
    let accountType = 884;

    window.avChatRoomId = '@TGS#aJIPTVAEE'; //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)

    if (webim.Tool.getQueryString("groupid")) {
      avChatRoomId = webim.Tool.getQueryString("groupid");//用户自定义房间群id
    }

    window.selType = webim.SESSION_TYPE.GROUP;
    window.selSess = null;//当前聊天会话
    window.selToID = avChatRoomId;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）

    //默认群组头像(选填)
    window.selSessHeadUrl = 'img/2017.jpg';

    //当前用户身份
    window.loginInfo = {
      'sdkAppID': sdkAppID, //用户所属应用id,必填
      'appIDAt3rd': sdkAppID, //用户所属应用id，必填
      'accountType': accountType, //用户所属应用帐号类型，必填
      'identifier': null, //当前用户ID,必须是否字符串类型，选填
      'identifierNick': "null", //当前用户昵称，选填
      'userSig': null, //当前用户身份凭证，必须是字符串类型，选填
      'headurl': 'img/2016.gif'//当前用户默认头像，选填
    };

    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    //注意每个数字代表的含义，比如，
    //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
    let onGroupSystemNotifys = {
      //"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
      //"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
      //"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
      //"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
      "5": onDestoryGroupNotify, //群被解散(全员接收)
      //"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
      //"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
      //"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
      //"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
      //"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
      "11": onRevokeGroupNotify, //群已被回收(全员接收)
      "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
    };

    //监听连接状态回调变化事件
    let onConnNotify = function (resp) {
      switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
          //webim.Log.warn('连接状态正常...');
          break;
        case webim.CONNECTION_STATUS.OFF:
          webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
          break;
        default:
          webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
          break;
      }
    };

    //监听事件
    window.listeners = {
      "onConnNotify": onConnNotify, //选填
      "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
      "onBigGroupMsgNotify": vBigGroupMsgNotify.prototype.constructor.bind(this), //监听新消息(大群)事件，必填
      "onMsgNotify": onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
      "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
      "onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
    };

    let isAccessFormalEnv = true;//是否访问正式环境

    if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
      isAccessFormalEnv = false;//访问测试环境
    }

    //是否在浏览器控制台打印sdk日志
    let isLogOn = false;

    //其他对象，选填
    window.options = {
      'isAccessFormalEnv': isAccessFormalEnv,//是否访问正式环境，默认访问正式，选填
      'isLogOn': isLogOn//是否开启控制台打印日志,默认开启，选填
    };

    window.curPlayAudio = null;//当前正在播放的audio对象

    window.openEmotionFlag = false;//是否打开过表情

    if (accountMode == 1) {
      //托管模式
      //判断是否已经拿到临时身份凭证
      if (webim.Tool.getQueryString('tmpsig')) {
        if (loginInfo.identifier == null) {
          webim.Log.info('start fetchUserSig');
          //获取正式身份凭证，成功后会回调tlsGetUserSig(res)函数
          TLSHelper.fetchUserSig();
        }
      } else {
        //未登录,无登录态模式
        //sdk登录
        exportSdkLogin();
      }
    } else {
      //独立模式
      //sdk登录
      exportSdkLogin();
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
