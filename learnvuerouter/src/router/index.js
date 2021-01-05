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
    //meta：元数据（描述数据的数据）
    meta: {
      title: '首页'
    },
    //嵌套路由，属性children，子路径不能加'/'
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews,
        meta: {
          title: '首页 - 新闻'
        }
      },
      {
        path: 'message',
        component: HomeMessage,
        meta: {
          title: '首页 - 消息'
        }
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
    beforeEnter: (to, from, next) => {
      console.log('这是about的路由独享守卫');
    }
  },
  {
    //设置:UID，动态获取一个属性值
    //过程是从App组件获取用户名，经过路由，传输到User组件
    path: '/user/:UID',
    component: User,
    meta: {
      title: '用户'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    }
  }
]
const router = new Router({
  //配置路由和组件之间的关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

//1.全局守卫
//前置钩子
router.beforeEach((to, from, next) => {
  //从from跳转到to，都是Route类型
  document.title = to.meta.title
  // console.log(to)
  //重构此方法时要手动调用一下next()才能正常跳转
  console.log("前置hook");
  next()
})

//后置钩子
router.afterEach((to, from) => {
  console.log("后置hook");
})

export default router