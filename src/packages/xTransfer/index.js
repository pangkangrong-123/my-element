/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:47:26
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTransfer from "./src/xTransfer";
myTransfer.install = function(Vue) {
  Vue.component(myTransfer.name, myTransfer);
};
export default myTransfer;
