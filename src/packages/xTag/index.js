/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-08-05 22:20:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myxTag from "./src/xTabs";
myxTag.install = function(Vue) {
  Vue.component(myxTag.name, myxTag);
};
export default myxTag;
