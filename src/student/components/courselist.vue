<template>
  <div class="course-list">
    <ul class="lesson">
      <li v-for="list in lists">
        <a href="javascript:;" @click="enterLesson(list.sn)">
          <div class="list-title" v-text="list.title"></div>
          <div class="list-img">
            <img :src="list.cover" alt="">
            <span class="list-status">
              <span>直播中</span>
            </span>
          </div>
          <div class="list-content">
            <div class="price">
              &#65509;{{list.price}}
            </div>
            <div class="date">
              {{list.tms_update}}
            </div>
          </div>
        </a>
        <!--<router-link :to="{ name: 'detail', params: { lesson_sn: list.sn }}">点击开始{{list.title}}</router-link>-->
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
        })
      },
      data() {
        return {}
      },
      methods: {
        enterLesson(lesson_sn) {
          this.$router.push({ name: 'detail', params: { lesson_sn: lesson_sn }})
        }
      }
    }
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

        a{
          display: block;
          height: 100%;
        }
        .list-title{
          padding: 33px 0 15px;
          color: #3C4A55;
          px2px(font-size, 34px);
        }
        .list-img{
          position: relative;
          width: 100%;
          border-radius: 15px;
          -webkit-border-radius: 15px;
          overflow: hidden;

          img{
            width: 100%;
            max-height: 300px;
          }
        }
        .list-content{
          padding: 26px 0;
          overflow: hidden;
          px2px(font-size, 30px);

          .price{
            float: left;
            color: #fb6666;
            clear: both;
          }
          .date{
            float: right;
            color: #AAA;
          }
        }
        .list-status{
          position: absolute;
          width: 108px;
          height: 50px;
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
            position: absolute;
            width: 100%;
            height: 100%;
            px2px(font-size, 28px);
            px2px(top, 12px);
            px2px(left, 18px);
          }
        }
      }
    }

  }
</style>
