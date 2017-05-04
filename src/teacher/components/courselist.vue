<template>
  <div class="course-list">
    <ul>
      <li class="head">
        <span>创建时间</span>
        <span>标题</span>
        <span class="handle">操作</span>
      </li>
      <li v-for="list in lists">
        <span>{{list.tms_update}}</span>
        <span>{{list.title}}</span>
        <div class="handle">
          <a href="javascript:;" @click="enterLesson(list.sn)">进入课程</a>
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
      data() {
        return {}
      },
      methods: {
        enterLesson(lesson_sn) {
          // 进入课程
          this.$router.push({ name: 'detail', params: { lesson_sn: lesson_sn }})
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .course-list{
    margin: 0 auto;
    width: 980px;

    li {
      padding: 0 5px;
      display: -webkit-box;
      display: box;
      border-bottom: 1px solid #E3E3E3;
      line-height: 26px;

      &.head {
        background: #E3E3E3;
      }
      >*{
        display: -webkit-box;
        display: box;
        -webkit-box-flex: 1;
        box-flex: 1;
        width: 200px;
        justify-content: center;
        border-right: 1px solid #E3E3E3;

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
