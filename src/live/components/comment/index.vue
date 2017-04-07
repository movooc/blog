<template>
  <div class="l-comment">
    <!-- discuss-pane -->
    <div class="live-discuss-pane">
      <!-- tool -->
      <div class="live-discuss-tool" id="live-discuss-tool">
        <a href="javascript:void(0);" class="live-discuss-sms" onclick="smsPicClick()"></a>
        <a href="javascript:void(0);" class="live-discuss-like" onclick="sendGroupLoveMsg()"></a>
      </div>
      <!-- discuss-form -->
      <div class="live-discuss-form" id="live-discuss-form">
        <input type="text" class="live-discuss-input" id="send_msg_text">
        <a href="javascript:void(0);" class="live-discuss-face" onclick="showEmotionDialog()"></a>
        <button class="live-discuss-button" onclick="onSendMsg()">发送</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';

  export default
  {
    name: 'v-comment',
    components: {

    },
    data() {
      return {
        show: false
      };
    },
    computed: {

    },
    methods: {

    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
