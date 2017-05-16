<template>
  <section class="content-create">
    <div class="title clearfix">
      我的课程>课程编辑
      <span class="title-handle pull-right" @click="back">返回</span>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>标题</span>
      <div class="text">
        <input name="title" type="text" v-model="title" />
        <p class="limit">限20个字</p>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>开播时间</span>
      <div class="text">
        <c-calendar></c-calendar>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>预计持续时长</span>
      <div class="text">
        <input name="duration" type="number" v-model="duration" />
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>价格</span>
      <div class="text">
        <input name="price" type="number" step="0.01" v-model="price" @blur="priceBlur" />&nbsp;&nbsp;元
        <p class="limit">请输入0-200之间的数，0表示免费</p>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>封面</span>
      <div class="text">
        <input name="cover" type="file" @change="imgOnChange" />
        <p class="img" v-if="cover"><img :src="cover"></p>
        <p class="limit">请上传尺寸为640*300，大小在100k以内的图片</p>
      </div>
    </div>
    <div class="control">
      <span class="word"><em>*&nbsp;</em>课程介绍</span>
      <div class="text">
        <textarea name="intro" id="" cols="30" rows="10" v-model="brief"></textarea>
      </div>
    </div>
    <div class="protocol">
      <input name="agree" type="checkbox" v-model="agree" />
      我已阅读并同意《讲师须知》的内容
    </div>
    <p class="button"><button @click="completeCreate">完成</button></p>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { checkPic } from '@lib/js/mUtils';
  import cCalendar from '@teacher/views/course/calendar.vue';

  export default{
    name: 'create',
    components: {
      cCalendar,
    },
    data() {
      return {
        agree: false,
        title: '',
        dtm_start: '',
        duration: '',
        cover: '',
        brief: '',
        price: '',
      }
    },
    computed: {
      ...mapGetters({
        calendarInfo: 'getCalendar',
      })
    },
    created() {
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
        this.price = this.price.match(/\d*(\.\d{0,2})?/)[0];
      },
      completeCreate() {
        if(!this.title)return alert('请填写标题！');
        //开播时间赋值
        this.dtm_start = this.calendarInfo.value;
        if(!this.dtm_start)return alert('请填写开播时间！');
        if(!this.duration)return alert('请填写持续时长！');
        if(!this.price)return alert('请填写价格！');
        if(!this.cover)return alert('请选择封面！');
        if(!this.brief)return alert('请填写课程介绍！');
        if(!this.agree)return alert('请同意协议内容！');
        this.$store.dispatch('fetchCourseCreate', { ...this._data }).then((json) => {
          // 发起创建请求
          alert('创建成功!');
          this.$router.push({ name: 'list' });
        }, (err) => {
          this.paying = false;
          alert(err.message);
        });
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

</style>
