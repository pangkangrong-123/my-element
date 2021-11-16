<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-08-07 23:40:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <el-rate
    :style="computedConfig.style"
    v-model="formData"
    :max="computedConfig.max"
    :disabled="computeBoolen(computedConfig.disabled)"
    :texts="computedConfig.texts"
    :colors="computedConfig.colors"
    :allow-half="computedConfig.allowHalf"
    :low-threshold="computedConfig.lowThreshold"
    :high-threshold="computedConfig.highThreshold"
    :void-color="computedConfig.voidColor"
    :icon-classes="computedConfig.iconClasses"
    :show-text="computedConfig.showText"
    :show-score="computedConfig.showScore"
    :text-color="computedConfig.textColor"
    :score-template="computedConfig.scoreTemplate"
    :disabled-void-color="computedConfig.disabledVoidColor"
    :void-icon-class="computedConfig.voidIconClass"
    :disabled-void-icon-class="computedConfig.disabledVoidIconClass"
    @change="e => computeFunction(computedConfig.change, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myRate",
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
      const c = this.golbalConfig.rate();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
