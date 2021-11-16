/*
 * @Author: your name
 * @Date: 2021-10-25 09:48:26
 * @LastEditTime: 2021-11-16 10:23:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myprojrct\src\main.js
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import kySwitch from "./packages/switch/index.js"
import axios from 'axios'
import App from './App.vue'
Vue.use(ElementUI);
Vue.use(kySwitch)
Vue.prototype.$axios = axios 
// Vue.use( axios)
Vue.config.productionTip = false
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 引入组件
import HelloWorld from "./components/HelloWorld.vue";
import xForm from "./components/xForm.vue";
import xTable from "./components/xTable.vue";
const routes = [
  {
      path:"/HelloWorld",
      component: HelloWorld
  },
  {
      path:"/xForm",
      component: xForm
  },
  {
      path:"/xTable",
      component: xTable
  },
]
var router =  new VueRouter({
  mode:"hash",
  routes
})
new Vue({
  render: h => h(App),
  router,  // 注入到根实例中
}).$mount('#app')
