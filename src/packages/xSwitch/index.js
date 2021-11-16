/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:46:21
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import mySwitch from "./src/xSwitch";
mySwitch.install = function(Vue) {
  Vue.component(mySwitch.name, mySwitch);
};
export default mySwitch;
