<template>
  <div class="container">
    <div class="left-nav-container">
      <el-menu default-active="/user" style="height: 100%" theme="dark" class="el-menu-vertical-demo" router
               :collapse="isCollapse">
        <el-menu-item index="/user">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-edit"></i>
          <span slot="title">文章编辑 </span>
        </el-menu-item>
        <el-menu-item index="/articleList">
          <i class="el-icon-more"></i>
          <span slot="title">文章列表 </span>
        </el-menu-item>
      </el-menu>
      <div class="toggle-icon" @click="handleToggle">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </div>
    </div>
    <div :class="isCollapse?'right-container-collapse':'right-container'">
      <div class="right-header">
        <el-menu class="el-menu-demo" mode="horizontal" style="background-color: white" @select="handleSelect">
          <el-submenu index="2" style="float: right;margin-right: 50px;">
            <template slot="title">tanker</template>
            <el-menu-item index="2-1">修改密码</el-menu-item>
            <el-menu-item index="Login">注销</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main-container">
        <div class="bread-container">
          <el-breadcrumb separator="/" style="line-height: 60px;margin-left: 20px;">
            <el-breadcrumb-item v-for="bread in breadData" :to="bread.path" :key="bread.path">{{bread.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-container">
          <router-view></router-view>
        </div>
        <div class="footer-container">
          <span>Tanker's Blog Admin</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .left-nav-container {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .container {
    width: 100%;
    height: 100%;
  }

  .bread-container {
    height: 60px;
    width: 100%;
  }

  .content-container {
    position: absolute;
    top: 60px;
    bottom: 100px;
    left: 20px;
    right: 20px;
    background-color: #fff;
    overflow-y: auto;
  }

  .footer-container {
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background-color: #fff;
  }

  .main-container {
    background-color: #EFF2F7;
    position: absolute;
    top: 60px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  .toggle-icon {
    width: 100%;
    text-align: center;
    color: white;
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
    cursor: pointer;
  }

  .right-header {
    height: 50px;
    width: 100%;
    line-height: 50px;
  }

  .el-submenu .el-menu-item {
    min-width: 140px;
  }

  .el-menu--horizontal .el-submenu__title:hover {
    background-color: #fff;
  }

  .right-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 200px;
    right: 0;
    transition: left 0.4s;
  }

  .right-container-collapse {
    position: absolute;
    top: 0;
    bottom: 0;
    transition: left 0.4s;
    left: 64px;
    right: 0;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        breadData: [
          {
            name:'首页',
            path:'/'
          }
        ]
      };
    },
    methods: {
      handleToggle(){
        this.isCollapse = !this.isCollapse
      },
      handleSelect(key,keyPath){
          console.log(key,keyPath)
        this.$router.push({name:'Login'})
      }
    },
    watch: {
      '$route'(to, from){
        if(this.breadData[1]){
            this.breadData[1]={
              name:to.name,
              path:to.fullPath
            }
        }else{
          this.breadData.push({
            name:to.name,
            path:to.fullPath
          })
        }
      }
    }
  }
</script>
