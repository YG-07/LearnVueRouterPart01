<template>
  <div>
      <h2>我是首页</h2>
      <p>我是首页内容，嘿嘿嘿</p>
      <!-- 绝对路径，前面必须有'/' -->
      <router-link to="/home/news">新闻</router-link>
      <router-link to="/home/message">消息</router-link>
      <keep-alive><router-view/></keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return{
      path: '/home/news'
    }
  },
  destroyed() {
    console.log("home destroyed");
  },
  //activated和de~函数只有keep-alive存在时生效
  activated() {
    this.$router.push(this.path)
  },
  // deactivated() {},
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path)
    this.path = this.$route.path
    next()
  }
}
</script>

<style scoped>

</style>