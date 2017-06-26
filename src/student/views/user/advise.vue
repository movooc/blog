<template>
  <section class="advise">
    <div class="text">
      <textarea cols="30" rows="10" placeholder="请描述你遇到的问题或者对易课的建议" v-model="data.text" @blur="blurEvent"></textarea>
    </div>
    <div class="img clearfix">
      <div class="add-img cursor">
        <p>&#43;</p>
        <p>添加图片</p>
        <input type="file" @change="imgOnChange" />
        <img :src="data.image" />
      </div>
      <span class="pull-right words" v-text="words" :class="{'overflow':overflow}"></span>
    </div>
    <s-button :callBack="submitAdvise"></s-button>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { checkPic, trimStr } from '@lib/js/mUtils';
  import sButton from '@student/components/button';

  export default{
    components: {
      sButton,
    },
    name: 'advise',
    data() {
      return {
        data: {
          image: '',
          text: '',
        },
        words: 500,
        overflow: false,
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
            el.data.image = this.result;
            //el.imgInfo.filename = file.name;
          };
        })(file);
        //预览图片
        reader.readAsDataURL(file);
      },
      submitAdvise() {
        // 判断是否有填写建议
        let length = trimStr(this.data.text).length;
        if(!length){
          return alert('请描述你的问题!');
        }
        if(length > 500){
          return alert('字数超过限制!');
        }
        // 开始请求
        this.$store.dispatch('fetchAdvise', this.data).then(() => {
          alert('反馈成功!感谢你对易课的关注与支持，我们将认真对待你的建议与反馈。');
          this.$router.push({ name: 'user'});
        }, () => {
          alert('提交失败!');
        });
      },
      blurEvent() {
        let length = trimStr(this.data.text).length;
        if(length > 500){
          length = 500;
          this.overflow = true;
        }else{
          this.overflow = false;
        }
        this.words = 500 - length;
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";

  .advise
    .text
      padding: 40px;
      background: #fff;
      textarea
        width: 100%;
        height: 400px;
        border: 0 none;
        px2px(font-size, 32px);
    .img
      padding: 0 40px 40px;
      background: #fff;
      color: #9CA7C1;
      px2px(font-size, 32px);
      .add-img
        position: relative;
        display: inline-block;
        width: 160px;
        height: 160px;
        background: #EFEFF4;
        vertical-align: middle;
        p
          margin: 0;
          text-align: center;
          px2px(line-height, 26px);
          px2px(font-size, 26px);
          &:first-child
            padding: 40px 0 32px;
            px2px(font-size, 100px);
        input, img
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
        input
          z-index: 6;
          opacity: 0;
          px2px(font-size, 0);
        img
          height: 100%;
          z-index: 5;

      .words
        margin-top: 120px;
        &.overflow
          color: #f60;

</style>
