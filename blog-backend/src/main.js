// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import request from './utils/request'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
require('swiper/dist/css/swiper.css')
import VueSwiper from 'vue-awesome-swiper'

Vue.use(VueSwiper)
Vue.use(MuseUI)
Vue.prototype.$http=request
Vue.config.productionTip = false
Vue.use(element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
