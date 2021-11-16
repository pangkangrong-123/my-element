/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:45:50
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import mySelectTree from "./src/xSelectTree";
mySelectTree.install = function(Vue) {
  Vue.component(mySelectTree.name, mySelectTree);
};
export default mySelectTree;
