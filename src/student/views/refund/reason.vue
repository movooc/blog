<template>
  <section class="refund">
    <div class="refund-reason">
      <p>退款理由</p>
      <p>{{data.teacher}}拒绝了你<br>理由：{{reason}}</p>
    </div>
    <s-button v-if="isApply" :callBack="goToRefund" :text="text"></s-button>
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
        reason: '就是要拒绝',
        isApply: false,
        text: '申诉退款',
        data: {
          lesson_sn: '',
          mode: '',
          title: '',
          teacher: '',
          price: 0,
        }
      }
    },
    created() {
      let query = this.$route.query.params;
      this.isApply = query.isApply;
      // data
      this.data.lesson_sn = query.lesson_sn;
      this.data.mode = query.mode;
      this.data.title = query.title;
      this.data.teacher = query.teacher;
      this.data.price = query.price;
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
