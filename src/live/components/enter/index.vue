<template>
  <!-- 直播入口 -->
  <div class="l-enter">
    <div class="l-teacher" v-if="isOwner">
      <p class="title">课程介绍:</p>
      <v-live></v-live>
    </div>
    <div class="l-student" v-if="!isOwner">
      <v-live></v-live>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { vBigGroupMsgNotify, jsonpCallback, onMsgNotify, exportSdkLogin, exportInitData, exportGroupMemberInfo } from '@live/assets/js/webim';
  import { onDestoryGroupNotify, onRevokeGroupNotify, onCustomGroupNotify, onGroupInfoChangeNotify, onKickedGroupNotify } from '@live/assets/js/webim_group_notice';
  import vLive from '@live/components/live/index.vue';
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-enter',
    data() {
      return {}
    },
    components: {
      vLive,
    },
    computed: {
      ...mapState([
        'isOwner',
        'userInfo',
      ])
    },
    created() {
    },
    mounted() {
      // 初始化webim数据
      let initData = this.userInfo || {};
      _init.prototype.constructor.call(this, initData);
      // sdk登录
      exportSdkLogin((err, data) => {
        if(err)return alert(err.ErrorInfo);
        // 调用群成员接口
        let opt = {
          'Offset': 0,
          'MemberRoleFilter':[  //群成员身份过滤器
            'Owner'
          ],
          'MemberInfoFilter': [
              'Role'
          ]
        };
        this.$store.commit('UPDATE_ISOWNER', initData.isOwner == 'yes');
        this.$store.commit('UPDATE_LOADING', false);
        // 获取群主信息
//        exportGroupMemberInfo(opt).then((data) => {
//          // 加载成功
//          this.$store.commit('UPDATE_LOADING', false);
//          //
//          if(data.ActionStatus == 'OK' && data.MemberList.length){
//            for(let m of data.MemberList){
//              if(m.Member_Account == 'admin'){
//                this.$store.commit('UPDATE_ISOWNER', true);
//                break;
//              }
//            }
//          }
//        }, () => {
//            alert('查找失败!');
//        });
      });
    },
    methods: {
    },
  };

  function _init(data) {
    //帐号模式，0-表示独立模式，1-表示托管模式。
    let accountMode=0;
    let initData = {};

    //官方 demo appid,需要开发者自己修改（托管模式）
    initData.sdkAppID = data.sdkAppID || 1400026682;
    initData.accountType = data.accountType || 12098;

    initData.avChatRoomId = data.groupId || '58f45e003d331'; //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)

    //    if (webim.Tool.getQueryString("groupid")) {
    //      avChatRoomId = webim.Tool.getQueryString("groupid");//用户自定义房间群id
    //    }

    initData.selType = webim.SESSION_TYPE.GROUP;
    initData.selSess = null;//当前聊天会话
    initData.selToID = initData.avChatRoomId;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）

    //默认群组头像(选填)
    initData.selSessHeadUrl = 'img/2017.jpg';

    //当前用户身份
    initData.loginInfo = {
      'sdkAppID': initData.sdkAppID, //用户所属应用id,必填
      'appIDAt3rd': initData.sdkAppID, //用户所属应用id，必填
      'accountType': initData.accountType, //用户所属应用帐号类型，必填
      'identifier': data.sn, //当前用户ID,必须是否字符串类型，选填
      'identifierNick': data.name, //当前用户昵称，选填
      'userSig': data.userSig, //当前用户身份凭证，必须是字符串类型，选填
      'headurl': data.avatar || 'img/2017.jpg'//当前用户默认头像，选填
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
    initData.listeners = {
      "onConnNotify": onConnNotify, //选填
      "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
      "onBigGroupMsgNotify": vBigGroupMsgNotify.prototype.constructor.bind(this), //监听新消息(大群)事件，必填
      "onMsgNotify": onMsgNotify.prototype.constructor.bind(this),//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
      "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
      "onGroupInfoChangeNotify": onGroupInfoChangeNotify,//监听群资料变化事件，选填
      "onKickedEventCall": onKickedGroupNotify
    };

    //是否访问正式环境
    let isAccessFormalEnv = true;

    //是否在浏览器控制台打印sdk日志
    let isLogOn = false;

    //其他对象，选填
    initData.options = {
      'isAccessFormalEnv': isAccessFormalEnv,//是否访问正式环境，默认访问正式，选填
      'isLogOn': isLogOn//是否开启控制台打印日志,默认开启，选填
    };

    initData.curPlayAudio = null;//当前正在播放的audio对象

    initData.openEmotionFlag = false;//是否打开过表情

    // 初始化webim数据
    exportInitData(initData);
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
