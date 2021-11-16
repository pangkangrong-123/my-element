<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-08-07 23:41:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <span :style="computedConfig.style">
    <el-tag
      v-for="(item, key) in getDic"
      :key="key"
      :type="item[typeName]"
      :closable="computeBoolen(computedConfig.closable)"
      :disableTransitions="computedConfig.disableTransitions"
      :hit="computedConfig.hit"
      :color="computedConfig.color"
      :size="computedConfig.size"
      :effect="computedConfig.effect"
      @click="computeFunction(computedConfig.click, item)"
      @close="computeFunction(computedConfig.close, item)"
    >
      {{ item[labelName] }}
    </el-tag>
  </span>
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";

import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myTag",
  mixins: [mixinComponent()],
  data() {
    const _this = this;
    return {
      labelName:
        _this.config.dic && _this.config.dic.label
          ? _this.config.dic.label
          : "label",
      typeName:
        _this.config.dic && _this.config.dic.type
          ? _this.config.dic.type
          : "type"
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
      const c = this.golbalConfig.tag();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
