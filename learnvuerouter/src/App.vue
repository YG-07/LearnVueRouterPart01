<template>
  <div id="app">
    <h1>这是Vue组件</h1>
  
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link> -->

    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button> -->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>

    <!-- <router-link v-bind:to="'/user/'+userId">用户</router-link> -->

    <!-- <router-link to="/profile">简介</router-link> -->
    <!-- <router-link :to="{path: '/profile', query: {name: 'Tom', age:18, height:1.88}}">
      简介
    </router-link> -->

    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>

    <keep-alive exclude="Profile,User">
      <router-view/>
    </keep-alive>
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
      },
      userClick() {
        this.$router.push('/user/'+this.userId)
      },
      profileClick() {
        this.$router.push({
          path:'/profile',
          query:{
            name: 'John',
            age: 19,
            height: 1.81
          }
        })
      }
    }
}
</script>

<style scoped>

</style>
