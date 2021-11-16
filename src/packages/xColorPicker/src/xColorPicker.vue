<!--
 * @Author: your name
 * @Date: 2021-07-15 13:43:09
 * @LastEditTime: 2021-08-07 23:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xColorPicker.vue
-->
<template>
  <el-color-picker
    :style="computedConfig.style"
    v-model="formData"
    :disabled="computeBoolen(computedConfig.disabled)"
    :size="computedConfig.size"
    :predefine="computedConfig.predefine"
    :show-alpha="computedConfig.showAlpha"
    :color-format="computedConfig.colorFormat"
    :popper-class="computedConfig.popperClass"
    @change="e => computeFunction(computedConfig.change, e)"
    @active-change="e => computeFunction(computedConfig.activeChange, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myColorPicker",
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
      const c = this.golbalConfig.colorPicker();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
