<!--
 * @Author: your name
 * @Date: 2021-07-14 18:12:02
 * @LastEditTime: 2021-08-07 23:39:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xDatePicker.vue
-->
<template>
  <el-date-picker
    :style="computedConfig.style"
    v-model="formData"
    :readonly="computedConfig.readonly"
    :disabled="computeBoolen(computedConfig.disabled)"
    :editable="computedConfig.editable"
    :clearable="computedConfig.clearable"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :start-placeholder="computedConfig.startPlaceholder"
    :end-placeholder="computedConfig.endPlaceholder"
    :type="computedConfig.type"
    :format="computedConfig.format"
    :align="computedConfig.align"
    :popper-class="computedConfig.popperClass"
    :picker-options="computedPickerOptions"
    :range-separator="computedConfig.rangeSeparator"
    :default-value="computedConfig.defaultValue"
    :default-time="computedConfig.defaultTime"
    :value-format="computedConfig.valueFormat"
    :name="computedConfig.name"
    :unlink-panels="computedConfig.unlinkPanels"
    :prefix-icon="computedConfig.prefixIcon"
    :clear-icon="computedConfig.clearIcon"
    :validate-event="computedConfig.validateEvent"
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
  name: "myDatePicker",
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
      const c = this.golbalConfig.datePicker();
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
