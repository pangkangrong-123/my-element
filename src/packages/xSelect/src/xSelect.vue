<!--
 * @Author: your name
 * @Date: 2021-07-14 16:13:02
 * @LastEditTime: 2021-10-22 09:56:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xSelect.vue
-->
<template>
  <el-select
    :style="computedConfig.style"
    v-model="formData"
    :multiple="computedConfig.multiple"
    :disabled="computeBoolen(computedConfig.disabled)"
    :value-key="computedConfig.valueKey"
    :size="computedConfig.size"
    :clearable="computedConfig.clearable"
    :collapse-tags="computedConfig.collapseTags"
    :multiple-limit="computedConfig.multipleLimit"
    :name="computedConfig.name"
    :autocomplete="computedConfig.autocomplete"
    :placeholder="computedConfig.placeholder"
    :filterable="computedConfig.filterable"
    :allow-create="computedConfig.allowCreate"
    :filter-method="computedConfig.filterMethod"
    :remote="computedConfig.remote"
    :remote-method="computedConfig.remoteMethod"
    :loading="computedConfig.loading"
    :loading-text="computedConfig.loadingText"
    :no-match-text="computedConfig.noMatchText"
    :no-data-text="computedConfig.noDataText"
    :popper-class="computedConfig.popperClass"
    :reserve-keyword="computedConfig.reserveKeyword"
    :default-first-option="computedConfig.defaultFirstOption"
    :popper-append-to-body="computedConfig.popperAppendToBody"
    :automatic-dropdown="computedConfig.automaticDropdown"
    @change="data => computeFunction(computedConfig.change, data)"
    @visible-change="
      data => computeFunction(computedConfig.visibleChange, data)
    "
    @remove-tag="data => computeFunction(computedConfig.removeTag, data)"
    @clear="data => computeFunction(computedConfig.clear, data)"
    @blur="data => computeFunction(computedConfig.blur, data)"
    @focus="data => computeFunction(computedConfig.focus, data)"
  >
    <el-option
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item[labelName]"
      :value="
        computedConfig.valueType && computedConfig.valueType == 'object'
          ? item
          : item[valueName]
      "
    />
  </el-select>
</template>

<script>
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "mySelect",
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
          : "value"
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
        return dic(this.formData, this.handleData);
      } else if (dic.data && typeof dic.data === "function") {
        return dic.data(this.formData, this.handleData);
      }
      return undefined;
    },
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.select();
      merge(c, this.config);
      return c;
    }
  }
};
</script>
