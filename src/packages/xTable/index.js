/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-08-06 11:43:20
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTables from "./src/xTable";
myTables.install = function(Vue) {
  Vue.component(myTables.name, myTables);
};
export default myTables;
