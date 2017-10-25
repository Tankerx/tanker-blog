<template>
  <div ref="editor" id="editor">

  </div>
</template>

<script>
  //  import '@/static/UE/ueditor.config'
  //  import '@/static/UE/ueditor.all’;
  //  import '@/static/UE/lang/zh-cn/zh-cn';
  export default {
    name: 'ue',
    data () {
      return {
        id: '123456ueditorId'
      }
    },
    props: {
      value: {
        type: String,
        default: null,
      },
      config: {
        type: Object,
        default: {}
      }
    },
    watch: {
      value: function value(val, oldVal) {
        const _this = this
        this.editor = UE.getEditor('editor', _this.config);
        if (val !== null) {
          this.editor.setContent(val);
        }
      }
    },
    beforeMount(){

    },
    mounted() {
      const _this = this
      this.$nextTick(() => {
//        this.$refs.editor.id = 'editor'
        this.editor = UE.getEditor('editor', _this.config);
        this.editor.ready(function() {
            console.log(456)
          this.editor.setContent(_this.value);
          this.editor.addListener("contentChange", function () {
            const wordCount = this.editor.getContentLength(true);
            const content = this.editor.getContent();
            const plainTxt = this.editor.getPlainTxt();
            this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
          }.bind(this));
          this.$emit('ready', this.editor);
        }.bind(this))
      })
    }
  }
</script>

<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
