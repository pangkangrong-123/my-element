/*
 * @Author: your name
 * @Date: 2021-07-12 10:13:24
 * @LastEditTime: 2021-10-14 10:35:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\common\js\defaultFunction.js
 */
//合并对象方法
export function merge(target) {
  // console.log("target11", Object.keys(target).length);
  // console.time(11);
  // console.log("arguments.length", arguments.length);
  /* */
  for (let i = 1, j = arguments.length; i < j; i++) {
    // console.log({ name: 2222 }.hasOwnProperty.call("name"));
    let source = arguments[i] || {};
    for (let prop in source) {
      // source.hasOwnProperty(prop) 3  禁止此方法
      // 替换成 Object.prototype.hasOwnProperty.call(source,prop)
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  // console.timeEnd(11);
  // console.log("target22", target);
  return target;
}

// 获取动态组件类型
export function getComponentType(configItem) {
  // console.time("获取动态组件类型");
  const xType = configItem.xType;
  // const type = configItem.type;
  const typeObj = {
    slot: "slot",
    cascader: "MyCascader",
    checkbox: "MyCheckbox",
    colorPicker: "MyColorPicker",
    datePicker: "MyDatePicker",
    input: "MyInput",
    autocomplete: "MyAutocomplete",
    inputNumber: "MyInputNumber",
    radio: "MyRadio",
    rate: "MyRate",
    select: "MySelect",
    selecttree: "MySelectTree",
    slider: "MySlider",
    switch: "MySwitch",
    timePicker: "MyTimePicker",
    timeSelect: "MyTimeSelect",
    transfer: "MyTransfer",
    tree: "MyTree",
    progress: "MyProgress",
    upload: "MyUpload",
    button: "MyButton",
    tabs: "MyTabs",
    tag: "MyTag"
  };
  return typeObj[xType];
  // if (xType === "slot") {
  //   return "slot";
  // } else if (xType === "cascader") {
  //   return "MyCascader";
  // } else if (xType === "checkbox") {
  //   return "MyCheckbox";
  // } else if (xType === "colorPicker") {
  //   return "MyColorPicker";
  // } else if (xType === "datePicker") {
  //   return "MyDatePicker";
  // } else if (xType === "input") {
  //   return "MyInput";
  // } else if (xType === "autocomplete") {
  //   return "MyAutocomplete";
  // } else if (xType === "inputNumber") {
  //   return "MyInputNumber";
  // } else if (xType === "radio") {
  //   return "MyRadio";
  // } else if (xType === "rate") {
  //   return "MyRate";
  // } else if (xType === "select") {
  //   if (type === "selecttree") {
  //     return "MySelectTree";
  //   }
  //   return "MySelect";
  // } else if (type === "selecttree") {
  //   return "MySelectTree";
  // } else if (xType === "slider") {
  //   return "MySlider";
  // } else if (xType === "switch") {
  //   return "MySwitch";
  // } else if (xType === "timePicker") {
  //   return "MyTimePicker";
  // } else if (xType === "timeSelect") {
  //   return "MyTimeSelect";
  // } else if (xType === "transfer") {
  //   return "MyTransfer";
  // } else if (xType === "tree") {
  //   return "MyTree";
  // } else if (xType === "progress") {
  //   return "MyProgress";
  // } else if (xType === "upload") {
  //   return "MyUpload";
  // } else if (xType === "button") {
  //   return "MyButton";
  // } else if (xType === "tabs") {
  //   return "MyTabs";
  // } else if (xType === "tag") {
  //   return "MyTag";
  // }
}
// 金额添加千分位
export function comdify(n) {
  if (!n) return n;
  if (typeof n == "number") {
    n += "";
  } else if (!Number(n)) {
    return n;
  }

  let str = n.split(".");
  let re = /\d{1,3}(?=(\d{3})+$)/g;
  let n1 = str[0].replace(re, "$&,");
  // console.log("str");
  // console.log("str.length", str.length);
  return str.length > 1 && str[1]
    ? `${n1}.${str[1] && str[1].length == 1 ? str[1] + "0" : str[1]}`
    : `${n1}.00`;
}
//去除千分位中的","
export function delcommafy(num) {
  if (!num) return num;
  num = num.toString();
  num = num.replace(/,/gi, "");
  // if (!isNaN(num)) {
  return Number(num);
  // }
}
// 过滤特殊字符
/**
 *
 * @param {*} str  传入的字符串
 * @param {*} number 是否只能输入数字
 * @returns
 */
export function filterStr(str, number = false) {
  if (!str) {
    return;
  }
  let putStr = str;
  if (typeof str == "number") {
    putStr += "";
  }
  // console.log("putStr111", putStr);
  // 临时去掉
  // putStr = putStr.replace(/[`~!^&':;']/gi, "");
  // console.log("putStr2221", putStr);
  // 只能输入数字
  if (number) {
    //得到第一个字符是否为负号
    var t = putStr.charAt(0);
    //先把非数字的都替换掉，除了数字和.
    putStr = putStr.replace(/[^\d.]/g, "");
    //必须保证第一个为数字而不是.
    putStr = putStr.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    putStr = putStr.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    putStr = putStr
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    //如果第一位是负号，则允许添加
    if (t == "-") {
      putStr = "-" + putStr;
    }
  }
  return putStr;
  // console.log("$filterRegExp", this.$filterRegExp, str, number, model);
}
/**
 *
 * @param {*} fileByte  number 文件大小  返回字符串的文件大小
 * @returns
 */
export function getFileSize(fileByte) {
  if (!fileByte || typeof fileByte != "number") {
    return "";
  }
  var fileSizeByte = fileByte;
  var fileSizeMsg = "";
  if (fileSizeByte < 1048576)
    fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
  else if (fileSizeByte === 1048576) fileSizeMsg = "1MB";
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
    fileSizeMsg = "1GB";
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  else fileSizeMsg = "文件超过1TB";
  return fileSizeMsg;
}

//判断样式是否存在
export function hasClass(ele, cls) {
  return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}
//删除指定dom元素的样式
function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
//如果存在(不存在)，就删除(添加)一个样式
export function toggleClass(ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls);
  } else {
    addClass(ele, cls);
  }
}

// 校验电话号码
export function checkPhone(mobile) {
  console.log(mobile, "++++", mobile.length);
  var tel = /^0\d{2,3}-?\d{7,8}$/;
  var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (mobile.length == 11) {
    //手机号码
    if (phone.test(mobile)) {
      // console.log(mobile);
      return true;
    }
  } else if (
    (mobile.length == 13 || mobile.length == 12) &&
    mobile.indexOf("-") != -1
  ) {
    //电话号码
    if (tel.test(mobile)) {
      // console.log(mobile);
      return true;
    }
  }
  // return false;
  // console.log("请输入有效的号码！");
}
