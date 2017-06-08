<template>
  <div class="course-list">
    <div class="my-lesson clearfix">
      <router-link to="/course/create">创建课程</router-link>
      我的课程
    </div>
    <ul>
      <li class="head">
        <span>开课时间</span>
        <span>标题</span>
        <span>收益</span>
        <span>状态</span>
        <span class="handle">操作</span>
      </li>
      <li v-for="list in lists">
        <span>{{list.plan.dtm_start}}</span>
        <a href="javascript:;" v-if="list.step != 'submit'" @click="enterLesson(list.sn)">{{list.title}}</a>
        <span v-if="list.step == 'submit'">{{list.title}}</span>
        <span class="price">&#65509;{{list.revenue}}</span>
        <span>
          <span v-if="list.step == 'submit'">审核中</span>
          <span v-if="list.step == 'denied'">审核不通过</span>
          <span v-if="list.step == 'closed'">已下架</span>
          <span v-if="list.step == 'opened'">开放中</span>
          <span v-if="list.step == 'onlive'">授课中</span>
          <span v-if="list.step == 'repose'">交流中</span>
          <span v-if="list.step == 'finish'">已结束</span>
        </span>
        <div class="handle">
          <a href="javascript:;" @click="editLesson(list.sn)" v-if="list.step != 'submit'">编辑</a>
          <span v-if="list.step == 'submit' || list.step == 'denied'">编辑</span>
        </div>
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
      },
      created() {
          this.$store.commit('CHANGE_IS_NOTICE', false);
      },
      data() {
        return {}
      },
      methods: {
        enterLesson(lesson_sn) {
          // 进入课程
          this.$router.push({ name: 'detail', params: { lesson_sn: lesson_sn }})
        },
        editLesson(lesson_sn) {
          // 进入课程
          this.$router.push({ name: 'edit', params: { lesson_sn: lesson_sn }})
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .course-list{
    .my-lesson {
      padding-bottom: 20px;
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
      padding: 0 5px;
      display: -webkit-box;
      display: box;
      border-bottom: 1px solid #E3E3E3;
      line-height: 26px;

      a {
        text-decoration: none;
        color: #12B7F5;
      }
      &.head {
        background: #E3E3E3;
      }
      &:nth-child(2n+3) {
        background: #F7F7F7;
      }
      .price {
        color: #fb617f;
      }
      >*{
        display: -webkit-box;
        display: box;
        -webkit-box-flex: 1;
        box-flex: 1;
        padding: 0 5px;
        width: 200px;
        justify-content: center;
        border-right: 1px solid #E3E3E3;
        word-break: break-all;

        &:last-child{
          border: 0 none;
        }
        &.handle{
          -webkit-box-flex: 3;
          box-flex: 3;
        }
      }
    }
  }
</style>
