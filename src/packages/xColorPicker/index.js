/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:42:53
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myColorPicker from "./src/xColorPicker";
myColorPicker.install = function(Vue) {
  Vue.component(myColorPicker.name, myColorPicker);
};
export default myColorPicker;
