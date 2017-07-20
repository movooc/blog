var liveHost = process.env.LIVE_HOST ? process.env.LIVE_HOST : '/live.html';
var studentHost = process.env.STUDENT_HOST ? process.env.STUDENT_HOST : '/student.html';
var teacherHost = process.env.TEACHER_HOST ? process.env.TEACHER_HOST : '/teacher.html';
var sdkAppid = process.env.SDK_APPID ? process.env.SDK_APPID : 1400026682;

module.exports = {
  NODE_ENV: '"production"',
  LIVE_HOST: `"${liveHost}"`,
  STUDENT_HOST: `"${studentHost}"`,
  TEACHER_HOST: `"${teacherHost}"`,
  SDK_APPID: `"${sdkAppid}"`,
}
