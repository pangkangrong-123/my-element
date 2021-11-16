import myMenus from "./src/my-menus";
myMenus.install = function(Vue) {
  Vue.component(myMenus.name, myMenus);
};
export default myMenus;
