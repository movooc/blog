<template>
  <div class="live-page" @click="isShow">
    <!-- live start -->
    <div class="live-pane">
      <!-- popularity -->
      <div class="live-popular">
        <div class="live-info">
          <div class="user-info-text">
            <div class="user-info-num">
              <i class="user-icon-fans"></i><span id="user-icon-fans">0</span>
              <i class="user-icon-like"></i><span id="user-icon-like">0</span>
            </div>
          </div>
        </div>
      </div>
      <a href="javascript:void(0);" class="live-close" onclick="quitBigGroup()"></a>
    </div>
    <!-- live entity -->
    <div class="live-body">
        <div class="live-discuss">
          <!-- message entity -->
          <ul class="live-sms-list" id="live_sms_list">
            <li>
                <div class="live-sms-pane pull-left">
                  <div class="user-img">
                    <img src="~@live/assets/img/user-img.png" width="45px">
                  </div>
                </div>
                <div class="live-sms-pane pull-left">
                    <div class="user-info-name">主讲人</div>
                    <div class="live-sms-text">
                      <span class="user-name-green" >毛利晴</span>有品位
                    </div>
                </div>
            </li>
          </ul>
      </div>
    </div>
    <!-- comment -->
    <v-comment></v-comment>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import vComment from '@live/components/comment/index.vue';
  import '@live/assets/js/live/jquery-2.1.4.min.js';
  import '@live/assets/js/sdk/webim.js';
  import '@live/assets/js/sdk/json2.js';
  import  {smsPicClick} from '@live/assets/js/live/demo_base.js';
  import '@live/assets/js/live/demo_group_notice.js';

  export default
  {
    name: 'v-live',
    components: {
      vComment,
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
    },
    methods: {
      isShow() {
        this.$store.commit('UPDATE_MENUSHOW');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
