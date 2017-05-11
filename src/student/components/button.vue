<template>
  <div class="button">
    <div class="enroll" v-if="!paying && typeof(isEnroll) == Object">
      <button class="enter" v-if="enrollData">进入课堂</button>
    </div>
    <div class="enroll" v-if="!paying && isEnroll == 'no'">
      <button class="free" v-if="enrollData && enrollData.price == 0">免费报名</button>
      <button class="pay" v-if="enrollData && enrollData.price > 0" @click="callWeiXinPay">付费报名</button>
    </div>
    <div class="enroll" v-if="paying">
      <button class="enter">付款中...</button>
    </div>
  </div>
</template>

<script>
    export default{
      name: 'v-button',
      props: {
        enrollData: {
          type: Object
        },
        isEnroll: {
          type: null
        },
        courseDetail: {
          type: null
        },
      },
      data() {
        return {
          paying: false,
        }
      },
      methods: {
        callWeiXinPay() {
          // 获取订单信息
          // 开启付款状态
          this.paying = true;
          let _body = {
            order_sn: this.enrollData.order,
            body: {
                title: this.courseDetail.title
            }
          };
          //
          this.$store.dispatch('fetchOrderConfirm', _body).then((data) => {
            // 发起支付请求
            this.callpay(data);
          }, (err) => {
            this.paying = false;
            alert(err.message);
          });
        },
        lessonAccess() {
          // 是否有权限进入课堂
          this.$store.dispatch('fetchLessonAccess', query).then((data) => {
            let params = `?isOwner=no&lesson_sn=${query.lesson_sn}`;
            for(let d in data){
              params = `${params}&${d}=${data[d]}`;
            };
            this.lessons = params;
          }, (err) => {
            alert(err.message);
          });
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
              // 关闭付款状态
              self.paying = false;
              WeixinJSBridge.log(res.err_msg);
              if (res.err_msg == "get_brand_wcpay_request:ok" || res.err_msg == "get_brand_wcpay_request:cancel") {
                alert(res.err_msg);
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
</style>
