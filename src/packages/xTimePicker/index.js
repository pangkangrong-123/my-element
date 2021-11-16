/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:46:53
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTimePicker from "./src/xTimePicker";
myTimePicker.install = function(Vue) {
  Vue.component(myTimePicker.name, myTimePicker);
};
export default myTimePicker;
