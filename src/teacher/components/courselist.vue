<template>
  <div class="course-list">
    <div class="my-lesson clearfix">
      <router-link to="/course/create">创建课程</router-link>
      课程列表
    </div>
    <ul>
      <li class="head">
        <span>课程名称</span>
        <span>课程状态</span>
        <span>课程评分</span>
        <span>报名人数</span>
        <span>课程收入</span>
        <span class="handle-btn">操作</span>
      </li>
      <li v-for="list in lists">
        <span>{{list.title}}</span>
        <span>
          <span class="gray" v-if="list.step == 'submit'">
            <i class="iconfont icon-dot"></i>
            审核中
          </span>
          <span class="red" v-if="list.step == 'denied'">
            <i class="iconfont icon-dot"></i>
            未通过
          </span>
          <span class="red" v-if="list.step == 'closed'">
            <i class="iconfont icon-dot"></i>
            已下架
          </span>
          <span class="yellow" v-if="list.step == 'opened'">
            <i class="iconfont icon-dot"></i>
            报名中
          </span>
          <span class="green" v-if="list.step == 'onlive'">
            <i class="iconfont icon-dot"></i>
            授课中
          </span>
          <span class="green" v-if="list.step == 'repose'">
            <i class="iconfont icon-dot"></i>
            交流中
          </span>
          <span class="blue" v-if="list.step == 'finish'">
            <i class="iconfont icon-dot"></i>
            已结束
          </span>
        </span>
        <!--<a href="javascript:;" v-if="list.step != 'submit'" @click="enterLesson(list.sn)">{{list.title}}</a>-->
        <!--<span v-if="list.step == 'submit'">{{list.title}}</span>-->
        <span>{{ list.stats | specKey('lesson.rate.avg') }}</span>
        <span>{{ list.stats | specKey('lesson.enroll.unique') }}</span>
        <span>&#65509;{{ list.stats | specKey('lesson.income.sum') }}</span>
        <div class="handle-btn">
          <a class="handle-item" href="javascript:;" title="进入直播" @click="openLesson(list.sn)" v-if="list.step != 'submit'"><i class="iconfont icon-zhengzaishouke"></i></a>
          <span v-if="list.step == 'submit'"><i class="iconfont icon-zhengzaishouke submit"></i></span>
          &nbsp;
          <a class="handle-item" href="javascript:;" title="编辑课程" @click="editLesson(list.sn)" v-if="list.step != 'submit'"><i class="iconfont icon-htmal5icon16"></i></a>
          <span v-if="list.step == 'submit'"><i class="iconfont icon-htmal5icon16 submit"></i></span>
          &nbsp;
          <a class="handle-item" href="javascript:;" title="分享课程" @click="shareLesson(list.sn)" v-if="list.step != 'submit'"><i class="iconfont icon-share"></i></a>
          <span v-if="list.step == 'submit'"><i class="iconfont icon-share submit"></i></span>
          &nbsp;
          <a class="handle-item" href="javascript:;" title="进入详情" @click="enterLesson(list.sn)" v-if="list.step != 'submit'"><i class="iconfont icon-xiangqing"></i></a>
          <span v-if="list.step == 'submit'"><i class="iconfont icon-xiangqing submit"></i></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import swal from 'sweetalert';
    // 获得config
    let liveHost = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST.replace(/\/$/,'/live') : '/live.html';

    export default{
      name: 'course-list',
      props: {
        lists: {
          type: Array
        }
      },
      computed: {
      },
      created() {
        this.$store.commit('CHANGE_IS_NOTICE', false);
      },
      data() {
        return {};
      },
      methods: {
        openLesson(lesson_sn) {
          // 开始课程
          // 获得开课信息
          this.$store.dispatch('fetchOpenInfo', {lesson_sn:lesson_sn}).then((data) => {
            let params = `?isOwner=yes&lesson_sn=${lesson_sn}&teacherEnter=yes`;
            for(let d in data){
              params = `${params}&${d}=${data[d]}`;
            };
            //this.lessons = params;
            // 开始进入课堂
            window.location.href = `${liveHost}${params}`;
          }, (err) => {
            /*alert(err.message);*/
            swal({
              title: '错误提醒',
              text: err.message,
              confirmButtonText: "知道了"
            });
          });
        },
        enterLesson(lesson_sn) {
          // 进入详情
          this.$router.push({ name: 'detail', params: { lesson_sn: lesson_sn, page: 1 }});
        },
        editLesson(lesson_sn) {
          // 编辑课程
          this.$router.push({ name: 'edit', params: { lesson_sn: lesson_sn }});
        },
        shareLesson(lesson_sn) {
          // 分享课程
          this.$router.push({ name: 'share', params: {lesson_sn:lesson_sn} });
        },
      },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .course-list{
    .my-lesson {
      padding-bottom: 10px;
      a {
        float: right;
        padding: 5px 10px;
        color: #fff;
        background: #fb617f;
        border-radius: 15px;
        text-decoration: none;
      }
    }

    ul {
      margin: 0;
      padding: 0;
    }
    li {
      padding: 18px 15px;
      display: -webkit-box;
      display: box;
      border-bottom: 1px solid #E3E3E3;
      line-height: 26px;
      -webkit-box-align: center;
      box-align: center;
      &:hover {
        background: #FAFAFB;
      }

      a {
        text-decoration: none;
        color: #12B7F5;
      }
      /*&:nth-child(2n+3) {
        background: #F7F7F7;
      }*/
      .price {
        color: #fb617f;
      }
      >*{
        display: -webkit-box;
        display: box;
        -webkit-box-flex: 1;
        box-flex: 1;
        width: 150px;
        color: #757F98;
        justify-content: center;
        word-break: break-all;
        font-size: 14px;

        &:first-child{
          -webkit-box-pack: initial;
          -ms-flex-pack: initial;
        }
        &:last-child{
          border: 0 none;
        }
        &.handle-btn{
          -webkit-box-flex: 4;
          box-flex: 4;

          a, span {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #EFEFF4;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            .iconfont {
              position: absolute;
              font-size: 14px;
              color: #757F98;
              &.icon-zhengzaishouke {
                top: 4px;
                left: 6px;
              }
              &.icon-htmal5icon16 {
                top: 3px;
                left: 8px;
              }
              &.icon-share {
                top: 3px;
                left: 7px;
              }
              &.icon-xiangqing {
                top: 3px;
                left: 7px;
              }
            }
            .submit {
              color: #d7d9e2;
            }
            &.handle-item:hover {
              background: #12B7F5;
              .iconfont {
                color: #fff;
              }
            }
          }
        }
      }
      &.head {
        padding: 10px 15px;
        border-top: 1px solid #E3E3E3;
        border-bottom: 0 none;
        >*{
          color: #3C4A55;
          font-size: 16px;
        }
      }
      .gray {
        .iconfont {
          color: #d7d9e2;
        }
      }
      .yellow {
        .iconfont {
          color: #ffbd16;
        }
      }
      .green {
        .iconfont {
          color: #34ab46;
        }
      }
      .blue {
        .iconfont {
          color: #12b7f5;
        }
      }
      .red {
        .iconfont {
          color: #fb617f;
        }
      }
    }
  }
</style>
