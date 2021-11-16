/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:45:31
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import mySelect from "./src/xSelect";
mySelect.install = function(Vue) {
  Vue.component(mySelect.name, mySelect);
};
export default mySelect;
