<!--
 * @Author: your name
 * @Date: 2021-10-25 09:48:26
 * @LastEditTime: 2021-10-29 19:14:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myprojrct\src\App.vue
-->
<template>
  <div id="app">
    <router-view/>
    
    
  </div>
</template>

<script>
// import HelloWorld from './package/switch/src/mswitch.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
