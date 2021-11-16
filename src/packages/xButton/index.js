/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:41:37
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myButton from "./src/xButton";
myButton.install = function(Vue) {
  Vue.component(myButton.name, myButton);
};
export default myButton;
