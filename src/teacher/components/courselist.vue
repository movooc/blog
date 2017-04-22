<template>
  <div class="course-list">
    <ul>
      <li v-for="list in lists">
        <a :href="list.sn">点击开始{{list.title}}</a>
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
