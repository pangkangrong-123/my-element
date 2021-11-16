/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:44:51
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myRadio from "./src/xRadio";
myRadio.install = function(Vue) {
  Vue.component(myRadio.name, myRadio);
};
export default myRadio;
