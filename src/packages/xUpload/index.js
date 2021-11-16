/*
 * @Author: your name
 * @Date: 2021-07-26 10:23:48
 * @LastEditTime: 2021-07-26 15:48:01
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xAutocomplete\index.js
 */
import myUpload from "./src/xUpload";
myUpload.install = function(Vue) {
  Vue.component(myUpload.name, myUpload);
};
export default myUpload;
