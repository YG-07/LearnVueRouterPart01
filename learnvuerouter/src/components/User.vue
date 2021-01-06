<template>
  <div>
      <h2>我是用户界面</h2>
      <p>这是用户的相关信息，呵呵呵</p>
      <button @click="btnClick">打印$router和$route</button>
    <h2>{{userId}}</h2>
  </div>
</template>

<script>
export default {
  name: 'User',
  computed:{
    userId() {
      //获取活跃路由的UID参数
      return this.$route.params.UID
    }
  },
  created() {
    console.log("user created")
  },
  destroyed() {
    console.log("user destroyed")
  },
  methods: {
    btnClick() {
      console.log("组件里打印的$router，全局的路由对象")
      console.log(this.$router)
      console.log("组件里打印的$route，当前活跃路由")
      console.log(this.$route)
      console.log("调用自定义变量$rout")
      console.log(this.$rout)
    }
  }
}
</script>

<style scoped>

</style>