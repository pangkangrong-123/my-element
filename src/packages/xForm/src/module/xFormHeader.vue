<!--
 * @Author: your name
 * @Date: 2021-07-21 09:56:31
 * @LastEditTime: 2021-08-09 10:55:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\xForm\xFormHeader.vue
-->
<!--  -->
<template>
  <div class="fix_header_title" v-if="headerConfig && headerConfig.show">
    <el-row>
      <el-col
        v-for="(item, key) in headerConfig.list"
        :key="key"
        :span="item.span || 8"
        :offset="item.offset || 0"
        :push="item.push || 0"
        :pull="item.pull || 0"
      >
        <el-row v-if="item.show" type="flex" :justify="item.justify">
          <el-col :style="{ textAlign: item.justify }">
            <template v-for="(tool, tKey) in item.list">
              <component
                v-if="tool.show"
                :key="tKey"
                :is="getComponentType(tool)"
                v-model="formData[tool.model]"
                :propData="formData[tool.model]"
                :config="tool"
                @watchCallBackFunItem="watchCallBackFun"
              >
              </component>
              <!-- <xButton v-if="tool.type == 'button' && tool.show"></xButton> -->
              <!-- <el-button
                v-if="tool.type == 'button' && tool.show"
                :disabled="tool.disabled"
                :key="tKey"
                :plain="tool.plain"
                :round="tool.round"
                :circle="tool.circle"
                :icon="tool.icon"
                size="small"
                :type="tool.styleType"
                @click="handlerClick(tool.clickName, formData, tool.checkRule)"
                >{{ tool.label }}</el-button
              > -->
              <h2
                :style="{ margin: 0, fontWeight: 900 }"
                v-if="tool.xType == 'text' && tool.show"
                :key="tKey"
              >
                {{ tool.label }}
              </h2>
            </template>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <h2 class="header_title">
        {{ title }}

        <div class="right">
          <el-button
            v-if="headRight && headRight.show"
            class="right"
            size="small"
            @click="handlerClick(headRight.clickName)"
            >{{ headRight.title }}</el-button
          >
        </div>
      </h2> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import MyButton from "../../../xButton/src/xButton.vue";
import mixinComponent from "../../../utils/xElementJs/xMixin.js";
import { getComponentType } from "../../../utils/xElementJs/defaultFunction";

export default {
  //import引入的组件需要注入到对象中才能使用
  mixins: [mixinComponent()],
  props: {
    headerConfig: {
      type: Object,
      default: Object
    }
  },
  components: { MyButton },
  data() {
    //这里存放数据
    return {
      formData: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取动态组件类型
    getComponentType: getComponentType,
    // 数据回调
    watchCallBackFun(obj) {
      this.$emit("watchCallBackFun", { ...obj, list: this.formData });
      // console.log("数据回调", { ...obj, list: this.formData });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
