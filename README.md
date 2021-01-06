# LearnVueRouterPart01
学习和使用vue-router
  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
视频(100-p) URL：https://www.bilibili.com/video/BV15741177Eh?p=100
  
# 二、本部分知识大纲
(数字表示视频URL分p)  
### 一、用vue-cli2创建含vue-router的项目 (100-102)
指令：`vue init webpack learnvuerouter`  

### 二、理解web前后端渲染和前后端路由，4个概念
博客 URL：https://blog.csdn.net/qq_45149720/article/details/108806094  
* 后端路由：后端处理URL和页面之间的映射关系，通过URL向服务器请求页面代码
* 前端路由：前端处理URL和页面之间的映射关系，生成URL在js组件查找，不会向服务器请求资源
* 后端渲染：当请求url发送时，前端页面向服务器请求页面，此时**动态页面在后端形成**，再**传输给前端**.如：jsp模式(java server page,数据库+服务器+客户端网页)
* 前端渲染：当请求url发送时，前端页面向服务器请求页面，服务器传输给前端页面为（html+css+js）的页面，页面在**前端游览器进行渲染**.如：AJAX的出现

### 三、改变URL不刷新页面的操作 (102)
#### 3.1 改变方法
1. 使用`location.hash = 'aaa'`，URL会变成.../#/aaa，使用`location.href`查看URL
2. 使用history的模式
* 使用`history.pushState({}, '', 'home')`，URL会变成.../home
* 使用`history.replaceState({}, '', 'home')`会替换当前URL  
* `history.back()`和`history.forward()`进行出栈入栈，即后退和前进 
* `history.go(-1)`表示页面跳转，数字表示相对当前的页面

### 四、安装和使用vue-router (103-104)
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
### 五、动态路由的使用 (108-110)
博客 URL：https://blog.csdn.net/jwz934738949/article/details/107595652  
#### 5.1 案例：用户页面
过程实际上是从App组件获取用户名，经过路由，传输到User组件  
1. 先创建一个User.vue组件
2. 配置路由规则，拼接参数实际是`修改hash`进行页面跳转
```javaScript
{
  //设置属性:UID，动态获取一个属性值才显示该组件
  path: '/user/:UID',
  component: User
}
```
3. 在App里插入用户的标签：`<router-link v-bind:to="'/user/'+userId">用户</router-link>`  
绑定to属性，并返回一个userId值，`data(){ return{ userId: 'lisi'}}`
4. 以上实现了动态的URL，若User组件里还要获取用户名,通过`params(参数)`的方式`<h2>$route.params.UID</h2>`

#### 5.2 认识路由的懒加载
官方给出了解释：  
* 当打包构建应用时，Javascript包会变得非常大，影响页面加载。
* 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

#### 5.3 打包项目，分析dist目录
打包指令：`npm run build`  
在dist目录里有：static文件夹和index.html，前者包括css、js文件夹，
* app的js：业务代码，自己编写的代码
* manifest的js：支持代码，为打包的代码做底层支持，如：各种语法的导入导出
* vendor的js：第三方代码，如：vue/vue-router/axios等

#### 5.4 懒加载的方式
1. 结合Vue的异步组件和Webpack的代码分析.
2. AMD写法
3. 在ES6中，我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割

### 六、认识嵌套路由 (111-113)
#### 6.1 案例：首页的新闻和消息标签
先进行组件的嵌套，再用children属性定义嵌套路由，与普通路由类似  
1. 创建HomeNews和HomeMessage.vue组件
2. 在`'/home'`的路由里定义`children`属性，值是数组类似外层的`route`变量
3. 同样可以定义重定向默认路径，子路由的path是相对路径，前面`不能加'/'`
```javaScript
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
```
#### 6.2 传递参数的方式
* 传递参数主要有两种类型：**params**和**query**
* Wiki百科URL的组成部分：`URI=协议类型：[//服务器地址[：端口号]]/资源层级UNIX文件路径]文件名[?查询][#片段ID]`或`URI=scheme:[//quthority]path[?query][#fragment]`  
  如：`http://localhost:8080/profile?name=Tom&age=18&height=1.88`  
* params的类型：
  1. 配置路由格式：/router/:id
  2. 传递的方式：在path后面跟上对应的值
  3. 传递后形成的路径：/router/123，/router/abc
* query的类型：
  1. 配置路由格式：/router，也就是普通配置
  2. 传递的方式：对象中使用query的key作为传递方式
  3. 传递后形成的路径：/router?id=123，/router?id=abc
#### 6.3 案例：query传参到profile页面
1. 创建Profile.vue组件
2. 新建profile路由表
3. 在实例中通过路由使用组件，绑定to属性，通过对象传参，发送query请求
```HTML
<router-link :to="{path: '/profile', query: {name: 'Tom', age:18, height:1.88}}">
  档案
</router-link>
```
4. 若想获取`query(请求)`的数据，用`{{$route.query.name}}`方式直接使用

