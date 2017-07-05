<template>
  <section class="content-evaluate">
    <div class="eva-header" v-if="isShow">
      <div class="score" v-text="score"></div>
      <p>{{rated}}人评分</p>
    </div>
    <div class="eva-body" v-if="evaList.length">
      <scroller :on-infinite="infinite" noDataText="没有更多评价" ref="my_scroller">
        <evaluate-list :lists="evaList"></evaluate-list>
      </scroller>
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
        //evaList:'getEvaluateList'
      })
    },
    data() {
      return {
        score: 0,
        rated: 0,
        isShow: false,
        evaList: [],
      };
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
      }, (error) => {
        alert(error);
        console.log('fail');
      });
      // 获得评价列表
      this.infinite();
    },
    methods: {
      fetchEva(cursor, done) {
        let query = {
          lesson_sn: this.$route.query.lesson_sn,
          cursor: cursor,
          limit: 2,
        };
        // 获得评价列表
        this.$store.dispatch('fetchEvaluteList', query).then((data) => {
          //
          this.evaList = [...this.evaList, ...data];
          //
          if (done) {
            if (data.length < query.limit) {
              done(true);
            } else {
              setTimeout(()=>{
                done();
              }, 1000);
            };
          };
          console.log('获取列表成功!');
        }, (error) => {
          done(true);
          alert(error);
          console.log('fail');
        });
      },
      infinite(done) {
        // 开始
        let length = this.evaList.length;
        // 是否有游标和长度
        if (!length){
          return this.fetchEva(null, done);
        }
        try{
          this.fetchEva(this.evaList[length - 1].cursor, done);
        }catch(e){};
      },
    },
  };
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
  .eva-body
    position: relative;
    height: 600px;
    .no-data-text
      &.active
        top: -24px !important;
        px2px(font-size, 32px);
  ._v-container>._v-content>.loading-layer
    height: 250px !important;
  .score
    padding: 32px 0 0;
    color: #FB6666;
    px2px(font-size, 56px);
</style>
