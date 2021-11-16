/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:47:45
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myTree from "./src/xTree";
myTree.install = function(Vue) {
  Vue.component(myTree.name, myTree);
};
export default myTree;
