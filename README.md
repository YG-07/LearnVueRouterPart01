# LearnVueRouterPart01
学习和使用vue-router
  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
视频(100-p) URL：https://www.bilibili.com/video/BV15741177Eh?p=100
  
# 二、本部分知识大纲
(数字表示视频URL分p)  
### 一、用vue-cli2创建含vue-router的项目
指令：`vue init webpack learnvuerouter`  

### 二、理解web前后端渲染和前后端路由，4个概念
博客 URL：https://blog.csdn.net/qq_45149720/article/details/108806094  
* 后端路由：后端处理URL和页面之间的映射关系，通过URL向服务器请求页面代码
* 前端路由：前端处理URL和页面之间的映射关系，生成URL在js组件查找，不会向服务器请求资源
* 后端渲染：当请求url发送时，前端页面向服务器请求页面，此时**动态页面在后端形成**，再**传输给前端**.如：jsp模式(java server page,数据库+服务器+客户端网页)
* 前端渲染：当请求url发送时，前端页面向服务器请求页面，服务器传输给前端页面为（html+css+js）的页面，页面在**前端游览器进行渲染**.如：AJAX的出现

### 三、改变URL不刷新页面的操作
#### 3.1 改变方法
1. 使用`location.hash = 'aaa'`，URL会变成.../#/aaa，使用`location.href`查看URL
2. 使用history的模式
* 使用`history.pushState({}, '', 'home')`，URL会变成.../home
* 使用`history.replaceState({}, '', 'home')`会替换当前URL  
* `history.back()`和`history.forward()`进行出栈入栈，即后退和前进 
* `history.go(-1)`表示页面跳转，数字表示相对当前的页面

### 四、安装和使用vue-router
#### 4.1 安装vue-router
安装过可直接使用.若创建项目没有安装router，安装：`npm install vue-router --save`  
#### 在项目中使用
（因为是一个插件，所以可以通过Vue.use()来安装路由功能）  
* 1.导入路由对象，`import Router from 'vue-router'`名字自定义，再调用`Vue.use（Router）`  
* 2.创建路由实例，并且传入路由映射配置.`new Router({routes: [...]})`  
* 3.在Vue实例中挂载创建的路由实例.`export default ...`导出，main.js导入并挂载  

#### 4.2 基本使用vue-router，默认通过hash改变URL
* 创建组件，导出并导入index.js
* 添加路由规则，指向home、about的组件
```javaScript
{
  path: '/home',
  component: Home
},
```
* 默认页面显示home组件，使用重定向redirect属性
```javaScript
{
  path: '',
  redirect: '/home'
}
```
#### 4.3 使用HTML5的history改变URL
在index.js里的Router添加mode的option，使用`mode: 'history'`

#### 4.4 App.vue通过路由使用组件
* 使用router-link使用组件,to属性指定跳转路径，tag指定渲染后的标签，replace属性取消history记录，
* router-view显示组件
* 使用router-link的属性`active-class="active"`改变active属性名，或在index.js里配置`linkActiveClass: 'active'`
```HTML
<router-link to="/home" tag="button" replace active-class="active">首页</router-link>
<router-link to="/about" tag="button">关于</router-link>
<router-view></router-view>
```

#### 4.4 通过标签的事件方法，跳转页面
* 如，使用button标签的点击事件
```HTML
<button @click="homeClick">首页</button>
<button @click="aboutClick">关于</button>
```
* 通过方法修改路由，使用vue-router的$router.避免绕过index.js直接修改路由
```javaScript
homeClick() {
  // this.$router.push('/home')
  this.$router.replace('/home')
}
```