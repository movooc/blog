<template>
  <div class="course-list">
    <ul>
      <li v-for="list in lists">
        <a href="javascript:;" @click="startLesson(list.sn)">点击开始{{list.title}}</a>
        <!--<router-link :to="{ name: 'detail', params: { lesson_sn: list.sn }}">点击开始{{list.title}}</router-link>-->
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
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
        ...mapGetters({
          courseList: 'getCourseListInfo',
        })
      },
      data() {
        return {
          link: liveHost
        }
      },
      methods: {
        startLesson(lesson_sn) {
          // 获得开课信息
          this.$store.dispatch('fetchOpenInfo', {lesson_sn}).then((data) => {
            let params = '?isOwner=yes';
            for(let d in data){
              params = `${params}&${d}=${data[d]}`;
            }
            //
            window.location.href = `${this.link}${params}`;
          }, (err) => {
            alert(err.message);
          });
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
