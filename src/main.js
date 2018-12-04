// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'

// 导入element插件
import ElementUi from 'element-ui'
// 导入组件库样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入自定义样式
import '@/assets/css/index.css'
// 安装插件
Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
