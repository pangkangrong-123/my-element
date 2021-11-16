<!--
 * @Author: your name
 * @Date: 2021-07-15 10:10:29
 * @LastEditTime: 2021-08-07 23:38:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xAutocomplete.vue
-->
<template>
  <el-autocomplete
    :style="{ width: '100%', ...computedConfig.style }"
    v-model="formData"
    :placeholder="computedConfig.placeholder"
    :disabled="computeBoolen(computedConfig.disabled)"
    :value-key="computedConfig.valueKey || 'id'"
    :value="computedConfig.value"
    :debounce="computedConfig.debounce"
    :placement="computedConfig.placement"
    :fetch-suggestions="computedConfig.fetchSuggestions"
    :popper-class="computedConfig.popperClass"
    :trigger-on-focus="computedConfig.triggerOnFocus"
    :name="computedConfig.name"
    :select-when-unmatched="computedConfig.selectWhenUnmatched"
    :label="computedConfig.label"
    :prefix-icon="computedConfig.prefixIcon"
    :suffix-icon="computedConfig.suffixIcon"
    :hide-loading="computedConfig.hideLoading"
    :popper-append-to-body="computedConfig.popperAppendToBody"
    :highlight-first-item="computedConfig.highlightFirstItem"
    :maxlength="computedConfig.maxlength"
    :minlength="computedConfig.minlength"
    :show-word-limit="computedConfig.showWordLimit"
    :clearable="computedConfig.clearable"
    :show-password="computedConfig.showPassword"
    :size="computedConfig.size"
    :rows="computedConfig.rows"
    :autosize="computedConfig.autosize"
    :autocomplete="computedConfig.autocomplete"
    :auto-complete="computedConfig.autoComplete"
    :readonly="computedConfig.readonly"
    :max="computedConfig.max"
    :min="computedConfig.min"
    :step="computedConfig.step"
    :resize="computedConfig.resize"
    :autofocus="computedConfig.autofocus"
    :form="computedConfig.form"
    :tabindex="computedConfig.tabindex"
    @blur="e => computeFunction(computedConfig.blur, e)"
    @focus="e => computeFunction(computedConfig.focus, e)"
    @change="e => computeFunction(computedConfig.change, e)"
    @input="e => computeFunction(computedConfig.input, e)"
    @clear="e => computeFunction(computedConfig.clear, e)"
    @select="e => computeFunction(computedConfig.select, e)"
  />
</template>

<script>
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myAutocomplete",
  mixins: [mixinComponent()],
  data() {
    return {
      // value: this.value
    };
  },
  computed: {
    computedConfig() {
      // console.log(
      //   "VUE_ELEMENT_COMPONENT_CONFIG_MODE",
      //   process.env.VUE_APP_COMPONENT_CONFIG_MODE
      // );
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.input();
      merge(c, this.config);
      return c;
    }
  },
  methods: {
    // handleChange(value) {
    //   console.log("value", value);
    // }
  }
};
</script>
