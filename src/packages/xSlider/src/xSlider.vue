<!--
 * @Author: your name
 * @Date: 2021-07-15 14:40:33
 * @LastEditTime: 2021-08-07 23:40:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xSlider.vue
-->
<template>
  <el-slider
    :style="computedConfig.style"
    v-model="formData"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :disabled="computeBoolen(computedConfig.disabled)"
    :step="computedConfig.step"
    :range="computedConfig.range"
    :vertical="computedConfig.vertical"
    :height="computedConfig.height"
    :label="computedConfig.label"
    :debounce="computedConfig.debounce"
    :marks="computedConfig.marks"
    :tooltip-class="computedConfig.tooltipClass"
    :show-input="computedConfig.showInput"
    :show-input-controls="computedConfig.showInputControls"
    :input-size="computedConfig.inputSize"
    :show-stops="computedConfig.showStops"
    :show-tooltip="computedConfig.showTooltip"
    :format-tooltip="computedConfig.formatTooltip"
    @change="e => computeFunction(computedConfig.change, e)"
    @input="e => computeFunction(computedConfig.input, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";

import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "mySlider",
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
      const c = this.golbalConfig.slider();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
