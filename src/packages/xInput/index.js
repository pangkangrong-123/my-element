/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:44:00
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myInput from "./src/xInput";
myInput.install = function(Vue) {
  Vue.component(myInput.name, myInput);
};
export default myInput;
