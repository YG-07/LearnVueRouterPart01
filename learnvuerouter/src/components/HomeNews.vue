<template>
  <div>
	  <ul>
      <li>新闻1</li>
      <li>新闻2</li>
      <li>新闻3</li>
      <li>新闻4</li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: "HomeNews",
  //   created() {
  //     document.title = "首页-新闻"
  //   }
    destroyed() {
      console.log('news destoryed');
    }
	}
</script>

<style scoped>

</style>