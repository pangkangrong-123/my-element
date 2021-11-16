<!--
 * @Author: your name
 * @Date: 2021-07-15 11:30:42
 * @LastEditTime: 2021-08-07 23:38:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xCheckbox.vue
-->
<template>
  <el-checkbox-group
    :style="computedConfig.style"
    v-model="formData"
    :size="computedConfig.size"
    :disabled="computeBoolen(computedConfig.disabled)"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="data => computeFunction(computedConfig.change, data)"
  >
    <el-checkbox
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :label="item[valueName]"
      :true-label="item.trueLabel"
      :false-label="item.falseLabel"
      :disabled="computeBoolen(item.disabled)"
      :border="computedConfig.border"
      :checked="item.checked"
      :indeterminate="item.indeterminate"
      >{{ item[labelName] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myCheckbox",
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
      const c = this.golbalConfig.checkbox();
      merge(c, this.config);
      return c;
    }
  },
  created() {
    // console.log("computedConfig", this.formData);
    if (!this.formData) {
      this.formData = [];
    }
    // console.log("computedConfig11", this.formData);
  }
};
</script>
<style scoped lang="less">
/deep/.el-checkbox__inner {
  border-radius: 50%;
}
</style>
