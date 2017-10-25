<template>
  <div style="margin-top: 30px;">
    <!--<script id="editor" type="text/plain"></script>-->
    <ueditor :value="defaultMsg" @input="editorChange" :config="defaultConfig" @ready="readyEditor"></ueditor>
    <el-button
      type="primary"
      @click="handleSubmit"
      style="position: fixed;
      top: 80px;
      right: 40px;">提交
    </el-button>
    <!--<el-button-->
      <!--type="primary"-->
      <!--@click="handleEdit"-->
      <!--style="position: fixed;-->
      <!--top: 80px;-->
      <!--right: 120px;">编辑原文-->
    <!--</el-button>-->
    <el-dialog title="新增文章" :visible.sync="articleForm" size="tiny" :before-close="beforeCloseModal"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="文章名称" prop="articleName">
          <el-input v-model="ruleForm.articleName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreatearticle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ueditor from '../components/ueditor.vue'
  import Cookies from 'js-cookie'
  export default {
    name: 'hello',
    data () {
      return {
        defaultMsg: 'Welcome to Your Editor',
        articleForm: false,
        ruleForm: {
          articleName: '',
          userId: Cookies.get('userId'),
          articleContent: '',
          articleId: ''
        },
        articleContent:'',
        rules: {
          articleName: [
            { required: true, message: '文章名称不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        },
        defaultConfig: {},
        editor: null,
      }
    },
    beforeMount(){

    },
    mounted(){
//      this.$nextTick(()=>{
        this.editor = UE.getEditor('editor', {
          initialFrameWidth: null,
          initialFrameHeight: 400,
        })
        if (this.$route.query.articleId) {
          this.ruleForm.articleId = this.$route.query.articleId
          let _this = this
          this.$http({
            url: '/getOneArticle',
            method: 'get',
            params: {
              articleId: _this.ruleForm.articleId
            }
          }).then((res) => {
            console.log(res)
            this.ruleForm.articleId =res.data.id
            this.ruleForm.userId = res.data.user_id
            this.ruleForm.articleName = res.data.article_name
            this.ruleForm.articleContent = res.data.article_content
          })
        }

//      })
//      this.readyEditor()
//      this.editorChange()
    },
    destroyed(){
      this.editor.destroy()
    },
//    update(){
//        let _this = this
//      this.editor.setContent(_this.articleContent)
//    },
//    watch:{
//      articleContent:function () {
//        let _this = this
//        this.editor.setContent(_this.articleContent)
//      }
//    },
    methods: {
      editorChange(obj){
        if (obj) {
          this.articleContent = obj.content
        }
      },
      readyEditor(editor){
        this.editor = editor
        let _this=this
        if(this.$route.query.articleId){
          editor.setContent(_this.ruleForm.articleContent)
        }else {
          editor.setContent(_this.defaultMsg)
        }
      },
      beforeCloseModal(done){
        this.$refs['ruleForm'].resetFields();
        done()
      },
      handleSubmit(){
        this.articleForm = true
      },
      handleCreatearticle(){
        const _this = this
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            _this.ruleForm.articleContent = _this.editor.getContent()
            let url =''
            if(this.$route.query.articleId === ''){
              url = '/articleSubmit'
            }else{
              url = '/articleUpdate'
            }
            _this.$http({
              url:url ,
              method: 'post',
              data: _this.ruleForm
            }).then((res) => {
              if (res) {
                this.articleForm = false
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        })

      }
    },
    components: {
      ueditor
    }
  }
</script>

<style scoped>
</style>
