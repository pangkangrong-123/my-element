<!--
 * @Author: your name
 * @Date: 2021-07-15 14:47:50
 * @LastEditTime: 2021-09-01 18:50:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xTimePicker.vue
-->
<template>
  <el-time-picker
    :style="computedConfig.style"
    v-model="formData"
    :readonly="computedConfig.readonly"
    :disabled="computeBoolen(computedConfig.disabled)"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :align="computedConfig.align"
    :name="computedConfig.name"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :is-range="computedConfig.isRange"
    :arrow-control="computedConfig.arrowControl"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedPickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :value-format="computedConfig.valueFormat"
    :default-value="computedConfig.defaultValue"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"
    :selectable-range="computedConfig.selectableRange"
    :format="computedConfig.format"
    @change="e => computeFunction(computedConfig.change, e)"
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
  name: "myTimePicker",
  mixins: [mixinComponent()],
  data() {
    return {
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
      const c = this.golbalConfig.timePicker();
      merge(c, this.config);
      return c;
    },
    computedPickerOptions() {
      if (this.computedConfig.pickerOptions) {
        if (this.isObject(this.computedConfig.pickerOptions)) {
          return this.computedConfig.pickerOptions;
        }

        if (this.isFunction(this.computedConfig.pickerOptions)) {
          return this.computedConfig.pickerOptions(this.formData);
        }
      }

      return null;
    }
  }
};
</script>
