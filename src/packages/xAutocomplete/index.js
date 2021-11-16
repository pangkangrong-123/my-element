/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:38:07
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myAutocomplete from "./src/xAutocomplete";
myAutocomplete.install = function(Vue) {
  Vue.component(myAutocomplete.name, myAutocomplete);
};
export default myAutocomplete;
