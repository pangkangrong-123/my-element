/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:44:16
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myInputNumber from "./src/xInputNumber";
myInputNumber.install = function(Vue) {
  Vue.component(myInputNumber.name, myInputNumber);
};
export default myInputNumber;
