<template>
  <div class="enroll-list">
    <ul class="lesson">
      <li v-for="list in lists">
        <a href="javascript:;" class="item" @click="enterDetail(list.sn)">
          <div class="list-img">
            <img :src="list.lesson.cover" />
          </div>
          <div class="list-content">
            <div class="list-title" v-text="list.lesson.title"></div>
            <div class="appointment">
              xxx人预约
            </div>
            <div class="list-status clearfix">
              <span class="pull-right opened" v-if="list.event == 'enroll'">未报名</span>
              <span v-if="list.lesson.step == 'submit'">未开放</span>
              <span v-if="list.lesson.step == 'opened'" class="opened">开放中</span>
              <span v-if="list.lesson.step == 'onlive'">直播中</span>
              <span v-if="list.lesson.step == 'repose'">交流中</span>
              <span v-if="list.lesson.step == 'finish'">已结束</span>
            </div>
          </div>
        </a>
        <div class="clearfix">
          <button class="pull-right">评价</button>
          <button class="pull-right">退款</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default{
      name: 'enroll-list',
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
        return {}
      },
      methods: {
        enterDetail(lesson_sn) {
          this.$router.push({ name: 'detail', query: { lesson_sn: lesson_sn }})
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .enroll-list{
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
        padding: 38px 24px;
        //height: 182px;
        background: #fff;
        overflow: hidden;

        a{
          display: block;
        }
        .item {
          display: -webkit-box;
          display: box;

          >* {
            display: -webkit-box;
            display: box;
            -webkit-box-orient: vertical;
            box-orient: vertical;
          }
        }
        .list-title{
          padding: 0 0 15px;
          color: #3C4A55;
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
          }
        }
        .list-status{
          padding-top: 65px;
          width: 380px;
          >span{
            &.opened {
              color: #fb6666;
            }
          }
        }
      }
    }

  }
</style>
