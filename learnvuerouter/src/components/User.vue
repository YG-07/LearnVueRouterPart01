<template>
  <div>
      <h2>我是用户界面</h2>
      <p>这是用户的相关信息，呵呵呵</p>
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
	}
}
</script>

<style scoped>

</style>