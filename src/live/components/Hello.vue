<template>
  <div class="hello">
    <v-enter v-if="userInfo"></v-enter>
  </div>
</template>

<script>
  import vEnter from '@live/components/enter/index.vue';
  import {mapState} from 'vuex';

  export default {
    name: 'hello',
    components: {
      vEnter,
    },
    computed: {
      ...mapState([
        'userInfo',
      ])
    },
    data() {
      return {
        open: {
          isOwner: webim.Tool.getQueryString('isOwner'),
          teach: webim.Tool.getQueryString('teach'),
          discuss: webim.Tool.getQueryString('discuss'),
          userSig: '',
        }
      };
    },
    mounted() {
      const _prefix = process.env.NODE_ENV == 'production' ? process.env.LIVE_HOST : '/api/';

      let userUrl = `${_prefix.replace(/\/$/,'')}/user-profile.api`;
      let userSigUrl = `${_prefix.replace(/\/$/,'')}/live-tim-user_sig.api`;

      // 获得userSig
      this.$http.get(userSigUrl).then((json)=>{
        if(json.ok){
          this.open.userSig = json.body.data;
          // 获得user info
          this.$http.get(userUrl).then((json)=>{
            if(json.ok){
              let data = json.body.data;
              this.open.sn = data.sn;
              this.open.name = data.name;
              this.open.avatar = data.avatar;
              this.open.groupId = this.open.teach;
              this.open.discuss = this.open.discuss;
              this.$store.commit('UPDATE_AVATAR', this.open.avatar);
              this.$store.commit('UPDATE_USERINFO', this.open);
            }
          },(err)=>{
            console.log(err);
          });
        }
      },(err)=>{
        console.log(err);
      });
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello {
    height: 100%;
  }
</style>
