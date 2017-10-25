<template>
  <div>
    <el-button style="    position: fixed;
    top: 75px;
    right: 40px;" @click="handleAddUer">新增用户
    </el-button>
    <el-dialog title="新增用户" :visible.sync="userForm" size="tiny" :before-close="beforeCloseModal"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreateUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="password"
        label="密碼"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click.native.prevent="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import request from '../utils/request'
  export default {
    name: 'hello',
    data () {
      return {
        tableData: [],
        userForm: false,
        ruleForm: {
          username: '',
          userId: '',
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount(){
//        console.log(getUser())
//        const data = yield getUser()
//      conosle.log(data)
      this.getTableData()
    },
    methods: {
      getTableData(){
          this.ar
        this.$http.get('/user').then((res) => {
          this.tableData = res.data
        }).catch((err) => {
          console.log(err)
        })
      },
      handleAddUer(){
        this.userForm = true
      },
      beforeCloseModal(done){
        this.$refs['ruleForm'].resetFields();
        done()
      },
      handleEdit(index, row){
        this.ruleForm.username = row.username
        this.ruleForm.userId = row.id
        this.userForm = true
      },
      handleDelete(index,row){
        this.$http({
          url:'/userDelete',
          method:'post',
          data:{
            id: row.id
          }
        }).then((res)=>{
            if(res){
                this.getTableData()
            }
        }).catch((err)=>{
            console.log(err)
        })
      },
      handleCreateUser(){
        let _this = this
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              let url= this.ruleForm.userId === '' ? '/userAdd' : '/userUpdate'
              let postData = this.ruleForm.userId === ''
                ? {username: _this.ruleForm.username }
                : {username: _this.ruleForm.username,userId: _this.ruleForm.userId }
            _this.$http({
              url: url,
              method: 'post',
              data: postData
            }).then((res) => {
              this.$refs['ruleForm'].resetFields();
              this.userForm = false
              this.getTableData()
            })
          } else {
            this.$message.error('表单验证失败');
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
