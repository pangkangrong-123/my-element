<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-08-07 23:39:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <el-progress
    :percentage="
      computedConfig.percentage
        ? computedConfig.percentage
        : formData != undefined
        ? formData
        : 0
    "
    :type="computedConfig.type"
    :style="computedConfig.style"
    :stroke-width="computedConfig.strokeWidth"
    :text-inside="computedConfig.textInside"
    :status="computedConfig.status"
    :color="computedConfig.color"
    :width="computedConfig.width"
    :show-text="computedConfig.showText"
    :stroke-linecap="computedConfig.strokeLinecap"
    :format="computedConfig.format"
  ></el-progress>
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myProgress",
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
      const c = this.golbalConfig.progress();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
