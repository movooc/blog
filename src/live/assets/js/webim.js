import { trimStr } from '@lib/js/mUtils';

// @发送消息
export const vSendMsg = (str) => {
  return new Promise((resolve, reject) => {
    let value = trimStr(str);
    // 调用webim base接口
    if(value)onSendMsg(value, function (err, msg) {
      if(err){
        reject(err, null);
      }else{
        showMsg(msg)
        resolve(err, msg);
      }
    });
  });
};

// @显示消息（群普通+点赞+提示+红包）
// const showMsg = (msg) => {
//   return new Promise((resolve, reject) => {
//
//   });
// };

function showMsg(msg) {
  var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
  var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;
debugger
  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    fromAccount = '';
  }
  fromAccountNick = msg.getFromAccountNick();
  if (!fromAccountNick) {
    fromAccountNick = '未知用户';
  }
  ul = document.getElementById("video_sms_list");
  var maxDisplayMsgCount = 4;
  //var opacityStep=(1.0/4).toFixed(2);
  var opacityStep = 0.2;
  var opacity;
  var childrenLiList = $("#video_sms_list").children();
  if (childrenLiList.length == maxDisplayMsgCount) {
    $("#video_sms_list").children(":first").remove();
    for (var i = 0; i < maxDisplayMsgCount; i++) {
      opacity = opacityStep * (i + 1) + 0.2;
      $('#video_sms_list').children().eq(i).css("opacity", opacity);
    }
  }
  li = document.createElement("li");
  paneDiv = document.createElement("div");
  paneDiv.setAttribute('class', 'video-sms-pane');
  textDiv = document.createElement("div");
  textDiv.setAttribute('class', 'video-sms-text');
  nickNameSpan = document.createElement("span");

  var colorList = ['red', 'green', 'blue', 'org'];
  var index = Math.round(fromAccount.length % colorList.length);
  var color = colorList[index];
  nickNameSpan.setAttribute('class', 'user-name-' + color);
  nickNameSpan.innerHTML = webim.Tool.formatText2Html(""+fromAccountNick + "");
  contentSpan = document.createElement("span");

  //解析消息
  //获取会话类型，目前只支持群聊
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();
  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  subType = msg.getSubType();

  isSelfSend = msg.getIsSend();//消息是否为自己发的

  switch (subType) {

    case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
      contentSpan.innerHTML = convertMsgtoHtml(msg);
      break;
    case webim.GROUP_MSG_SUB_TYPE.REDPACKET://群红包消息
      contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
      break;
    case webim.GROUP_MSG_SUB_TYPE.LOVEMSG://群点赞消息
      //业务自己可以增加逻辑，比如展示点赞动画效果
      contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
      //展示点赞动画
      showLoveMsgAnimation();
      break;
    case webim.GROUP_MSG_SUB_TYPE.TIP://群提示消息
      contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
      break;
  }
  // textDiv.appendChild(nickNameSpan);
  // textDiv.appendChild(contentSpan);
  //
  // paneDiv.appendChild(textDiv);
  // li.appendChild(paneDiv);
  // ul.appendChild(li);
}
