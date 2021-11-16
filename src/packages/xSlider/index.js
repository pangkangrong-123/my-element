/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:46:06
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import mySlider from "./src/xSlider";
mySlider.install = function(Vue) {
  Vue.component(mySlider.name, mySlider);
};
export default mySlider;
