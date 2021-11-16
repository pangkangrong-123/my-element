import myDialog from "./src/my-dialog";
myDialog.install = function(Vue) {
  Vue.component(myDialog.name, myDialog);
};
export default myDialog;
