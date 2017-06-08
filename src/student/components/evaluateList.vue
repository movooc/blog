<template>
  <ul class="evaluate-list">
    <li v-for="list in lists">
      <div class="e-textures clearfix">
        <div class="e-img pull-left">
          <img :src="list.user.avatar" />
        </div>
        <div class="e-text pull-left">
          <div v-text="list.user.name"></div>
          <div v-text="list.tms"></div>
        </div>
      </div>
      <p class="e-comment" v-text="list.remark"></p>
      <div class="e-star">
        <v-star :mode="2" :number="list.score"></v-star>
      </div>
    </li>
  </ul>
</template>

<script>
    import vStar from '@student/components/star.vue';

    export default{
      name: 'evaluate-list',
      components: {
        vStar
      },
      props: {
        lists: {
          type: Array
        }
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .evaluate-list
    padding: 31px;
    background: #fff;
    list-style-type: none;
    li
      position: relative;
      .e-textures
        background: #fff;
        .e-img
          margin-right: 10px;
          img
            width: 60px;
            height: 60px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
        .e-text
          :first-child
            color: #808388;
          :last-child
            padding-top: 6px;
            color: #CCD2DC;
            px2px(font-size, 26px);
      .e-comment
        px2px(line-height, 40px);
      .e-star
        position: absolute;
        right: 0;
        top: 0;
    li+li
      padding-top: 32px;
      border-top: 1px solid #E6EAF2;
</style>
