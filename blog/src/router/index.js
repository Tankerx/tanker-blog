import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/main'
Vue.use(Router)

export default new Router({
  routes: [
    //博客后台路由
    {
      path: '/',
      redirect: '/login',
    },
    {
      path:'/login',
      name:'Login',
      component: resolve => require(['../page/login.vue'], resolve)
    },
    {
      path:'/main',
      name:'Main',
      component: Main,
      children:[
        {
          path:'/user',
          name:'用户',
          component: resolve => require(['../page/user.vue'], resolve)
        },
        {
          path:'/article',
          name:'编辑文章',
          component: resolve => require(['../page/article.vue'], resolve)
        },
        {
          path:'/articleList',
          name:'文章列表',
          component: resolve => require(['../page/articleList.vue'], resolve)
        },
      ]
    },
    //博客访问页路由
    {
      path:'/home',
      name:'博客首页',
      component: resolve => require(['../blogPage/home.vue'], resolve)
    }
  ]
})
