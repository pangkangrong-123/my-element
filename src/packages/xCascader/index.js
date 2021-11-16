/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:41:58
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myCascader from "./src/xCascader";
myCascader.install = function(Vue) {
  Vue.component(myCascader.name, myCascader);
};
export default myCascader;
