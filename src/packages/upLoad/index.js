import myUpLoad from "./src/my-upload";
myUpLoad.install = function(Vue) {
  Vue.component(myUpLoad.name, myUpLoad);
};
export default myUpLoad;
