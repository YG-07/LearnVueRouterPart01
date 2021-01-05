import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'

//Vue.use(插件)，安装插件
Vue.use(Router)

const routes = [
  {
    path: '',
    //重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]
export default new Router({
  //配置路由和组件之间的关系
  routes,
  mode: 'history'
})
