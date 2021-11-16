/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:45:14
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myRate from "./src/xRate";
myRate.install = function(Vue) {
  Vue.component(myRate.name, myRate);
};
export default myRate;
