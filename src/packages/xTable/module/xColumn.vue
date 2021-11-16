<!--
 * @Author: your name
 * @Date: 2021-08-03 12:33:43
 * @LastEditTime: 2021-10-27 16:21:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\packages\xTable\module\xColumn.vue
-->
<template>
  <el-table-column
    v-if="computeBoolen(computedConfig.show, true)"
    :type="computedConfig.type"
    :index="computedConfig.index"
    :column-key="computedConfig.columnKey"
    :label="computedConfig.label"
    :prop="computedConfig.prop"
    :width="computedConfig.width"
    :min-width="computedConfig.minWidth"
    :fixed="computedConfig.fixed"
    :render-header="computedConfig.renderHeader"
    :sortable="computedConfig.sortable"
    :sort-method="computedConfig.sortMethod"
    :sort-by="computedConfig.sortBy"
    :sort-orders="computedConfig.sortOrders"
    :resizable="computedConfig.resizable"
    :formatter="
      (row, column, cellValue, index) =>
        filterTableData(
          computedConfig.formatter,
          row,
          column,
          cellValue,
          index,
          config
        )
    "
    :show-overflow-tooltip="computedConfig.showOverflowTooltip"
    :align="computedConfig.align"
    :header-align="computedConfig.headerAlign"
    :class-name="computedConfig.className"
    :label-class-name="computedConfig.labelClassName"
    :selectable="computedConfig.selectable"
    :reserve-selection="computedConfig.reserveSelection"
    :filters="computedConfig.filters"
    :filter-placement="computedConfig.filterPlacement"
    :filter-multiple="computedConfig.filterMultiple"
    :filter-method="computedConfig.filterMethod"
    :filtered-value="computedConfig.filteredValue"
  >
    <template v-if="computedConfig.children">
      <xColumn
        v-for="(configItem, configItemIndex) in computedConfig.children"
        :key="configItemIndex"
        :config="configItem"
        @watchCallBackFun="watchCallBackFun"
      >
        <!-- slot 传递 #[configItem.name]="scope" -->

        <template
          v-if="computeBoolen(configItem.slot)"
          #[configItem.name]="scope"
        >
          <slot :name="configItem.name" v-bind="scope" />
        </template>
      </xColumn>
    </template>
    <!-- <template v-if="computedConfig.slot" v-slot="scope">
      <slot :name="computedConfig.name" v-bind="scope" />
    </template> -->
    <!-- slot-scope="scope" -->
    <template v-if="computeBoolen(computedConfig.slot)" v-slot="scope">
      <slot
        v-if="typeof computedConfig.name == 'string'"
        :name="computedConfig.name"
        v-bind="scope"
      />
      <template v-else-if="typeof computedConfig.name == 'object'">
        <!-- {{ scope.row }}{{ scope.$index }} -->

        <span
          :style="computedConfig.name.labelStyle"
          v-if="computeBoolen(computedConfig.name.show, true)"
          >{{
            typeof computedConfig.name.label == "string"
              ? computedConfig.name.label
              : typeof computedConfig.name.label == "function"
              ? computedConfig.name.label(scope.row)
              : ""
          }}
        </span>

        <!-- <keep-alive> -->
        <!-- handleData:传scope.$index 操作的情况下 最后一个参数返回 -->
        <component
          :is="getComponentType(computedConfig.name)"
          v-if="computeBoolen(computedConfig.name.show, true)"
          v-model="scope.row[computedConfig.name.model || computedConfig.prop]"
          :propData="
            scope.row[computedConfig.name.model || computedConfig.prop]
          "
          :config="computedConfig.name"
          :handleData="scope.$index"
          @watchCallBackFunItem="
            obj => watchCallBackFun(obj, scope.row, scope.$index)
          "
        ></component>
        <!-- <span
          v-if="
            computeBoolen(computedConfig.name.show, true) &&
              computeBoolen(computedConfig.name.disabled)
          "
        >
          {{
            scope.row[computedConfig.name.model || computedConfig.prop]
          }}</span
        > -->
        <!-- </keep-alive> -->
      </template>
    </template>
    <template
      v-else-if="computedConfig.prop && computedConfig.valueType"
      v-slot="scope"
    >
      <!-- 转千分符 -->
      <span v-if="computedConfig.valueType == 'money'">
        {{ comdify(scope.row[computedConfig.prop]) }}
      </span>
      <!-- 文件大小转化成 -->
      <span v-else-if="computedConfig.valueType == 'fileSize'">
        {{ getFileSize(scope.row[computedConfig.prop]) }}
      </span>
    </template>
  </el-table-column>
</template>

