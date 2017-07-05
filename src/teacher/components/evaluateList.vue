<template>
  <ul class="evaluate-list">
    <li v-for="list in lists">
      <div class="e-textures clearfix">
        <div class="e-img pull-left">
          <img :src="list.user.avatar" />
        </div>
        <div class="e-text pull-left">
          <!--<div class="e-star">-->
            <!--<v-star :mode="2" :number="list.score"></v-star>-->
          <!--</div>-->
          <div class="text-name" v-text="list.user.name"></div>
          <v-star :mode="2" :number="list.score"></v-star>
          <p class="e-comment break-word" v-text="list.remark"></p>
          <div class="e-timer" v-text="list.tms"></div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
    import vStar from '@teacher/components/star.vue';

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
            width: 40px;
            height: 40px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
        .e-text
          :first-child
            color: #aaa;
            padding-bottom: 5px;
          :last-child
            padding-bottom: 20px;
            color: #CCD2DC;
            px2px(font-size, 26px);
      .e-comment
        width: 820px;
        line-height: 20px;
      .e-star
        position: absolute;
        right: 0;
        top: 0;
    li+li
      padding-top: 30px;
      border-top: 1px solid #e6eaf2;
</style>
