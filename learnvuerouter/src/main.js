import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$rout = "成功调用 Vue自定义的变量"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
console.log("main.js打印的router对象")
console.log(router)

const obj = {
  name: 'Peter'
}
const age = Object.create(null)  // 没有继承的属性
age.value = 18
Object.defineProperty(obj, 'age', age)
console.log(obj)

obj.height=1.79
console.log(obj)
