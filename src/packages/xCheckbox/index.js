/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:42:20
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myCheckbox from "./src/xCheckbox";
myCheckbox.install = function(Vue) {
  Vue.component(myCheckbox.name, myCheckbox);
};
export default myCheckbox;
