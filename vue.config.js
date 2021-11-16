/*
 * @Descripttion:
 * @version:
 * @Author: auth
 * @Date: 2020-12-21 15:23:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 10:15:36
 */
// const NODE_ENV = process.env.NODE_ENV;
// const path = require("path");
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // productionSourceMap: false,
  // publicPath: "/component-library/",
  //   outputDir: "my-component-ui" //build输出目录
  // runtimeCompiler: true,
  // devServer: {
  //   open: true,
  //   host: "0.0.0.0",
  //   port: "9020",
  //   hotOnly: true
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("components", resolve("src/components"));
    // config.plugin("html").tap(arg => {
    //   console.log("arg--", arg);
    //   arg[0].title = process.env.VUE_APP_METATITLE || "";
    //   return arg;
    // });
  }
};
