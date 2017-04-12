import { trimStr } from '@lib/js/mUtils';

//监听大群新消息（普通，点赞，提示，红包）
export const vBigGroupMsgNotify = function(msgList) {
  for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
    var msg = msgList[i];
    webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
    // 组装消息
    this.$store.commit('UPDATE_MESSAGE', assembleMsg(msg));
  }
};

// @发送消息
export const vSendMsg = (str, callback) => {
  let value = trimStr(str);
  // 调用webim base接口
  if (value) {
    sendMsgCallBack(value, function (err, msg) {
      //
      callback(err, msg);
    })
  }
};

// 发送并接收消息
function sendMsgCallBack (msgtosend, callback) {
  // return new Promise(() => {
    // 未登录
    if (!loginInfo.identifier) {
      if (accountMode == 1) {//托管模式
        //将account_type保存到cookie中,有效期是1天
        webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
        //调用tls登录服务
        tlsLogin();
      } else {//独立模式
        alert('请填写帐号和票据');
      }
      return callback('请先登录!');
    }

    // 是否成功进入房间
    if (!selToID) {
      return callback('您还没有进入房间，暂不能聊天!');
    }
    //获取消息内容
    var msgtosend = msgtosend;
    var msgLen = webim.Tool.getStrBytes(msgtosend);

    if (msgtosend.length < 1) {
      return callback('发送的消息不能为空!');
    }

    var maxLen, errInfo;
    if (selType == webim.SESSION_TYPE.GROUP) {
      maxLen = webim.MSG_MAX_LENGTH.GROUP;
      errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    } else {
      maxLen = webim.MSG_MAX_LENGTH.C2C;
      errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    }
    if (msgLen > maxLen) {
      return callback(errInfo);
    }

    if (!selSess) {
      selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true;//是否为自己发送
    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    var subType;//消息子类型
    if (selType == webim.SESSION_TYPE.GROUP) {
      //群消息子类型如下：
      //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
      //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
      //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
      //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
      subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

    } else {
      //C2C消息子类型如下：
      //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
      subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    }

    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);

    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    if (!emotions || emotions.length < 1) {
      text_obj = new webim.Msg.Elem.Text(msgtosend);
      msg.addText(text_obj);
    }

    webim.sendMsg(msg, function (resp) {
      if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
        // showMsg(msg);
      }
      webim.Log.info('发消息成功');
      callback(null, assembleMsg(msg));
    }, function (err) {
      webim.Log.error('发消息失败:' + err.ErrorInfo);
      callback(err.ErrorInfo);
    });
  // });
};

// 封装消息
function assembleMsg(msg) {
    let assemble = {
      nickname: '',
      account: '',
    };

    // assign
    assemble.account = msg.getFromAccount() || '';
    assemble.nickname = msg.getFromAccountNick() || '未知用户';

    //解析消息
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    assemble.sessType = msg.getSession().type();
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    assemble.subType = msg.getSubType();
    assemble.isSelfSend = msg.getIsSend();//消息是否为自己发的
    // 封装消息
    switch (assemble.subType) {
      //群普通消息
      case webim.GROUP_MSG_SUB_TYPE.COMMON:
        assemble.content = convertMsg(msg);
        break;
      //群红包消息
      case webim.GROUP_MSG_SUB_TYPE.REDPACKET:
        assemble.content = `[群红包消息] ${convertMsg(msg)}`;
        break;
      //群点赞消息
      case webim.GROUP_MSG_SUB_TYPE.LOVEMSG:
        //业务自己可以增加逻辑，比如展示点赞动画效果
        assemble.content = `[群点赞消息] ${convertMsg(msg)}`;
        //展示点赞动画
        showLoveMsgAnimation();
        break;
      //群提示消息
      case webim.GROUP_MSG_SUB_TYPE.TIP:
        assemble.content = `[群提示消息] ${convertMsg(msg)}`;
        break;
    }

  return assemble;
}

// 获取消息内容
function convertMsg(msg) {
  var contents = "", elems, elem, type, content;

  elems = msg.getElems();//获取消息包含的元素数组

  for (var i in elems) {
    elem = elems[i];
    type = elem.getType();//获取元素类型

    content = elem.getContent();//获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT:
        contents += convertTextMsg(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FACE:
        contents += convertFaceMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        contents += convertImageMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.SOUND:
        contents += convertSoundMsg(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FILE:
        contents += convertFileMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.LOCATION://暂不支持地理位置
        //html += convertLocationMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.CUSTOM:
        contents += convertCustomMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
        contents += convertGroupTipMsgToHtml(content);
        break;
      default:
        webim.Log.error('未知消息元素类型: elemType=' + type);
        break;
    }
  }
  // 返回
  return contents;
};

//解析文本消息元素
function convertTextMsg(content) {
  return content.getText();
};

//解析语音消息元素
function convertSoundMsg(content) {
  var second = content.getSecond();//获取语音时长
  var downUrl = content.getDownUrl();
  if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
    return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
  }
  return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
};

//切换播放audio对象
function onChangePlayAudio(obj) {
  if (curPlayAudio) {//如果正在播放语音
    if (curPlayAudio != obj) {//要播放的语音跟当前播放的语音不一样
      curPlayAudio.currentTime = 0;
      curPlayAudio.pause();
      curPlayAudio = obj;
    }
  } else {
    curPlayAudio = obj;//记录当前播放的语音
  }
};
