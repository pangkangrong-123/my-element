/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:44:34
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myProgress from "./src/xProgress";
myProgress.install = function(Vue) {
  Vue.component(myProgress.name, myProgress);
};
export default myProgress;
