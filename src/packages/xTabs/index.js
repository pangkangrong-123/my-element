/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:46:36
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTabs from "./src/xTabs";
myTabs.install = function(Vue) {
  Vue.component(myTabs.name, myTabs);
};
export default myTabs;
