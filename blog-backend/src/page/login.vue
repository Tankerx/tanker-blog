<template>
  <!--<div class="container demo-2">-->
  <div class="content">
    <div id="large-header" class="large-header" style="background-image: url('./../../static/bg-black.jpg')">
      <canvas id="demo-canvas"></canvas>
      <h1 class="main-title">Tanker</h1>
    </div>
    <div class="login-dom">
      <mu-text-field label="用户名"
                     labelFloat
                     v-model="username"
                     :errorText="nameErr"
      />
      <mu-text-field label="密码"
                     labelFloat
                     v-model="password"
                     :errorText="pwdErr"
                     type="password"
      />
      <mu-raised-button label="登录" secondary fullWidth @click="handleLogin"/>

    </div>
  </div>
  <!--</div>-->
</template>
<script>
  import Cookies from 'js-cookie'
  import demo from '../../static/js/demo-2'
  export default {
    name: 'hello',
    data () {
      return {
        username: '',
        password: '',
        nameErr: '',
        pwdErr: ''
      }
    },
    mounted(){
        demo()
      const rAfJs=require('./../../static/js/rAF')
    },
    components: {},
    methods: {
      handleLogin(){
        let _this=this
        if(this.valid()){
          this.$http({
            method: 'post',
            url:'/loginValidate',
            data:{
              username: _this.username,
              password: _this.password
            }
          }).then((res)=>{
              if(res){
                Cookies.set('user',res.data[0].username)
                Cookies.set('userId',res.data[0].id)
                this.$router.push({name:'用户'})
              }
          })
        }
      },
      valid(){
        if (this.username !== '' && this.password !== '') {
          return true
        }else{
          if (this.username === '') {
            this.nameErr = '用户名不能为空'
          } else {
            this.nameErr = ''
          }
          if (this.password === '') {
            this.pwdErr = '密码不能为空'
          } else {
            this.pwdErr = ''
          }
          return false
        }
      }
    }
  }
</script>

<style scoped>
  @import "/static/css/component.css";
</style>
