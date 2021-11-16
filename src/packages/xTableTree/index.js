/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-08-25 16:21:12
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTablesTree from "./src/xTableTree";
myTablesTree.install = function(Vue) {
  Vue.component(myTablesTree.name, myTablesTree);
};
export default myTablesTree;
