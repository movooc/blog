<template>
  <section class="refund" v-if="event">
    <div class="refund-warn">
      <p>向讲师提交退款申请</p>
      <div class="refund-list">
        <ul>
          <li>&middot;&nbsp;&nbsp;提交退款申请后不能评价课程</li>
          <li>&middot;&nbsp;&nbsp;退款后不能收听课程</li>
          <li>&middot;&nbsp;&nbsp;退款后不能再次购买</li>
        </ul>
      </div>
    </div>
    <div class="refund-info">
      <dl>
        <dt>课程</dt>
        <dd v-text="data.title"></dd>
      </dl>
      <dl>
        <dt>讲师</dt>
        <dd v-text="data.teacher"></dd>
      </dl>
      <dl>
        <dt>金额</dt>
        <dd class="price">{{data.price?`&#65509;${data.price}`:'免费'}}</dd>
      </dl>
    </div>
    <div class="refund-reason">
      <p>向讲师申请退款</p>
      <div class="refund-info">
        <dl>
          <dt>处理结果</dt>
          <dd>拒绝退款申请</dd>
        </dl>
        <dl>
          <dt>处理意见</dt>
          <dd v-text="event.apply.remark"></dd>
        </dl>
      </div>
    </div>
    <div class="refund-reason" v-if="mode == 'appeal'">
      <p>向平台申诉退款</p>
      <div class="refund-info">
        <dl>
          <dt>处理结果</dt>
          <dd>拒绝退款申请</dd>
        </dl>
        <dl>
          <dt>处理意见</dt>
          <dd v-text="event.appeal.remark"></dd>
        </dl>
      </div>
    </div>
    <s-button v-if="mode == 'apply'" :callBack="goToRefund" :text="text"></s-button>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { trimStr } from '@lib/js/mUtils';
  import sButton from '@student/components/button';

  export default{
    name: 'reason',
    components: {
      sButton
    },
    computed: {
      ...mapGetters({

      })
    },
    data() {
      return {
        event: null,
        text: '申诉退款',
        mode: '',
        data: {
          lesson_sn: '',
          mode: '',
          title: '',
          teacher: '',
          price: 0,
          remark: '',
        }
      }
    },
    created() {
      let query = this.$route.query.params;
      //
      try{
        if(typeof(query) === 'string'){
          query = JSON.parse(query);
        }
        this.event = query.event;
        this.mode = query.cur_mode;
        // data
        this.data.lesson_sn = query.lesson_sn;
        this.data.mode = query.mode;
        this.data.title = query.title;
        this.data.teacher = query.teacher;
        this.data.price = query.price;
        this.text = '提交申诉';

      }catch(e){}
    },
    methods: {
      goToRefund() {
        this.$router.push({ name: 'refund', query: {params:this.data} });
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
