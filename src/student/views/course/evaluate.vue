<template>
  <section class="content-evaluate">
    <div class="eva-header" v-if="isShow">
      <div class="score" v-text="score"></div>
      <p>{{rated}}人评分</p>
    </div>
    <div class="eva-body">
      <evaluate-list :lists="evaList"></evaluate-list>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import evaluateList from '@student/components/evaluateList.vue';

  export default{
    name: 'evaluate',
    components: {
      evaluateList,
    },
    computed: {
      ...mapGetters({
        evaList:'getEvaluateList'
      })
    },
    data() {
      return {
        score: 0,
        rated: 0,
        isShow: false,
      }
    },
    created() {
      //获取路由参数
      let query = this.$route.query;
      // 获得评价总分
      this.$store.dispatch('fetchEvaluteTotal', {lesson_sn:query.lesson_sn}).then((data) => {
        //
        this.score = data.avg_score || 0;
        this.rated = data.rated_count || 0;
        this.isShow = true;
        console.log(data);
        console.log(this.score);
      }, (error) => {
        alert(error);
        console.log('fail');
      });
      // 获得评价列表
      this.$store.dispatch('fetchEvaluteList', {lesson_sn:query.lesson_sn}).then((data) => {
        //
        console.log('获取列表成功!');
      }, (error) => {
        alert(error);
        console.log('fail');
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .eva-header
    text-align: center;
    background: #fff;
    p
      margin: 0;
      padding: 15px 0 30px;
      color: #9CA7C1;
      px2px(font-size, 30px);
  .score
    padding: 32px 0 0;
    color: #FB6666;
    px2px(font-size, 56px);
</style>
