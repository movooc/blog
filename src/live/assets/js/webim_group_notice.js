//监听 解散群 系统消息
export function onDestoryGroupNotify(notify) {
    webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
    var reportTypeCh = "[群被解散]";
    var content = "群主" + notify.Operator_Account + "已解散该群";
    showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
};
//监听 群被回收 系统消息
export function onRevokeGroupNotify(notify) {
  webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[群被回收]";
  var content = "该群已被回收";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
};
//监听 用户自定义 群系统消息
export function onCustomGroupNotify(notify) {
  webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[用户自定义系统消息]";
  var content = notify.UserDefinedField;//群自定义消息数据
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
};
//监听 被踢出群 群系统消息
export function onKickedGroupNotify(notify) {
  webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[用户自定义系统消息]";
  var content = "您已被踢出群";//群自定义消息数据
  console.log(content);
  //showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
};
//监听 群资料变化 群提示消息
export function onGroupInfoChangeNotify(groupInfo) {
  webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
  var groupId = groupInfo.GroupId;
  var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
  var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
  var newOwner = groupInfo.OwnerAccount;//新的群主id, 为空，则表示没有变化
  var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
  var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化

  if (newName) {
    //更新群组列表的群名称
    //To do
    webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
  }
};

//显示一条群组系统消息
function showGroupSystemMsg(type, typeCh, group_id, group_name, msg_content, msg_time) {
  var sysMsgStr = "收到一条群系统消息: type=" + type + ", typeCh=" + typeCh + ",群ID=" + group_id + ", 群名称=" + group_name + ", 内容=" + msg_content + ", 时间=" + webim.Tool.formatTimeStamp(msg_time);
  webim.Log.warn(sysMsgStr);
  console.log(sysMsgStr);
};
