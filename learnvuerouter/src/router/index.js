import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

//ES6的路由懒加载
const Home = () => import('../components/Home')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')



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
    component: Home,
    //嵌套路由，属性children，子路径不能加'/'
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
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
  },
  {
    path: '/profile',
    component: Profile
  }
]
export default new Router({
  //配置路由和组件之间的关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
