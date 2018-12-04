import Vue from 'vue'
import Router from 'vue-router'

//  导入组件，配置路由
//  .vue 后缀可省略
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'

// 安装路由插件
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// to 表示当前要去的路由
// from 表示从哪个路由来的
// next() 跳转到下一个页面

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
  const token = localStorage.getItem('token')
  // 登陆过
  if (token) {
    next()
  // 没有登录菓
  } else {
    next('/login')
  }
})

  /*
    登录访问的思路：
    1 判断是不是登录页面
    2 如果是登录页面，直接展示登录页面内容

    3 如果不是登录页面，就判断是否登录
    4 如果登录了，就直接显示要访问的页面
    5 如果没有登录，就跳转到登录页面，让用户登录
  */
export default router