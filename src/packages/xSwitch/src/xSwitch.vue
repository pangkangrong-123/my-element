<!--
 * @Author: your name
 * @Date: 2021-07-15 14:44:43
 * @LastEditTime: 2021-08-07 23:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xSwitch.vue
-->
<template>
  <el-switch
    v-model="formData"
    :disabled="computeBoolen(computedConfig.disabled)"
    :width="computedConfig.width"
    :style="computedConfig.style"
    :active-icon-class="computedConfig.activeIconClass"
    :inactive-icon-class="computedConfig.inactiveIconClass"
    :active-text="computedConfig.activeText"
    :inactive-text="computedConfig.inactiveText"
    :active-value="computedConfig.activeValue"
    :inactive-value="computedConfig.inactiveValue"
    :active-color="computedConfig.activeColor"
    :inactive-color="computedConfig.inactiveColor"
    :name="computedConfig.name"
    :validate-event="computedConfig.validateEvent"
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
  name: "mySwitch",
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
      const c = this.golbalConfig.switch();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
