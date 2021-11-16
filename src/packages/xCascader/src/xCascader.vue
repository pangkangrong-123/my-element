<!--
 * @Author: your name
 * @Date: 2021-07-15 11:12:25
 * @LastEditTime: 2021-10-20 12:51:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xCascader.vue
-->
<template>
  <el-cascader
    ref="xCascader"
    :style="computedConfig.style"
    v-model="formData"
    :options="computedConfig.options"
    :props="computedConfig.props"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :disabled="computeBoolen(computedConfig.disabled)"
    :clearable="computedConfig.clearable"
    :show-all-levels="computedConfig.showAllLevels"
    :collapse-tags="computedConfig.collapseTags"
    :separator="computedConfig.separator"
    :filterable="computedConfig.filterable"
    :filter-method="computedConfig.filterMethod"
    :debounce="computedConfig.debounce"
    :before-filter="computedConfig.beforeFilter"
    :popper-class="computedConfig.popperClass"
    @change="e => computeFunction(computedConfig.change, e)"
    @expand-change="e => computeFunction(computedConfig.expandChange, e)"
    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
    @visible-change="e => computeFunction(computedConfig.visibleChange, e)"
    @remove-tag="e => computeFunction(computedConfig.removeTag, e)"
  />
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myCascader",
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
      const c = this.golbalConfig.cascader();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
