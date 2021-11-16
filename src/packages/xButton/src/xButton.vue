<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-10-18 16:02:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <el-button
    v-debounce
    :size="computedConfig.size"
    :style="computedConfig.style"
    :type="computedConfig.type"
    :plain="computedConfig.plain"
    :round="computedConfig.round"
    :circle="computedConfig.circle"
    :loading="computeBoolen(computedConfig.loading)"
    :disabled="computeBoolen(computedConfig.disabled)"
    :icon="computedConfig.eicon"
    :class="computedConfig.class"
    :autofocus="computedConfig.autofocus"
    :nativeType="computedConfig.nativeType"
    @click="e => computeFunction(computedConfig.click, e)"
  >
    <template v-if="computedConfig.linkType">
      <el-link
        :style="{ position: 'relative', top: '-3px' }"
        :underline="false"
        :type="computedConfig.linkType"
      >
        <i
          v-if="computedConfig.icon"
          :style="{
            display: 'inline-block',
            fontSize: '18px',
            marginRight: '-1px',
            position: 'relative',
            top: '2px',
            ...computedConfig.istyle
          }"
          :class="['iconfont', computedConfig.icon]"
        ></i>
        <span>{{ computedConfigText }}</span>
      </el-link>
    </template>
    <template v-else>
      <i
        v-if="computedConfig.icon"
        :style="{
          display: 'inline-block',
          fontSize: '18px',
          marginRight: '-1px',
          position: 'relative',
          top: '2px',
          ...computedConfig.istyle
        }"
        :class="['iconfont', computedConfig.icon]"
      ></i>
      <span>{{ computedConfigText }}</span>
    </template>
  </el-button>
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myButton",
  mixins: [mixinComponent()],
  directives: {
    debounce: {
      inserted: function(el) {
        let timer;
        el.addEventListener("click", () => {
          // console.log("debounce");
          el.disabled = true;
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            el.disabled = false;
          }, 500);
        });
      }
    }
  },
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
      const c = this.golbalConfig.button();
      merge(c, this.config);
      return c;
    },
    computedConfigText() {
      if (typeof this.computedConfig.text == "string") {
        return this.computedConfig.text;
      } else if (typeof this.computedConfig.text == "function") {
        return this.computedConfig.text(this.handleData);
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
// 主题色按钮 修改主题色

.el-button--info {
  color: #fff;
  background-color: #081f5b;
  border-color: #081f5b;
}
.el-button--info:focus,
.el-button--info:hover {
  background: #394c7c;
  border-color: #394c7c;
  color: #fff;
}
.el-table th {
  z-index: 1;
}
</style>
