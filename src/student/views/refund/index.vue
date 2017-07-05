<template>
  <section class="refund">
    <div class="refund-warn">
      <p v-if="mode =='freely'">无条件退款 </p>
      <p v-if="mode =='apply'">向讲师提交退款申请</p>
      <p v-if="mode =='appeal'">向平台提交退款申诉</p>
      <div class="refund-list">
        <ul>
          <li v-if="mode=='freely'">&middot;&nbsp;退款后不能评价课程</li>
          <li v-if="mode =='apply'">&middot;&nbsp;提交退款申请后不能评价课程</li>
          <li>&middot;&nbsp;退款成功后不能再次购买课程</li>
          <li>&middot;&nbsp;退款成功后不能继续观看课程</li>
        </ul>
      </div>
    </div>
    <div class="refund-info">
      <dl>
        <dt>课程</dt>
        <dd v-text="title"></dd>
      </dl>
      <dl v-if="mode=='freely'">
        <dt>讲师</dt>
        <dd v-text="teacher">{{teacher}}</dd>
      </dl>
      <dl>
        <dt>金额</dt>
        <dd class="price">{{price?`&#65509;${price}`:'免费'}}</dd>
      </dl>
      <dl v-if="mode == 'apply'">
        <dt>申请</dt>
        <dd>向&nbsp;{{teacher}}&nbsp;退款</dd>
      </dl>
      <dl v-if="mode == 'appeal'">
        <dt>申请</dt>
        <dd>向&nbsp;易课平台&nbsp;退款</dd>
      </dl>
    </div>
    <div class="refund-reason" v-if="mode != 'freely'">
      <p>退款理由</p>
      <div class="textarea">
        <textarea placeholder="请填写足够充分的退款理由" v-model="data.reason" @blur="blurEvent"></textarea>
        <p>{{words}}/1000</p>
      </div>
    </div>
    <s-button v-if="!refunding" :callBack="submitRefund" :text="text"></s-button>
    <s-button v-if="refunding" :text="refundingText"></s-button>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { trimStr } from '@lib/js/mUtils';
  import sButton from '@student/components/button';

  export default{
    name: 'refund',
    components: {
      sButton
    },
    computed: {
      ...mapGetters({

      })
    },
    data() {
      return {
        title: '',
        teacher: '',
        price: 0,
        words: 0,
        text: '',
        mode: '',
        refunding: false,
        refundingText: '退款中...',
        data: {
          lesson_sn: null,
          reason: '',
        }
      }
    },
    created() {
      let query = this.$route.query;
      try{
        if(typeof(query) === 'string'){
          query = JSON.parse(query);
        }
        this.data.lesson_sn = query.lesson_sn;
        // 判断来源
        if(query.origin == 'live'){
          //
          this.$store.dispatch('fetchCourseDetail', {lesson_sn:query.lesson_sn}).then((result) => {
            // 赋值
            this.mode = result.refund_mode;
            this.title = result.title;
            this.teacher = result.teacher.name;
            this.price = result.price;
            this.text = (this.mode == 'freely')?'申请退款':(this.mode == 'apply')? '提交申请' :'提交申诉';
          }, () => {
            console.log('fail');
          });
          // 返回
          return;
        }
        //
        this.mode = query.mode;
        this.title = query.title;
        this.teacher = query.teacher;
        this.price = query.price;
        this.text = (this.mode == 'freely')?'申请退款':(this.mode == 'apply')? '提交申请' :'提交申诉';

      }catch(e){}
    },
    methods: {
      submitRefund() {
        if(this.mode != 'freely' && !this.data.reason){
          return alert('请填写退款理由！');
        }
        // 确认退款
        if(!confirm('您确定要退款吗？'))return;
        //
        let body = {
          data: this.data,
          url: `lesson-refund-${this.mode}`,
        };
        this.refunding = true;
        // 开启退款状态
        this.$store.dispatch('fetchRefundCourse', body).then(() => {
          this.refunding = false;
          this.mode == 'freely' ? alert('退款成功!') : alert('退款申请提交成功!');
          this.$router.push({ name: 'enrolled' });
        }, (err) => {
          // 关闭退款状态
          this.refunding = false;
          alert('退款失败!');
        });
      },
      blurEvent() {
        let length = trimStr(this.data.reason).length;
        if(length > 1000){
          length = 1000;
        }
        this.words = length;
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
