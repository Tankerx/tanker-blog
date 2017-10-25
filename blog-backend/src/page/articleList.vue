<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="作者"
      >
      </el-table-column>
      <el-table-column
        prop="articleName"
        label="文章名"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="updateDate"
        label="最后更新时间"
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
            @click.native.prevent="handleSelect(scope.$index, scope.row)">查看原文
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click.native.prevent="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="modalTitle" :visible.sync="modalVisible">
      <div  v-html="modalContent" style="overflow-x: auto" >

      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        tableData: [],
        modalTitle: '',
        modalVisible: false,
        modalContent: ''
      }
    },
    beforeMount(){
      this.getTableData()
    },
    methods: {
      getTableData(){
          this.$http.get('/getArticleList').then((res)=>{
              this.tableData = res.articleList
              console.log(res)
          })
      },
      handleSelect(index,row){
        this.$http({
          url: '/getOneArticle',
          method: 'get',
          params: {
            articleId: row.articleId
          }
        }).then((res) => {
            console.log(res)
          this.modalTitle = res.data.article_name
          this.modalContent = res.data.article_content
          this.modalVisible = true
        })
      },
      handleEdit(index,row){
        this.$router.push({name:'编辑文章',query:{articleId: row.articleId}})
      },
      handleDelete(index,row){
          this.$http({
            url: '/articleDelete',
            method: 'post',
            data:{
                articleId: row.articleId
            }
          }).then((res)=>{
              if(res){
                  this.getTableData()
              }
          })
      }
    }
  }
</script>

<style scoped>
  html{
    font-size: 100%;
  }
</style>
