<template>
  <div class="enroll-list">
    <ul class="lesson">
      <li v-for="list in lists">
        <a href="javascript:;" class="item" @click="enterDetail(list.lesson.sn)">
          <div class="list-img">
            <img :src="`${list.lesson.cover}!cover`" />
          </div>
          <div class="list-content">
            <div class="list-title" v-text="list.lesson.title"></div>
            <div class="appointment">
              <i class="iconfont icon-people"></i>
              {{list.lesson.participants}}
            </div>
            <div class="list-status clearfix">
              <!--<span class="pull-right" v-if="list.event == 'enroll'">已报名</span>-->
              <!--<span class="pull-right" v-if="list.event == 'browse'">未报名</span>-->
              <!--<span class="pull-right" v-if="list.event == 'access'">听课中</span>-->
              <!--<span class="pull-right" v-if="list.event == 'cancel'">已退出</span>-->
              <span class="pull-right l-red" v-if="list.event == 'refund'">已退款</span>
              <!--<span v-if="list.lesson.step == 'submit'">未开放</span>-->
              <span v-if="list.lesson.step == 'opened'" class="opened">{{`${list.lesson.plan.dtm_now}#${list.lesson.plan.dtm_start}` | moment}}</span>
              <span class="l-red" v-if="list.lesson.step == 'onlive'">授课中</span>
              <span class="l-red" v-if="list.lesson.step == 'repose'">授课中</span>
              <!--<span v-if="list.lesson.step == 'finish'">已结束</span>-->
            </div>
          </div>
        </a>
        <div class="list-handler clearfix" v-if="list.refund_mode == 'appeal'">
          <button class="pull-right blue">评价</button>
          <button class="pull-right" @click="refund(list.lesson.sn)">退款</button>
        </div>
      </li>
      <li class="no-enroll" v-if="!lists.length">
        <p>快去课程列表选择优质课程报名吧</p>
        <router-link to="/course">现在就去</router-link>
      </li>
    </ul>
    <loading :show="refunding"></loading>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Loading from '@student/components/loading';

    export default{
      name: 'enroll-list',
      components: {
        Loading
      },
      props: {
        lists: {
          type: Array
        }
      },
      computed: {
        ...mapGetters({

        })
      },
      data() {
        return {
          refunding: false,
        }
      },
      methods: {
        enterDetail(lesson_sn) {
          this.$router.push({ name: 'detail', query: { lesson_sn: lesson_sn }})
        },
        refund(lesson_sn) {
          let body = {
            lesson_sn,
          };
          // 开启退款状态
          this.refunding = true;
          this.$store.dispatch('fetchRefundCourse', body).then(() => {
            // 关闭退款状态
            this.refunding = false;
            // 重新获取列表
            this.$store.dispatch('fetchEnrollList').then(() => {
              console.log('success');
            }, () => {
              console.log('fail');
            });
          }, (err) => {
            // 关闭退款状态
            this.refunding = false;
            alert('退款失败!');
          });
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .enroll-list{
    .l-red {
      color: #FB6666;
    }

    .lesson {
      margin: 0;
      padding: 0;
      padding-bottom: 200px;
      list-style-type: none;

      a{
        display: block;
        text-decoration: none;
      }
      li+li{
        margin-top: 15px;
      }
      li{
        position: relative;
        padding: 38px 24px 0;
        background: #fff;
        overflow: hidden;
        border-width: 1px 0 1px 0;
        border-color: #E6EAF2;
        border-style: solid;

        &:first-child {
          border-top-width: 0;
        }

        &.no-enroll {
          text-align: center;
          p, a {
            px2px(font-size, 32px);
          }
          a {
            display: inline-block;
            margin-bottom: 50px;
            padding: 10px;
            color: #00a551;
            border: 1px solid #00a551;
            border-radius: 10px;
            -webkit-border-radius: 10px;
          }
        }

        a{
          display: block;
        }
        .item {
          display: -webkit-box;
          display: box;
          padding-bottom: 29px;

          >* {
            display: -webkit-box;
            display: box;
            -webkit-box-orient: vertical;
            box-orient: vertical;
          }
        }
        .item+div {
          border-top: 1px solid #E6EAF2;
        }
        .list-title{
          padding: 0 0 15px;
          width: 400px;
          color: #3C4A55;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow: hidden;
          px2px(font-size, 34px);
        }
        .list-img{
          position: relative;
          margin-right: 18px;
          width: 280px;
          height: 180px;
          border-radius: 15px;
          -webkit-border-radius: 15px;
          overflow: hidden;

          img{
            display: block;
            width: 100%;
            height: 180px;
          }
        }
        .list-content{
          px2px(font-size, 30px);

          .appointment{
            px2px(font-size, 26px);
            color: #AAA;
            .iconfont {
              px2px(font-size, 26px);
            }
          }
        }
        .list-status{
          padding-top: 65px;
          width: 400px;
          >span{
            color: #3C4A55;
            &.opened, &.l-red {
              color: #fb6666;
            }
          }
        }
        .list-handler{
          padding: 19px 0;
          button{
            margin-left: 19px;
            padding: 10px 45px;
            background: transparent;
            border: 1px solid #aaa;
            border-radius: 60px;
            -webkit-border-radius: 60px;
            px2px(font-size, 30px);
            &.blue {
              color: #12B7F5;
              border-color: #12B7F5;
            }
          }
        }
      }
    }

  }
</style>
