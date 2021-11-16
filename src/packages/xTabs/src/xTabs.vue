<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-08-07 23:41:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <el-tabs
    v-model="formData"
    :type="computedConfig.type"
    :style="computedConfig.style"
    :closable="computedConfig.closable"
    :addable="computedConfig.addable"
    :editable="computedConfig.editable"
    :tab-position="computedConfig.tabPosition"
    :stretch="computedConfig.stretch"
    @tab-click="a => computeFunction(computedConfig.tabClick, a)"
    @tab-remove="a => computeFunction(computedConfig.tabRemove, a)"
    @tab-add="() => computeFunction(computedConfig.tabAdd)"
    @edit="(a, b) => computeFunction(computedConfig.edit, a, b)"
  >
    <template v-for="(item, itemIndex) in getDic">
      <el-tab-pane
        v-if="computeBoolen(item.show, true)"
        :key="itemIndex"
        :label="item[labelName]"
        :name="item[valueName]"
        :disabled="computeBoolen(item.disabled)"
        :closable="computeBoolen(item.closable)"
        :lazy="computeBoolen(item.lazy)"
      >
        <!-- slot 传递 tabs卡片使用自定义插槽切换 -->
        <template v-if="item.slot">
          <slot :name="item.slot" :row="item" />
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";

import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myTabs",
  mixins: [mixinComponent()],
  data() {
    const _this = this;
    return {
      labelName:
        _this.config.dic && _this.config.dic.label
          ? _this.config.dic.label
          : "label",
      valueName:
        _this.config.dic && _this.config.dic.value
          ? _this.config.dic.value
          : "name"
    };
  },
  computed: {
    getDic() {
      const dic = this.config.dic;
      if (dic instanceof Array) {
        return dic;
      } else if (dic.data instanceof Array) {
        return dic.data;
      } else if (typeof dic === "function") {
        return dic(this.formData);
      } else if (dic.data && typeof dic.data === "function") {
        return dic.data(this.formData);
      }
      return undefined;
    },
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.tabs();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
