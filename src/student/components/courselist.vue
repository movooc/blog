<template>
  <div class="course-list">
    <ul class="lesson">
      <li v-for="list in lists">
        <a href="javascript:;" @click="enterLesson(list.sn)">
          <div class="list-title" v-text="list.title"></div>
          <div class="list-img" v-if="list.cover">
            <img v-lazy="`${list.cover}!cover`" />
            <!--<span class="list-status" v-if="list.step == 'opened'">
              {{`${list.plan.dtm_now}#${list.plan.dtm_start}` | moment}}
            </span>
            <span class="list-status" v-if="list.step == 'onlive'">
              直播中
            </span>-->
            <!--<span class="list-status">-->
              <!--<span v-if="list.step == 'submit'">未开放</span>-->
              <!--<span v-if="list.step == 'opened'">{{`${list.plan.dtm_now}#${list.plan.dtm_start}` | moment}}</span>-->
              <!--<span v-if="list.step == 'onlive'">直播中</span>-->
              <!--<span v-if="list.step == 'repose'">交流中</span>-->
              <!--<span v-if="list.step == 'finish'">已结束</span>-->
            <!--</span>-->
          </div>
          <div class="list-brief" v-html="textFormat(list.brief)">
          </div>
          <div class="list-content">
            <div class="l-name">
              <i class="iconfont icon-jiangshi"></i>
              {{list.teacher.name}}
            </div>
            <div>
              <i class="iconfont icon-xueyuan1"></i>
              {{list.participants}}
            </div>
            <div v-if="list.price">
              <i  class="iconfont icon-jiage1"></i>
              {{list.price}}
            </div>
            <div v-if="list.price == 0">
              免费
            </div>
            <div class="right">
              <span class="timer" v-if="list.step == 'opened'">
                {{`${list.plan.dtm_now}#${list.plan.dtm_start}` | moment}}
              </span>
              <span v-if="list.step == 'finish'">
                已结束
              </span>
              <span class="onlive" v-if="list.step == 'onlive'">
                授课中
              </span>
              <span class="onlive" v-if="list.step == 'repose'">
                交流中
              </span>
            </div>
          </div>
        </a>
        <!--<router-link :to="{ name: 'detail', params: { lesson_sn: list.sn }}">点击开始{{list.title}}</router-link>-->
      </li>
      <li class="last" v-if="showBottom">
        暂无更多课程，敬请期待
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default{
      name: 'course-list',
      props: {
        lists: {
          type: Array
        }
      },
      computed: {
        ...mapGetters({
          courseList: 'getCourseListInfo',
          showBottom: 'getShowBottom',
        })
      },
      data() {
        return {
          /*showBottom: false,*/
          studentShareHost: (process.env.NODE_ENV=='production'?process.env.STUDENT_HOST:'/student.html?'),
        }
      },
      updated() {
        this.inpectRepeat();
      },
      methods: {
        enterLesson(lesson_sn) {
          if (process.env.NODE_ENV=='production'){
            window.location.href = `${this.studentShareHost}share?lesson_sn=${lesson_sn}`;
          } else {
            this.$router.push({ name: 'detail', query: { lesson_sn: lesson_sn }});
          }
        },
        inpectRepeat() {
          this.$nextTick(() => {
            this.$store.commit('UPDATE_SHOW_BOTTOM', true);
          })
        },
        textFormat(value){
          return value.replace(/\n/g, '<br>');
        },
      },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .course-list{
    .lesson {
      margin: 0;
      padding: 0;
      padding-bottom: 200px;
      background: #F7F9FC;
      list-style-type: none;

      a{
        text-decoration: none;
      }
      li+li{
        margin-top: 15px;
      }
      li{
        position: relative;
        padding: 0 24px;
        //height: 182px;
        background: #fff;
        overflow: hidden;
        border-width: 1px 0 1px 0;
        border-color: #f2f4f7;
        border-style: solid;

        &:first-child {
          border-top-width: 0;
        }

        &.last {
          background: transparent;
          /*background-color:#f2f4f7;*/
          border: 0 none;
          text-align: center;
          color: #999;
          margin-top:60px;
        }

        a{
          display: block;
          height: 100%;
        }
        .list-title{
          padding: 33px 0 15px;
          color: #3C4A55;
          px2px(font-size, 36px);
        }
        .list-img{
          position: relative;
          padding-bottom: 16px;
          width: 100%;
          /*height: 300px;*/
          text-align: center;
          overflow: hidden;

          img{
            width: 100%;
            height: 300px;
            border-radius: 10px;
            -webkit-border-radius: 10px;
          }
          img[lazy=loaded] {
            width: 100%;
          }
          img[lazy=error] {
            display: none;
          }
        }
        .list-brief{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          max-height: 77px;
          color: #9ca7c1;
          overflow: hidden;
          text-overflow:ellipsis;
          px2px(font-size, 28px);
          px2px(line-height, 40px);
        }
        .list-content{
          padding: 26px 0;
          overflow: hidden;
          px2px(font-size, 26px);

          >*{
            float: left;
            padding-right: 15px;
            color: #9ca7c1;
            &.right {
              float: right;
            }
            .iconfont{
              px2px(font-size, 26px);
            }
          }
          .l-name {
            max-width: 200px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .onlive {
            color: #2dc17b;
          }
          .timer {
            color: #fb7070;
          }
          /*.price{
            float: left;
            color: #fb6666;
            clear: both;
          }
          .date{
            float: right;
            color: #AAA;
            .iconfont{
              px2px(font-size, 32px);
            }
          }*/
        }
        .list-status{
          position: absolute;
          padding: 10px;
          padding-left: 20px;
          color: #fb6666;
          background: #fff;
          z-index: 2;
          line-height: 1;
          -moz-box-shadow:3px 3px 19px #999999;
          -webkit-box-shadow:3px 3px 19px #999999;
          box-shadow:3px 3px 19px #999999;
          border-radius: 30px 0 0 30px;
          -webkit-border-radius: 30px 0 0 30px;
          px2px(top, 12px);
          px2px(right, 0);
          >span{
            position: relative;
            px2px(font-size, 28px);
          }
        }
      }
    }

  }
</style>
