<template>
  <section class="share">
    <div class="share-title">分享</div>
    <div class="link-box">
      <p>
        <i class="iconfont icon-yuanhuan"></i>
        邀请链接
      </p>
      <div class="input">
        <input type="text" ref="copy" />
        <button @click="copyEvent">复制</button>
      </div>
    </div>
    <div class="share-box clearfix">
      <div class="l-wxcode pull-left">
        <p>
          <i class="iconfont icon-yuanhuan"></i>
          课程详情页二维码
        </p>
        <div class="code">
          <img :src="qrcode" alt="">
        </div>
      </div>
      <div class="r-wxcode pull-left">
        <p>
          <i class="iconfont icon-yuanhuan"></i>
          介绍图片
        </p>
        <div class="code">
          <img :src="card" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'share',
    computed: {
    },
    data(){
      return {
        card: '',
        qrcode: ''
      }
    },
    created() {
      let params = this.$route.params;
      // 获取已处理列表
      this.$store.dispatch('fetchShareInvite', params).then((data) => {
        this.card = data.card;
        this.qrcode = data.qrcode;
        console.log('success');
      }, () => {
        console.log('fail');
      });
    },
    methods: {
      copyEvent() {
        let input = this.$refs['copy'];
        input.select(); // 选取input元素的内容
        var succeeded;
        try {
          // 将选区内容复制到剪贴板
          succeeded = document.execCommand('copy');
        } catch (e) {
          succeeded = false;
        }
        if (succeeded) {
          alert('复制成功!');
        } else {
          alert('复制失败!');
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .share
    background: #fff;
    .share-title
      margin: 0 20px;
      padding: 15px 0;
      border-bottom: 1px solid #E6EAF2;
    .link-box
      padding: 30px 150px 48px;
      background: #fafafb;
      .input
        position: relative;
        padding: 6px 16px;
        border: 1px solid #E6EAF2;
        background: #fff;
        border-radius: 20px;
        -webkit-border-radius: 20px;
        input
          width: 100%;
          font-size: 16px;
          border: 0 none;
          outline: none;
        button
          position: absolute;
          right: 0;
          top: 0;
          padding: 7px 32px;
          color: #fff;
          background: #12B7F5;
          border: 0 none;
          border-radius: 18px;
          -webkit-border-radius: 18px;
          z-index: 1;
    .share-box
      padding: 20px 0;
    .l-wxcode, .r-wxcode
      width: 50%;
    .l-wxcode
      >*
        padding-left: 100px;
      img
        width: 200px;
        border: 1px solid #fafafb;
    .r-wxcode
      img
        width: 300px;
    .icon-yuanhuan
      color: #12B7F5;
</style>
