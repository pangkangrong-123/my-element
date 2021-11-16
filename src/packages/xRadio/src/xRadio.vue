<!--
 * @Author: your name
 * @Date: 2021-07-15 14:09:33
 * @LastEditTime: 2021-08-07 23:40:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRadio.vue
-->
<template>
  <el-radio-group
    :style="computedConfig.style"
    v-model="formData"
    :disabled="computeBoolen(computedConfig.disabled)"
    :size="computedConfig.size"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="data => computeFunction(computedConfig.change, data)"
  >
    <el-radio
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item[valueName]"
      :border="computedConfig.border"
      >{{ item[labelName] }}</el-radio
    >
  </el-radio-group>
</template>

<script>
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myRadio",
  mixins: [mixinComponent()],
  data() {
    const _this = this;
    return {
      labelName:
        _this.config.dic && _this.config.dic.label
          ? _this.config.dic.label
          : "label",
      valueName:
        _this.config.dic && _this.config.dic.value
          ? _this.config.dic.value
          : "value"
    };
  },
  computed: {
    getDic() {
      const dic = this.config.dic;
      if (dic instanceof Array) {
        return dic;
      } else if (dic.data instanceof Array) {
        return dic.data;
      } else if (typeof dic === "function") {
        return dic(this.formData);
      } else if (dic.data && typeof dic.data === "function") {
        return dic.data(this.formData);
      }
      return undefined;
    },
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.radio();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-checkbox__inner {
  border-radius: 50%;
}
</style>
