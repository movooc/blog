<template>
  <div class="l-comment" v-if='isOwner || commentShow'>
    <div id="comment-body" class="comment-body">
      <div class="comment-title cursor" @click="hideComment" v-if="!isPC">
        讨论区
        <i class="iconfont icon-xiala"></i>
      </div>
      <div class="comment-title" v-if="isPC">
        讨论区
      </div>
      <div class="comment-content">
        <ul>
          <li>
            <div class="user-content">
              <div class="con-text" v-if="lessonInfo.step!='finish'">
                <a class="button" href="javascript:;" @click="pullHistory" v-if="canPullMsgs">点击拉取历史消息</a>
                <span v-if="!canPullMsgs">--暂无历史消息--</span>
              </div>
              <div class="con-text" v-if="lessonInfo.step=='finish'">
                <span>--课程已结束--</span>
              </div>
            </div>
          </li>
          <li v-for="comment in commentMessageInfo">
            <div class="user-img">
              <img :src="comment.avatar" alt="">
            </div>
            <div class="user-content">
              <div class="con-title" v-text="comment.nickname" :class="{'is-self':comment.isSelfSend}"></div>
              <!--<div class="con-time">{{comment.time}} <a href="javascrip:;" v-if="isOwner">操作</a></div>-->
              <div class="con-text" v-for="com in comment.content">
                <span v-for="co in com.custom" v-text="co.text"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { onBigGroupMsgNotify, jsonpCallback, onMsgNotify, pullHistoryGroupMsgs, exportInitData } from '@live/assets/js/webim_comment';
  import { onDestoryGroupNotify, onRevokeGroupNotify, onCustomGroupNotify, onGroupInfoChangeNotify, onKickedGroupNotify } from '@live/assets/js/webim_group_notice';
  import {mapState} from 'vuex';
  // spec
  var _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'') : '/api';
  var userUrl = `${_prefix}/user-profile.api?usn=`;

  export default
  {
    name: 'v-comment',
    components: {

    },
    data() {
      return {
        isPC,
        canPullMsgs: true,
      };
    },
    updated(){
      let vComment = document.getElementById('comment-body');
      if(!vComment)return;
      setTimeout(()=>{
        vComment.scrollTop = vComment.scrollHeight;
      },100);
    },
    computed: {
      ...mapState([
        'commentShow',
        'isOwner',
        'userInfo',
        'commentMessageInfo',
        'userAvatar',
        'lessonInfo',
      ])
    },
    mounted () {
      // 初始化webim数据
      let initData = this.userInfo || {};
      this.init(initData);
    },
    methods: {
      hideComment() {
        this.$store.commit('UPDATE_COMMETN_SHOW', false);
      },
      pullHistory() {
        var opt = {
          msgSeq: this.commentMessageInfo.length,
          reqMsgCount: 10
        };
        // 回调
        pullHistoryGroupMsgs(opt, (data) => {
          if(!data.length){
            return (this.canPullMsgs = false);
          }
          if(data.length < opt.reqMsgCount){
            this.canPullMsgs = false
          }
          let i=0;
          let length = data.length - 1;
          // 递归
          this.recursion(i, length, data);
        }, (err) => {
          console.log(err);
        });
      },
      init(data) {
        // 初始化数据
        let initData = {};
        //官方 demo appid,需要开发者自己修改（托管模式）
        initData.sdkAppID = data.sdkAppID || 1400026682;
        initData.accountType = data.accountType || 12098;
        initData.avChatRoomId = data.discuss || '58f45e003d331'; //默认房间群ID//
        //initData.avChatRoomId = '58f45e003d331'; //默认房间群ID//
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
          "onConnNotify": onConnNotify.prototype.constructor.bind(this), //选填
          //"jsonpCallback": jsonpCallback.prototype.constructor.bind(this), //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
          "onBigGroupMsgNotify": onBigGroupMsgNotify.prototype.constructor.bind(this), //监听新消息(大群)事件，必填
          "onMsgNotify": onMsgNotify.prototype.constructor.bind(this),//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
          "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
          //"onGroupInfoChangeNotify": onGroupInfoChangeNotify.prototype.constructor.bind(this),//监听群资料变化事件，选填
          "onKickedEventCall": onKickedGroupNotify.prototype.constructor.bind(this)
        };

        //其他对象，选填
        initData.options = {
          'isAccessFormalEnv': true,//是否访问正式环境，默认访问正式，选填
          'isLogOn': false//是否开启控制台打印日志,默认开启，选填
        };

        initData.curPlayAudio = null;//当前正在播放的audio对象
        initData.openEmotionFlag = false;//是否打开过表情

        // 初始化webim数据
        exportInitData(initData);
      },
      updateAvatar(account, avatar){
        //
        let opt = {};
        opt[account] = avatar;
        this.$store.commit('UPDATE_USER_AVATAR', opt);
      },
      recursion(i, length, msgList) {
        if(i > length){
          return
        }
        //
        let msg = msgList[i];
        //
        try{
          let avatar = this.userAvatar[msg.account];
          // 是否有头像
          if(avatar){
            msg.avatar = avatar;
            // 更新列表
            this.$store.commit('UPDATE_HISTORY_COMMENT_MESSAGE', msg);
            // 继续递归
            this.recursion(++i, length, msgList);
          }else{
            throw new Error('there is no avatar');
          }
        }catch(e){
          // 获取用户信息
          let url = `${userUrl}${msg.account}`;
          this.$http.get(url).then((json)=>{
            if(json.ok){
              //
              let data = json.body.data;
              msg.avatar = data.avatar;
              // 更新头像存储
              this.updateAvatar(msg.account, data.avatar);
              this.$store.commit('UPDATE_HISTORY_COMMENT_MESSAGE', msg);
              // 继续递归
              this.recursion(++i, length, msgList);
            }
          },(err)=>{});
        }
      },
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
