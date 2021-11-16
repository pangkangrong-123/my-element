import myHeader from "./src/my-header";
myHeader.install = function(Vue) {
  Vue.component(myHeader.name, myHeader);
};
export default myHeader;
