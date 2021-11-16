/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:43:42
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myForms from "./src/xForm";
myForms.install = function(Vue) {
  Vue.component(myForms.name, myForms);
};
export default myForms;
