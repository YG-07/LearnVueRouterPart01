# LearnVueRouterPart01
学习和使用vue-router
  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
视频(100-p) URL：https://www.bilibili.com/video/BV15741177Eh?p=795 
  
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