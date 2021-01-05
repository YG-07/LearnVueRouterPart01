import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import User from '../components/User'

//Vue.use(插件)，安装插件
Vue.use(Router)

const routes = [
  {
    //重定向 首页
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    //设置:UID，动态获取一个属性值
    //过程是从App组件获取用户名，经过路由，传输到User组件
    path: '/user/:UID',
    component: User
  }
]
export default new Router({
  //配置路由和组件之间的关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
