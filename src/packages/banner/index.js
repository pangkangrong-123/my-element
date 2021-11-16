/*
 * @Descripttion: 
 * @version: 
 * @Author: auth
 * @Date: 2021-07-23 17:35:25
 * @LastEditors: auth
 * @LastEditTime: 2021-08-03 17:49:36
 */
import myBanner from "./src/my-banner";
myBanner.install = function(Vue) {
  Vue.component(myBanner.name, myBanner);
};
export default myBanner;
