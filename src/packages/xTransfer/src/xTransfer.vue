<!--
 * @Author: your name
 * @Date: 2021-07-15 15:01:04
 * @LastEditTime: 2021-08-07 23:41:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xTransfer.vue
-->
<template>
  <el-transfer
    v-model="formData"
    :data="computedConfig.data"
    :filterable="computedConfig.filterable"
    :style="computedConfig.style"
    :titles="computedConfig.titles"
    :format="computedConfig.format"
    :props="computedConfig.props"
    :filter-placeholder="computedConfig.filterPlaceholder"
    :filter-method="computedConfig.filterMethod"
    :target-order="computedConfig.targetOrder"
    :button-texts="computedConfig.buttonTexts"
    :render-content="computedConfig.renderContent"
    :left-default-checked="computedConfig.leftDefaultChecked"
    :right-default-checked="computedConfig.rightDefaultChecked"
    @change="(a, b, c) => computeFunction(computedConfig.change, a, b, c)"
    @left-check-change="(a, b) => computeFunction(computedConfig.blur, a, b)"
    @right-check-change="(a, b) => computeFunction(computedConfig.blur, a, b)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myTransfer",
  mixins: [mixinComponent()],
  data() {
    return {
      // formData: []
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
      const c = this.golbalConfig.transfer();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
