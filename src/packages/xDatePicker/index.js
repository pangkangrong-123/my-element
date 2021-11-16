/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:43:12
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myDatePicker from "./src/xDatePicker";
myDatePicker.install = function(Vue) {
  Vue.component(myDatePicker.name, myDatePicker);
};
export default myDatePicker;
