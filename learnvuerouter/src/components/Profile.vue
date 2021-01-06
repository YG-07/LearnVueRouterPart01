<template>
  <div>
      <h2>我是Profile</h2>
      <p>我的简介信息......喵喵喵</p>
      <h2>姓名：{{$route.query.name}}</h2>
      <h2>年龄：{{$route.query.age}}</h2>
      <h2>身高：{{$route.query.height}}</h2>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    created() {
      console.log("profile created")
    },
    destroyed() {
      console.log("profile destroyed")
    },
    //3.组件内的守卫
    // beforeRouteEnter(to, from, next) {
    // console.log('进入了Profile页面，这是组件内的守卫')
    // }
  }
</script>

<style scoped>

</style>