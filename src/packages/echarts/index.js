/*
 * @Descripttion: 
 * @version: 
 * @Author: auth
 * @Date: 2021-07-09 09:20:23
 * @LastEditors: auth
 * @LastEditTime: 2021-07-26 17:21:24
 */
import myEcharts from "./src/my-echarts";
myEcharts.install = function(Vue) {
  Vue.component(myEcharts.name, myEcharts);
};
export default myEcharts;
