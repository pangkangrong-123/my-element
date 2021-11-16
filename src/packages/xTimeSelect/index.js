/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:47:08
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTimeSelect from "./src/xTimeSelect";
myTimeSelect.install = function(Vue) {
  Vue.component(myTimeSelect.name, myTimeSelect);
};
export default myTimeSelect;
