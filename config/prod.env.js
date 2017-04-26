var liveHost = process.env.LIVE_HOST ? process.env.LIVE_HOST : '/live.html';
var studentHost = process.env.STUDENT_HOST ? process.env.STUDENT_HOST : '/student.html';
var teacherHost = process.env.TEACHER_HOST ? process.env.TEACHER_HOST : '/teacher.html';

module.exports = {
  NODE_ENV: '"production"',
  LIVE_HOST: `"${liveHost}"`,
  STUDENT_HOST: `"${studentHost}"`,
  TEACHER_HOST: `"${teacherHost}"`
}
