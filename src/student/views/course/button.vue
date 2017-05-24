<template>
  <div class="button">
    <div class="enroll" v-if="!paying && courseDetail && (isEnroll == 'enroll' || isEnroll == 'access')">
      <button class="enter" @click="startLesson" v-if="courseDetail.step == 'onlive' || courseDetail.step == 'repose'">进入课堂</button>
      <button disabled v-if="courseDetail.step == 'opened'">未开课</button>
      <button disabled v-if="courseDetail.step == 'finish'">已结束</button>
    </div>
    <div class="enroll" v-if="!paying && isEnroll == 'browse'">
      <button class="free" v-if="courseDetail && courseDetail.price == 0 && !canEnter" @click="callWeiXinPay">免费报名</button>
      <button class="pay" v-if="courseDetail && courseDetail.price > 0 && !canEnter" @click="callWeiXinPay">付费报名</button>
      <button class="enter" v-if="canEnter && courseDetail && (courseDetail.step == 'onlive' || courseDetail.step == 'repose')" @click="startLesson">进入课堂</button>
      <button disabled v-if="canEnter && courseDetail && courseDetail.step == 'opened'">未开课</button>
    </div>
    <div class="enroll refund" v-if="!paying && isEnroll == 'refund'">
      <button disabled>已退款</button>
    </div>
    <div class="enroll" v-if="paying">
      <button class="enter">报名中...</button>
    </div>
  </div>
</template>

<script>
    export default{
      name: 'v-button',
      props: {
        isEnroll: {
          type: null
        },
        courseDetail: {
          type: null
        },
        liveHost: {
          type: String
        }
      },
      data() {
        return {
          paying: false,
          enrollData: null,
          canEnter: false,
          query: {},
        }
      },
      created(){
        //获取路由参数
        this.query = this.$route.query;
      },
      methods: {
        callWeiXinPay() {
          // 开启付款状态
          this.paying = true;
          // 课程报名
          this.lessonEnroll(this.query);
        },
        lessonEnroll(query) {
          // 课程报名
          // 已请求过
          if(this.enrollData && this.enrollData.order && this.enrollData.price>0){
            // 发起支付请求
            return this.callpay(this.enrollData.pay_data);
          }
          // 报名开始
          this.$store.dispatch('fetchLessonEnroll', query).then((data) => {
            // 数据
            this.enrollData = { ...data };
            // 是否需要付费
            if(data.price > 0){
              // 发起支付请求
              this.callpay(data.pay_data);
            }else{
              this.canEnter = true;
              this.paying = false;
              alert('报名成功！');
            }
          }, (err) => {
            this.paying = false;
            alert(err.message);
          });
        },
        lessonAccess() {
          // 是否有权限进入课堂
          let query = this.query;
          this.$store.dispatch('fetchLessonAccess', query).then((data) => {
            let params = `?isOwner=no&lesson_sn=${query.lesson_sn}`;
            for(let d in data){
              params = `${params}&${d}=${data[d]}`;
            };
            window.location.href = `${this.liveHost}${params}`;
          }, (err) => {
            alert(err.message);
          });
        },
        startLesson() {
          // 开始课程
          this.lessonAccess();
        },
        callpay(params) {
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
              document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
            }
          } else {
            this.jsApiCall(params);
          }
        },
        //调用微信JS api 支付
        jsApiCall(params) {
          var self = this;
          // 开始支付
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            params,
            function (res) {
              WeixinJSBridge.log(res.err_msg);
              //alert(JSON.stringify(res.err_msg));
              if (res.err_msg == 'get_brand_wcpay_request:ok') {
                // 关闭付款状态
                self.paying = false;
                // 开通直播通道
                self.canEnter = true;
                alert('报名成功！');
              }else {
                // 关闭付款状态
                self.paying = false;
              }
            }
          );
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@lib/css/index.styl';

  .button
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    background: #fff;
    z-index: 7;

    >*
      padding: 10px 30px;
      height: 80px;
    .enroll
      button
        width: 100%;
        height: 100%;
        color: #fff;
        background: #09BB07;
        border: 0 none;
        border-radius: 12px;
        -webkit-border-radius: 12px;
        px2px(font-size, 36px);
        &[disabled]
          background: #aaa;
</style>