<script>
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import {
  merge,
  comdify,
  getComponentType,
  getFileSize
} from "../../utils/xElementJs/defaultFunction.js";
// import MyInput from "../../xInput/src/xInput.vue";
const MyInput = () => import("../../xInput/src/xInput.vue");
import MySelect from "../../xSelect/src/xSelect.vue";
// const MySelect = () => import("../../xSelect/src/xSelect.vue");
// import MyDatePicker from "../../xDatePicker/src/xDatePicker.vue";
const MyDatePicker = () => import("../../xDatePicker/src/xDatePicker.vue");
// import MyAutocomplete from "../../xAutocomplete/src/xAutocomplete.vue";
// import MyCascader from "../../xCascader/src/xCascader.vue";
import MyCheckbox from "../../xCheckbox/src/xCheckbox.vue";
// const MyCheckbox = () => import("../../xCheckbox/src/xCheckbox.vue");
// import MyColorPicker from "../../xColorPicker/src/xColorPicker.vue";
// import MyInputNumber from "../../xInputNumber/src/xInputNumber.vue";
import MyRadio from "../../xRadio/src/xRadio.vue";
// const MyRadio = () => import("../../xRadio/src/xRadio.vue");
// import MyRate from "../../xRate/src/xRate.vue";
const MyRate = () => import("../../xRate/src/xRate.vue");
// import MySlider from "../../xSlider/src/xSlider.vue";
import MySwitch from "../../xSwitch/src/xSwitch.vue";
// const MySwitch = () => import("../../xSwitch/src/xSwitch.vue");
// import MyTimePicker from "../../xTimePicker/src/xTimePicker.vue";
// import MyTimeSelect from "../../xTimeSelect/src/xTimeSelect.vue";
// import MyTransfer from "../../xTransfer/src/xTransfer.vue";
// import MyTree from "../../xTree/src/xTree.vue";
// import MySelectTree from "../../xSelectTree/src/xSelectTree.vue";
// import MyProgress from "../../xProgress/src/xProgress.vue";
const MyProgress = () => import("../../xProgress/src/xProgress.vue");
// import MyUpload from "../../xUpload/src/xUpload.vue";
// import MyButton from "../../xButton/src/xButton.vue";
const MyButton = () => import("../../xButton/src/xButton.vue");
// import MyTabs from "../../xTabs/src/xTabs.vue";
import MyTag from "../../xTag/src/xTag.vue";
// const MyTag = () => import("../../xTag/src/xTag.vue");
// import MyTables from "../../xTable/src/xTable.vue";
export default {
  name: "XColumn",
  components: {
    MyInput,
    MySelect,
    MyDatePicker,
    // MyAutocomplete,
    // MyCascader,
    MyCheckbox,
    // MyColorPicker,
    // MyInputNumber,
    MyRadio,
    MyRate,
    // MySlider,
    MySwitch,
    // MyTimePicker,
    // MyTimeSelect,
    // MyTransfer,
    // MyTree,
    // MySelectTree,
    MyProgress,
    // MyUpload,
    MyButton,
    // MyTabs,
    // MyTables,
    MyTag
  },
  mixins: [mixinComponent()],
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    computedConfig() {
      const c = {};
      merge(c, this.golbalConfig.xtable().column, this.config);
      return c;
    }
    // computedConfigName() {
    //   return function(index) {
    //     console.log("index", index);
    //     this.computedConfig.name.index = index;
    //     return this.computedConfig.name;
    //   };
    // }
  },
  methods: {
    // 数据回调
    /**
     *@obj
     *@row 当前数据
     *@index 所在数据的下标
     *每一个回调都有唯一的name：方法名称和 list：整个form表单的数据
     */
    watchCallBackFun(obj, row, index) {
      // console.log("5555", obj.index, index);
      // this.formateOutFormMoneyProp();
      // setTimeout(() => {
      this.$emit("watchCallBackFun", {
        ...obj,
        row: row != undefined ? row : obj.row,
        index: index != undefined ? index : obj.index
      });
      // }, 0);

      // console.log("数据回调00000", {
      //   ...obj,
      //   list: this.formateOutFormMoneyToNum(this.outForm)
      // });
    },
    // 数字转千分符
    comdify: comdify,
    // 格式化文件大小
    getFileSize: getFileSize,
    // 获取动态组件类型
    getComponentType: getComponentType,
    // filter表格数据
    filterTableData(fn, row, column, cellValue, index, config) {
      // console.log("55555", fn);
      // console.log(row, column, cellValue, index, config);
      if (fn) {
        return fn(row, column, cellValue, index);
      }
      if (!row) return;
      if (cellValue) {
        return cellValue;
      }
      // console.log("config", config);
      // if (config.dic) return filterDic(config.dic, cellValue);
      return row[config.prop];
    }
  },
  created() {
    // console.log("computedConfig000", this.computedConfig);
    // console.log(
    //   "computeBoolen(computedConfig.show, true)",
    //   this.computeBoolen(this.computedConfig.show, true)
    // );
  },
  updated() {
    // console.log("8888");
  }
};
</script>

<style></style>
