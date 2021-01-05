<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link> -->
    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button> -->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link v-bind:to="'/user/'+userId">用户</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      userId: 'lisi'
    }
  },
  methods: {
      homeClick() {
        //通过方法修改路由，使用vue-router的$router
        //避免绕过index.js直接修改路由
        // this.$router.push('/home')
        this.$router.replace('/home')
        console.log('home Click')
      },
      aboutClick() {
        this.$router.push('/about')
        console.log('about Click')
      }
    }
}
</script>

<style scoped>

</style>
