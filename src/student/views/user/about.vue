<template>
  <section class="about">
    <dl>
      <p><span style="color: #3C4A55">&bull;</span>&nbsp;易灵微课</p>
      <dd>易灵微课是一个基于微信的在线学习平台，由曹政先生投资并创建的厦门易灵网络科技有限公司推出，旨在向用户提供稳定简洁的直播授课服务，为讲师与学员搭建氛围良好的学习课堂。</dd><p>&nbsp;&nbsp;</p>
    </dl>
    <dl>
      <p><span style="color: #3C4A55">&bull;</span>&nbsp;项目背景</p>
      <dd>在过去的一年里，知识付费市场迎来了前所未有的爆发性增长，因此，2016年也被称为“知识付费元年”。但是，市场的快速增长还依赖于各行业头部大V的全力推动，知识付费产品则更多侧重于影响力的变现。<br><p>&nbsp;&nbsp;</p>
面对知识付费的汹涌浪潮，我们对其有独特的认识，所以推出“易灵微课”，希望打造一个有所不同的平台。<br><p>&nbsp;&nbsp;</p>
我们不敢说自己的认识和判断是正确的，但我们会尝试做一些探索，为这个市场的规范和未来的健康发展，贡献一些经验，或者教训。不论成败，我们都会积极复盘，分享我们的心得和理念。</dd><p>&nbsp;&nbsp;</p>
    </dl>
    <dl>
      <p><span style="color: #3C4A55">&bull;</span>&nbsp;如何听课</p>
      <dd>
        点击公众号底部「课程列表」，即可发现精彩课程。<br><p>&nbsp;&nbsp;</p>
        点击公众号底部「个人中心」，进入页面「已报名课程」，即可查看已报名课程。<br><p>&nbsp;&nbsp;</p>
        已报名课程在讲师开课时会有公众号通知，点击通知详情然后进入课堂即可听课。</dd><p>&nbsp;&nbsp;</p>
    </dl>
    <dl>
      <p><span style="color: #3C4A55">&bull;</span>&nbsp;如何开课</p>
      <dd>易灵微课目前仍处于内测期，还没有开放讲师注册认证，有意向开课的讲师，可以发送个人介绍到 corp@yike.fm与我们联系。</dd><p>&nbsp;&nbsp;</p>
    </dl>
    <dl>
      <p><span style="color: #3C4A55">&bull;</span>&nbsp;建议反馈</p>
      <dd>此外，易灵微课欢迎各位的意见、建议与批评，您可以直接在易灵微课公众号对话窗口反馈，也可以在个人中心【建议与反馈】子页面进行反馈。</dd>
    </dl>
    <dl>
      <p>&nbsp;&nbsp;</p>
      <dd>&nbsp;&nbsp;</dd>
    </dl>
  </section>
</template>

<script>
  export default{
    name: 'about',
    components: {
    },
    mounted() {

    },
    methods: {
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .about
    line-height: 1.4;
    padding: 40px;
    px2px(font-size, 28px);
    background:#fff;
    dl
      margin: 0;
      padding: 10px 10px;
      &:after
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      dt,dd
        float: left;
      dt
        width: 180px;
        color: #12b7f5;
      dd
        color: #70788C;
        px2px(font-size, 32px);
        /*width: 480px;*/
      p
        /*padding: 5px 0;*/
        margin: 0;
        padding: 0;
        color: #3C4A55;
        text-align: left;
        margin-bottom 10px;
        outline: none;
        px2px(font-size, 36px);


</style>
