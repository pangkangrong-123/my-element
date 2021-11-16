<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-08-25 16:15:16
 * @LastEditors: auth
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <div :class="computedConfig.class" :style="computedConfig.style">
    <banner
      v-if="isObject(computedConfig.headerDate)"
      :header-date="computedConfig.headerDate"
      @watchCallback="watchCallBackFun"
    >
    </banner>
    <el-row :gutter="computedConfig.config.gutter || 12">
      <el-col
        v-if="
          computeBoolen(
            computedConfig.xTree ? computedConfig.xTree.show : undefined,
            true
          )
        "
        :span="computedConfig.config.leftSpan || 4"
      >
        <div class="divBox">
          <!-- 项目类型搜索 -->
          <xInput
            v-if="
              computeBoolen(
                computedConfig.xInput ? computedConfig.xInput.show : undefined,
                true
              )
            "
            v-model="computedConfig.form[computedConfig.xInput.model]"
            :propData="computedConfig.form[computedConfig.xInput.model]"
            :config="computedConfig.xInput"
          >
          </xInput>
          <!-- 项目类型树节点 -->
          <div :class="['treeBox', computedConfig.xTree]">
            <xTree ref="tree" :config="computedConfig.xTree"></xTree>
          </div>
        </div>
      </el-col>
      <el-col
        v-if="
          computeBoolen(
            computedConfig.xTable ? computedConfig.xTable.show : undefined,
            true
          )
        "
        ref="myTables"
        :span="computedConfig.config.rightSpan || 20"
      >
        <!--  列表-->
        <xTable
          :data="computedConfig.xTable.data"
          :page="computedConfig.xTable.page"
          :config="computedConfig.xTable.config"
          :load="computedConfig.xTable.load"
        ></xTable>
      </el-col>
    </el-row>
  </div>
  <!-- <component :is="name"></component> -->
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import banner from "../../banner/src/my-banner";
import xInput from "../../xInput/src/xInput";
import xTree from "../../xTree/src/xTree";
import xTable from "../../xTable/src/xTable";
// import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myTablesTree",
  components: { banner, xInput, xTree, xTable },
  mixins: [mixinComponent()],
  data() {
    return {
      name: ""
      // value: this.value
    };
  },
  computed: {
    computedConfig() {
      // //简化配置模式
      // if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
      //   return this.config;
      // }
      // 合并配置模式
      return this.config;
    }
  },
  methods: {
    // 数据回调
    /**
     *@obj
     *每一个回调都有唯一的name：方法名称和 list：整个form表单的数据
     */
    watchCallBackFun(obj) {
      // this.formateOutFormMoneyProp();
      // console.log("6666", obj);
      // setTimeout(() => {
      this.$emit("watchCallBackFun", {
        ...obj
      });
      // }, 0);

      // console.log("数据回调00000", {
      //   ...obj,
      //   list: this.formateOutFormMoneyToNum(this.outForm)
      // });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类 */
.divBox {
  margin-top: 10px;
  padding: 17px 10px 10px;
  background-color: #fff;
  // height: 50vh;
  // overflow-y: auto;
}
.treeBox {
  margin-top: 10px;
  // padding: 17px 10px 10px;
  // background-color: #fff;
  min-height: 30vh;
  overflow-y: auto;
}
</style>
