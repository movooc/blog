<template>
  <div class="course-list">
    <ul>
      <li v-for="list in lists">
        <router-link :to="{ name: 'detail', params: { lesson_sn: list.sn }}">点击开始{{list.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default{
      name: 'course-list',
      props: {
        lists: {
          type: Array
        }
      },
      methods: {
        startLesson() {

        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
