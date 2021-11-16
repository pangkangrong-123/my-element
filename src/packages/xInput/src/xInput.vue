<!--
 * @Author: your name
 * @Date: 2021-07-12 10:04:12
 * @LastEditTime: 2021-10-15 15:21:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\common\src\xInput.vue
-->
<!--  -->
<template>
  <el-input
    ref="xInput"
    :class="{ 'clear-number-input': computedConfig.type == 'number' }"
    v-model="formData"
    :type="computedConfig.type"
    :style="computedConfig.style"
    :value="computedConfig.value"
    :maxlength="computedConfig.maxlength"
    :minlength="computedConfig.minlength"
    :show-word-limit="computedConfig.showWordLimit"
    :placeholder="computedConfig.placeholder"
    :clearable="computedConfig.clearable"
    :show-password="computedConfig.showPassword"
    :disabled="computeBoolen(computedConfig.disabled)"
    :size="computedConfig.size"
    :prefix-icon="computedConfig.prefixIcon"
    :suffix-icon="computedConfig.suffixIcon"
    :rows="computedConfig.rows"
    :autosize="computedConfig.autosize"
    :autocomplete="computedConfig.autocomplete"
    :auto-complete="computedConfig.autoComplete"
    :name="computedConfig.name"
    :readonly="computedConfig.readonly"
    :max="computedConfig.max"
    :min="computedConfig.min"
    :step="computedConfig.step"
    :resize="computedConfig.resize"
    :autofocus="computedConfig.autofocus"
    :form="computedConfig.form"
    :label="computedConfig.label"
    :tabindex="computedConfig.tabindex"
    @blur="
      e =>
        computedConfig.valueType
          ? defaultBlur(e, computedConfig.valueType, computedConfig.blur)
          : computeFunction(computedConfig.blur, e)
    "
    @focus="
      e =>
        computedConfig.valueType
          ? defaultFocus(e, computedConfig.valueType, computedConfig.focus)
          : computeFunction(computedConfig.focus, e)
    "
    @change="
      e =>
        computedConfig.valueType
          ? defaultChange(e, computedConfig.valueType, computedConfig.change)
          : computeFunction(computedConfig.change, e)
    "
    @input="
      e => defaultInput(e, computedConfig.valueType, computedConfig.input)
    "
    @clear="e => computeFunction(computedConfig.clear, e)"
  >
    <i v-if="computedConfig.slotsuffix" slot="suffix" class="el-input__icon">{{
      computedConfig.slotsuffix
    }}</i>
    <i v-if="computedConfig.slotprefix" slot="prefix" class="el-input__icon">{{
      computedConfig.slotprefix
    }}</i>
    <!-- slot  -->
    <!-- 左边插槽 -->
    <template slot="prepend" v-if="typeof computedConfig.prepend == 'string'">
      <slot :name="computedConfig.prepend" :row="computedConfig" />
    </template>
    <!-- 右边插槽 -->
    <template slot="append" v-if="typeof computedConfig.append == 'string'">
      <slot :name="computedConfig.append" :row="computedConfig" />
    </template>
    <el-button
      v-if="computedConfig.rightButton"
      slot="append"
      icon="el-icon-search"
      @click="e => computeFunction(computedConfig.click, e, formData)"
    ></el-button>
  </el-input>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import mixinComponent from "../js/xMixin.js";
// import {
//   merge,
//   comdify,
//   delcommafy,
//   filterStr
// } from "../js/defaultFunction.js";

import mixinComponent from "../../utils/xElementJs/xMixin.js";
import {
  merge,
  comdify,
  delcommafy,
  filterStr
} from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myInput",
  //import引入的组件需要注入到对象中才能使用
  mixins: [mixinComponent()],
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      // 自动转化千分符状态  true 可以转 false 不转化
      autoSetComdify: true
    };
  },
  //监听属性 类似于data概念
  computed: {
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      let c = this.golbalConfig.input();
      // console.log("c1", c, merge, this.golbalConfig);
      merge(c, this.config);
      // merge(c,  this.config);
      // console.log("c2", c);
      return c;
    }
  },
  //监控data中的数据变化
  watch: {
    // formData: function(newVal, olaVal) {
    //   console.log("formData", newVal, olaVal);
    // },
    // propData: function(newVal, olaVal) {
    //   console.log("propData", newVal, olaVal);
    // }
  },
  //方法集合
  methods: {
    //默认格式化输入框失去焦点事件
    defaultBlur(e, valueType, fn) {
      if (valueType == "money") {
        //  不自动更新千分符
        this.autoSetComdify = true;
      }
      if (this.formData) {
        if (valueType == "money") {
          // 限制只能金额 添加千分符
          this.formData = comdify(filterStr(this.formData, true));
          // console.log(this.autoSetComdify, this.formData);
        } else if (valueType == "number") {
          this.formData = filterStr(this.formData, true);
        }
      }

      if (fn) {
        this.computeFunction(fn, e);
      }
      // console.log("defaultBlur", e, valueType, this.formData);
    },
    //默认格式化输入框获取焦点事件
    defaultFocus(e, valueType, fn) {
      if (valueType == "money") {
        //  不自动更新千分符
        this.autoSetComdify = false;
      }

      // console.log("defaultFocus", e, valueType, this.formData);
      if (this.formData) {
        if (valueType == "money") {
          // 限制只能金额去除千分符
          // this.$nextTick(() => {
          this.formData = delcommafy(filterStr(this.formData, true));
          // console.log("ppppppp", this.autoSetComdify);
          // });
        }
      }

      if (fn) {
        this.computeFunction(fn, e);
      }
    },
    //默认change事件
    defaultChange(e, valueType, fn) {
      if (this.formData) {
        if (valueType == "phone") {
          // console.log("phone");
        } else if (valueType == "email") {
          // console.log("email");
        }
      }
      if (fn) {
        this.computeFunction(fn, e);
      }
      // console.log(e, valueType, fn);
    },
    resetData() {
      if (
        this.autoSetComdify &&
        this.computedConfig.valueType == "money" &&
        ((typeof this.formData == "string" && !isNaN(Number(this.formData))) ||
          (this.formData != null && !isNaN(this.formData)))
      ) {
        // 限制只能金额 添加千分符
        this.formData = comdify(filterStr(this.formData, true));
        // console.log(" this.autoSetComdify", this.autoSetComdify, this.formData);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.resetData();
    // console.log("创建");
    // setInterval(() => {
    //   this.formData = Math.random();
    // }, 1000);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {
    this.$nextTick(() => {
      // this.resetData();
      if (this.formData && this.computedConfig.valueType == "money") {
        // console.log(
        //   //   this.autoSetComdify,
        //   // this.computedConfig.valueType
        //   this.formData,
        //   this.$refs.xInput.$el.children[0] === document.activeElement
        // );
      }
    });
  }, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
/* @import url(); 引入公共css类 */

/* 设置全局 */
.clear-number-input.el-input::-webkit-outer-spin-button,
.clear-number-input.el-input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}
.clear-number-input.el-input input[type="number"]::-webkit-outer-spin-button,
.clear-number-input.el-input input[type="number"]::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}
.clear-number-input.el-input {
  -moz-appearance: textfield;
}
.clear-number-input.el-input input[type="number"] {
  -moz-appearance: textfield;
}
</style>
