<!--
 * @Author: your name
 * @Date: 2021-07-15 13:54:12
 * @LastEditTime: 2021-08-07 23:39:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xInputNumber.vue
-->
<template>
  <el-input-number
    :style="computedConfig.style"
    v-model="formData"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :step="computedConfig.step"
    :step-strictly="computedConfig.stepStrictly"
    :precision="computedConfig.precision"
    :size="computedConfig.size"
    :disabled="computeBoolen(computedConfig.disabled)"
    :controls="computedConfig.controls"
    :controls-position="computedConfig.controlsPosition"
    :name="computedConfig.name"
    :label="computedConfig.label"
    :placeholde="computedConfig.placeholde"
    @change="
      (currentValue, oldValue) =>
        computeFunction(computedConfig.change, currentValue, oldValue)
    "
    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myInputNumber",
  mixins: [mixinComponent()],
  data() {
    return {
      // formData: ""
      // value: this.value
    };
  },
  computed: {
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.inputNumber();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
