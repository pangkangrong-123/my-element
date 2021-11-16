/*
 * @Author: your name
 * @Date: 2021-08-03 12:44:17
 * @LastEditTime: 2021-08-03 12:44:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xTable\js\filterDic.js
 */
export function filterDic(dic, value) {
  let labelName = "label";
  let valueName = "value";
  if (dic.data || dic.label || dic.value) {
    if (dic.label) labelName = dic.label;
    if (dic.value) valueName = dic.value;
    dic = dic.data;
  }
  if (dic) {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i][valueName] === value) return dic[i][labelName];
    }
  }
  return "";
}
