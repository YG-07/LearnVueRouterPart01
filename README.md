# LearnVueRouterPart01
学习和使用vue-router
  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
  
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
### 五、动态路由的使用
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

### 六、认识嵌套路由
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