#### 6.4 通过标签的事件方法，发送2种请求params和query
1. 设置用户、档案的按钮
2. 监听点击事件`@click`
3. 设置事件方法，同样是`拼接参数`和`传递对象`
```javaScript
//userId来自于App的data()
userClick() {
  this.$router.push('/user/'+this.userId)
},
profileClick() {
  this.$router.push({path:'/profile',
    query:{name: 'John', age: 19, height: 1.81}})
}
```
  
### 七、区分$router和$route (114)
#### 7.1 这2个变量是什么?
简而言之(片面总结)，`$router(路由表对象)包含多个$route(路由规则对象)！`
**所有的组件都继承自Vue的原型(prototype)**，组件里可以使用这2个变量  
* $router为`VueRouter实例对象`，它可以导航到不同URL，则使用$router.push等方法
* $route为当前`router跳转对象`,即当前`活跃的路由对象`,可以获取它name、path、query、params等
#### 7.2 代码演示它们的区别
* main.js里的`router`就是组件里的`$router`
* 运行项目，查看User组件打印的$router和$route区别
* 运行项目，在main.js里自定义一个原型变量`$rout`，查看组件，也能调用
#### 7.3 vue-router3.0.2源码分析
* 在vue-router源码中，使用了一个方法向Vue的原型里添加了这2个变量  
  关于`Qbject.defineProperty()`，在项目main.js有简单演示  
  博客 URL：https://blog.csdn.net/m0_38102188/article/details/86535632
```javaScript
Qbject.defineProperty(Vue.prototype, '$router', {
  get () { return this._routerRoot._router }
})
```
* 注册RouterLink和RouterView组件，使用时标签是小写，大写处改用'-'连接
```javaScript
Vue.component('Routerview',View)
Vue.component('RouterLink',Link)
```

### 八、vue-router的全局导航守卫 (115-116)
#### 8.1 (温习)Vuejs的生命周期函数
博客 URL：https://www.cnblogs.com/wzndkj/p/9612647.html  
常用的几个生命周期函数：  
1. `created()`，创建完组件后回调
2. `mounted()`，template挂载到DOM上后回调
3. `updated()`，界面发生改变时回调
#### 8.2 案例：跳转页面时改变网页标题
* 方案一(不推荐)：在每个组件里使用生命周期函数.当组件很多时，工作量巨大
* 方案二：使用导航守卫
  * vue-router提供的导航守卫主要用来`监听路由的进入和离开`的
  * vue-router提供了`beforeEach`和`afterEach`的钩子函数，它们会在路由即将改变前和改变后触发.
#### 8.3 导航守卫的使用
* 我们可以利用beforeEach来完成标题的修改  
1. 首先，我们可以在钩子当中定义一些标题可以利用meta来定义
```javaScript
//meta：元数据（描述数据的数据）
meta: {
  title: '首页'
}
```
2. 其次，利用导航守卫，修改我们的标题.
* 导航钩子的三个参数解析，from、to都是Route类型：
  * to：即将要进入的目标的路由对象.
  * from：当前导航即将要离开的路由对象。
  * next：调用该方法后，才能进入下一个钩子.
```javaScript
//定义前置钩子(hook，即回调)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
```
#### 8.4 导航守卫的补充
【Vue Router | 导航守卫】  
官方URL：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
1. 后置钩子不需要主动调用next()函数，`router.afterEach((to, from) => {...})`
2. 上面我们使用的导航守卫，被称之为`全局守卫`.还有：
  * 路由独享的守卫，在Route对象里添加属性`beforeEnter: (to, from, next) => {...}`
  * 组件内的守卫，有`beforeRoute`+`Enter/Update/Leave`3个函数，参数也是`(to, from, next)`
3. `next('/path')` 或者 `next({path: '/'})`可用于拦截和强制跳转路径

### 九、vue-router的keep-alive (117-118)
#### 9.1 keep-alive是什么?
1. 需求：切换页面时，希望`保留页面的子页面路径`，避免重新加载还得使用`<keep-alive>`  
 思路：先删除Home路由的嵌套重定向，data()里使用path保存当前路径，使用组件内守卫，激活和离开组件时改变组件当前的path值.`activated和de~函数`只有keep-alive存在时生效
```javaScript
//在Home页面，有News和Message子页面
activated() {
  this.$router.push(this.path)
},
beforeRouteLeave(to, from, next) {
  this.path = this.$route.path
  next()
}
```
* keep-alive 是Vue内置的一个组件，可以使被`包含的组件保留状态`，或`避免重新渲染`.他有2个属性：  
  * **include** 字符串或正则表达，只有匹配的组件会被缓存
  * **exclude** 字符串或正则表达式，任何匹配的组件都不会被缓存
* router-view 也是一个组件，如果直接被包在keep-alive里面，所有`路径匹配到的视图组件`都会被缓存：
2. 需求：切换页面时,希望`重新加载`某些页面，使用方法：  
```HTML
<!-- in/exclude使用组件的name值，用','隔开，不能加空格 -->
<keep-alive exclude="Profile,User">
  <router-view/>
</keep-alive>
```
