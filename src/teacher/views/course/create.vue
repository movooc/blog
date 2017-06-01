<template>
  <section class="content-create">
    <div class="title clearfix">
      我的课程>课程编辑
      <span class="title-handle pull-right" @click="back">返回</span>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>标题</span>
      <div class="text">
        <input name="title" type="text" v-model="data.title" />
        <p class="limit">限20个字</p>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>开播时间</span>
      <div class="text">
        <c-calendar :defaultValue="data.dtm_start"></c-calendar>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>预计持续时长</span>
      <div class="text">
        <input name="duration" type="number" v-model="data.duration" />
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>价格</span>
      <div class="text">
        <input name="price" type="number" step="0.01" v-model="data.price" @blur="priceBlur" />&nbsp;&nbsp;元
        <p class="limit">请输入0-200之间的数，0表示免费</p>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>封面</span>
      <div class="text">
        <!--<input name="cover" type="file" @change="imgOnChange" />-->
        <!--<p class="img"><img :src="data.cover"></p>-->
        <!--<p class="limit">请上传尺寸为640*300，大小在100k以内的图片</p>-->
        <v-cropper v-if="canUseCrop" :callback="callbackCropper" :cover="data.cover"></v-cropper>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>课程介绍</span>
      <div class="text">
        <textarea name="intro" id="" cols="30" rows="10" v-model="data.brief"></textarea>
      </div>
    </div>
    <div class="protocol">
      <!--<input name="agree" type="checkbox" v-model="agree" />-->
      <!--我已阅读并同意《讲师须知》的内容-->
      <p>
        责任：本课程所发布内容与易课无关，仅代表个人观点。<br />
        禁止：禁止发布涉及政治、反动、色情等法律法规禁止的内容，禁止发布会引起版权纠纷的内容。<br />
        规则：课程开始前10分钟可以进入，点击课程结束后可选择开放讨论时间（讨论时间内学员与讲者均可以继续发布内容，但讲者不需要实时在线，讨论设置时间到，课程关闭，讲师也可选择主动关闭），也可直接结束课程。课程可以选择下架，下架后未购买的用户将无法付费，不能产生新的订单。
      </p>
    </div>
    <p class="button"><button @click="completeCreate">完成</button></p>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { checkPic } from '@lib/js/mUtils';
  import vCropper from '@teacher/components/cropper.vue';
  import cCalendar from '@teacher/views/course/calendar.vue';

  export default{
    name: 'create',
    components: {
      cCalendar,
      vCropper,
    },
    data() {
      return {
        //agree: false,
        cropper: null,
        croppable: false,
        panel: false,
        canUseCrop: false,
        data: {
          title: '',
          dtm_start: '',
          duration: '',
          cover: '',
          brief: '',
          price: '',
          lesson_sn: '',
        },
        callbackCropper: (url)=>{
          this.data.cover = url;
        }
      }
    },
    computed: {
      ...mapGetters({
        calendarInfo: 'getCalendar',
      })
    },
    created() {
      //获取路由参数
      let params = this.$route.params;
      this.data.lesson_sn = params.lesson_sn;
      if(this.data.lesson_sn){
        // 开始请求
        this.$store.dispatch('fetchCourseDetail', params).then((data)=>{
          //this.agree = true;
          this.canUseCrop = true;
          this.data.title = data.title || '';
          this.data.dtm_start = data.plan.dtm_start || '';
          this.data.duration = data.plan.duration || '';
          this.data.cover = data.cover || '';
          this.data.brief = data.brief || '';
          this.data.price = data.price;
          this.$store.commit('CHANGE_CALENDAR', {value: this.data.dtm_start});
        },()=>{
          console.log('fail');
        });
      }else{
          this.canUseCrop = true;
      }
    },
    methods: {
      imgOnChange(event) {
        if (!window.File || !window.FileList || !window.FileReader) {
          alert("您的浏览器不支持File Api");
          return;
        }

        var uploadFiles = event.target;
        var file = uploadFiles.files[0];
        var fileSize = file.size;
        var el = this;

        //先检查图片类型和大小
        if (!checkPic(uploadFiles, fileSize)) {
          return;
        }

        //预览图片
        var reader = new FileReader();
        reader.onload = (function (file) {
          return function (e) {
            el.cover = this.result;
            //el.imgInfo.filename = file.name;
          };
        })(file);
        //预览图片
        reader.readAsDataURL(file);
      },
      priceBlur() {
        this.data.price = this.data.price.match(/\d*(\.\d{0,2})?/)[0];
      },
      completeCreate() {
        if(!this.data.title)return alert('请填写标题！');
        //开播时间赋值
        this.data.dtm_start = this.calendarInfo.value;
        if(!this.data.dtm_start)return alert('请填写开播时间！');
        if(!this.data.duration)return alert('请填写持续时长！');
        if(this.data.price === '')return alert('请填写价格！');
        if(!this.data.cover)return alert('请选择封面！');
        if(!this.data.brief)return alert('请填写课程介绍！');
        //
        if(this.data.lesson_sn){
          if(!/^data:image/g.test(this.data.cover)){
            delete this.data['cover'];
          }
          this.$store.dispatch('fetchCourseModify', { ...this.data }).then((json) => {
            // 发起创建请求
            alert('修改成功!');
            this.$router.push({ name: 'list' });
          }, (err) => {
            alert(err.message);
          });

        }else{
          delete this.data['lesson_sn'];
          this.$store.dispatch('fetchCourseCreate', { ...this.data }).then((json) => {
            // 发起创建请求
            alert('创建成功!');
            this.$router.push({ name: 'list' });
          }, (err) => {
            alert(err.message);
          });
        }
      },
      back() {
        this.$router.push({ name: 'list' });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content-create
    padding: 20px;
    background: #fff;

    .button
      text-align: right;
      button
        padding: 8px 20px;
        color: #fff;
        border: 0 none;
        border-radius: 10px;
        background: #12b7f5;

    .img
      img
        width: 128px;
        height: 60px;

    .title
      padding-bottom: 15px;
      .title-handle
        color: #12b7f5;
        cursor: pointer;

    .control
      position: relative;
      padding-bottom: 10px;

      &:after
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      .word, .text
        float: left;
        em
          font-style: normal;
          color: #FB617F;
      .word
        padding-right: 20px;
        padding-top: 5px;
        width: 150px;
        font-size: 14px;
        text-align: right;
        color: #3C4A55;
      .text
        input
          padding: 5px;
          border: 1px solid #E6EAF2;
        p
          margin-bottom: 0;
        textarea
          width: 500px;
          border-color: #E6EAF2;
      .limit
        font-size: 12px;
        color: #aaa;


    .protocol
      padding: 0 167px;
      font-size: 12px;
      line-height: 1.5;
      color: #aaa;
      p
        margin: 0;
</style>
