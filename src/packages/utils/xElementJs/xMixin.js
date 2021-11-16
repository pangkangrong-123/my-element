/*
 * @Author: your name
 * @Date: 2021-07-12 10:10:05
 * @LastEditTime: 2021-10-22 11:21:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\common\js\xMixin.js
 */
import golbalConfig from "./config";
import {
  filterStr
  // checkPhone
  // , comdify, delcommafy
} from "./defaultFunction.js";
export default function() {
  return {
    module: {
      prop: "propData",
      event: "input"
    },
    props: {
      config: {
        type: Object,
        default: () => {
          return {};
        },
        require: true
      },
      propData: {
        default: undefined
      },
      handleData: {
        default: undefined
      }
    },
    data() {
      return {
        formData: this.propData,
        golbalConfig: golbalConfig.get(),
        // 保存全局 $loading
        fullLoading: null
      };
    },
    methods: {
      // 提示确认确认框
      /**
       *
       * @param {*} tips 提示文字
       * @param {*} confirmFn 确定执行方法
       * @param {*} catchFn  取消执行方法
       */
      confirm(tips, confirmFn, catchFn, type = "warning") {
        this.$confirm(`${tips}, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: type
        })
          .then(() => {
            if (confirmFn) {
              confirmFn();
            }
          })
          .catch(() => {
            if (catchFn) {
              catchFn();
            }
            // this.$message({
            //   type: "info",
            //   message: "已取消删除"
            // });
          });
      },
      /**
       *
       * @param {*} obj.loadingText  文字
       * @param {*} obj.spinner   icon
       * @param {*} obj.target  loading的主体 默认 body  self.$refs.myTables.$el
       */
      loading(obj = {}) {
        var self = this;
        // loadingText = "加载中...",
        // spinner = "el-icon-loading",
        // target = document.body
        this.fullLoading = this.$loading({
          lock: self.computeBoolen(obj.lock, true),
          text: obj.loadingText || "加载中...",
          spinner: obj.spinner || "el-icon-loading",
          target: obj.target || document.body,
          background: obj.background || null
        });
      },
      // 关闭加载中样式
      /**
       *
       * @param {*} loading  传入需要关闭的loading主体
       */
      loadingClose(loading = this.fullLoading) {
        loading.close();
      },
      /**
       * 计算出布尔值，并且可以配置默认值
       */
      /**
       *
       * @param {*} value  boolean/function
       * @param {*} defaultValue 自定义默认值
       * @returns    默认false;
       */
      computeBoolen(value, defaultValue) {
        if (this.isBoolen(value)) return value;
        if (this.isEmpty(value)) {
          if (defaultValue) {
            return defaultValue;
          } else {
            return false;
          }
        }
        if (this.isFunction(value)) {
          // console.log(8888888888888);
          return value(this.propData, this.handleData);
        }
        return true;
      },
      /**
       *判断为空 null undefined
       * @param {*} value
       * @returns
       */
      isEmpty(value) {
        if (
          value === "null" ||
          value == null ||
          value === "undefined" ||
          value === undefined ||
          value === ""
        ) {
          return true;
        } else {
          return false;
        }
      },
      /**
       * 判断是否是 boolean
       */
      isBoolen(value) {
        return typeof value === "boolean";
      },
      /**
       * 判断是否是Function
       * @param {*} value
       */
      isFunction(value) {
        return typeof value === "function";
      },
      /**
       * 判断是否是 对象
       */
      isObject(value) {
        return typeof value === "object";
      },
      // 默认事件
      /**
       *
       * @param {*} fun  配置的事件方法
       * @param  {...any} data 系统默认的参数
       * @returns
       */
      computeFunction(fun, ...data) {
        if (fun) {
          if (typeof fun === "string") {
            //方法名配置字符串时，触发回调函数
            // console.log("...data", ...data);
            this.$emit("watchCallBackFunItem", {
              name: fun,
              defaultCallBackData: [...data]
            });
          } else if (typeof fun === "function") {
            // 配置成方法时 直接触发 handleData  为组件props 的handleData
            fun(...data, this.handleData);
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      //默认输入框input 事件 动态过滤特殊字符 校验手机或者邮箱 金额或者数字
      /**
       *
       * @param {*} e 默认事件值
       * @param {*} valueType 配置的valueType值
       * @param {*} fn 配置的input事件
       * @returns
       */
      defaultInput(e, valueType, fn) {
        // console.log("defaultFocus", e, valueType, this.formData);
        if (this.formData) {
          let newFormData = filterStr(this.formData, true);
          //输入框内容是
          if (["money", "number"].includes(valueType)) {
            // 过滤特殊字符的同时限制只能输入数字

            if (this.formData !== newFormData) {
              this.formData = filterStr(this.formData, true);
            }
            if (fn) {
              //有input事件就执行回调
              this.computeFunction(fn, this.formData);
              return;
            }
          } else if (valueType == "phone") {
            // 校验电话号码 暂时预留
            // console.log("checkPhone", checkPhone(this.formData));
          } else if (valueType == "email") {
            // 校验邮箱 暂时预留
          } else {
            // 过滤特殊字符
            if (this.formData !== newFormData) {
              this.formData = filterStr(this.formData);
            }
          }
        }
        if (fn) {
          this.computeFunction(fn, e);
        }
      }
    },
    watch: {
      formData: {
        handler(val) {
          // console.log("更新22", val, oldVal);
          // val = filterStr(val);
          // this.formData = val;

          this.$emit("input", val);
          this.$emit("change", val);
        },
        deep: true
      },
      propData: {
        handler(val) {
          // val = filterStr(val);
          // console.log("propData", val);
          this.formData = val;
        },
        deep: true
      }
    }
  };
}
