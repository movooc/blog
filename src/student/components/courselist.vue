<template>
  <div class="course-list">
    <ul class="lesson">
      <li v-for="list in lists">
        <a href="javascript:;" @click="enterLesson(list.sn)">
          <div class="list-img">
            <img :src="list.cover" alt="">
          </div>
          <div class="list-content">
            <div class="tit">
              {{list.title}}
            </div>
            <p class="date">
              {{list.tms_update}}
            </p>
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
      padding: 29px;
      background: #fff;
      list-style-type: none;

      a{
        text-decoration: none;
      }
      li+li{
        border-top:1px solid #E6EAF2;
      }
      li{
        position: relative;
        padding-top: 29px;
        height: 182px;
        overflow: hidden;

        a{
          display: block;
          height: 100%;
        }
        .list-img{
          float: left;
          width: 281px;

          img{
            width: 100%;
          }
        }

        .list-content{
          float: left;
          padding-left: 20px;
          .tit{
            color: #444;
          }
          .date{
            margin: 0;
            padding-top: 13px;
            color: #AAA;
            px2px(font-size, 26px);
          }
        }
      }
    }

  }
</style>
