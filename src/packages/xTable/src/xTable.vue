<template>
  <div>
    <!-- maxToolBtnBoxWidth{{ maxToolBtnBoxWidth }} -->
    <el-table
      ref="table"
      :style="computedConfig.style"
      :data="data"
      :height="computedConfig.height"
      :max-height="computedConfig.maxHeight"
      :stripe="computedConfig.stripe"
      :border="computedConfig.border"
      :size="computedConfig.size"
      :fit="computedConfig.fit"
      :show-header="computedConfig.showHeader"
      :highlight-current-row="computedConfig.highlightCurrentRow"
      :current-row-key="computedConfig.currentRowKey"
      :row-class-name="
        ({ row, rowIndex }) =>
          tableRowClassName(computedConfig.rowClassName, row, rowIndex)
      "
      :row-style="computedConfig.rowStyle"
      :cell-class-name="computedConfig.cellClassName"
      :cell-style="computedConfig.cellStyle"
      :header-row-class-name="computedConfig.headerRowClassName"
      :header-row-style="computedConfig.headerRowStyle"
      :header-cell-class-name="computedConfig.headerCellClassName"
      :header-cell-style="computedConfig.headerCellStyle"
      :row-key="computedConfig.rowKey"
      :empty-text="computedConfig.emptyText"
      :default-expand-all="computedConfig.defaultExpandAll"
      :expand-row-keys="computedConfig.expandRowKeys"
      :default-sort="computedConfig.defaultSort"
      :tooltip-effect="computedConfig.tooltipEffect"
      :show-summary="computedConfig.showSummary"
      :sum-text="computedConfig.sumText"
      :summary-method="computedConfig.summaryMethod"
      :span-method="computedConfig.spanMethod"
      :select-on-indeterminate="computedConfig.selectOnIndeterminate"
      :indent="computedConfig.indent"
      :lazy="computedConfig.lazy"
      :load="computedConfig.load"
      :tree-props="computedConfig.treeProps"
      @select="(a, b) => computeFunction(select(computedConfig.select, a, b))"
      @select-all="a => computeFunction(selectAll(computedConfig.selectAll, a))"
      @selection-change="
        a => computeFunction(computedConfig.selectionChange, a)
      "
      @cell-mouse-enter="
        (a, b, c, d) =>
          computeFunction(computedConfig.cellMouseEnter, a, b, c, d)
      "
      @cell-mouse-leave="
        (a, b, c, d) =>
          computeFunction(computedConfig.cellMouseLeave, a, b, c, d)
      "
      @cell-click="
        (a, b, c, d) => computeFunction(computedConfig.cellClick, a, b, c, d)
      "
      @cell-dblclick="
        (a, b, c, d) => computeFunction(computedConfig.cellDblclick, a, b, c, d)
      "
      @row-click="
        (a, b, c) => computeFunction(rowClick(computedConfig.rowClick, a, b, c))
      "
      @row-contextmenu="
        (a, b, c) => computeFunction(computedConfig.rowContextmenu, a, b, c)
      "
      @row-dblclick="
        (a, b, c) => computeFunction(computedConfig.rowDblclick, a, b, c)
      "
      @header-click="
        (a, b) => computeFunction(computedConfig.headerClick, a, b)
      "
      @header-contextmenu="
        (a, b) => computeFunction(computedConfig.headerContextmenu, a, b)
      "
      @sort-change="a => computeFunction(computedConfig.sortChange, a)"
      @filter-change="a => computeFunction(computedConfig.filterChange, a)"
      @current-change="
        (a, b) => computeFunction(computedConfig.currentChange, a, b)
      "
      @header-dragend="
        (a, b, c, d) =>
          computeFunction(computedConfig.headerDragend, a, b, c, d)
      "
      @expand-change="
        (a, b) => computeFunction(computedConfig.expandChange, a, b)
      "
    >
      <!-- 生成动态列 -->
      <template v-for="(configItem, configIndex) in computedConfig.column">
        <xColumn
          v-if="computeBoolen(configItem.show, true)"
          :key="configIndex"
          :config="configItem"
          @watchCallBackFun="e => watchCallBackFun(e)"
        >
          <!-- slot 传递 -->
          <template
            v-if="computeBoolen(configItem.slot, false)"
            #[configItem.name]="scope"
          >
            <slot :name="configItem.name" v-bind="scope" />
          </template>
        </xColumn>
      </template>
      <!-- 表格的操作按钮 -->
      <el-table-column
        v-if="operateConfig && showTool"
        :label="`${operateConfig.label}`"
        :width="operateConfigWidth"
        :min-width="operateConfig.minWidth"
        :fixed="operateConfig.fixed"
        :render-header="operateConfig.renderHeader"
        :resizable="operateConfig.resizable"
        :align="operateConfig.align"
        :header-align="operateConfig.headerAlign"
        :class-name="operateConfig.className"
        :label-class-name="operateConfig.labelClassName"
      >
        <template slot-scope="scope">
          <div :class="classNum" style="display:inline-block">
            <span
              :style="{ display: 'inline-block' }"
              v-show="operateShow(operateItem, scope.row, scope.$index)"
              :key="operateIndex"
              v-for="(operateItem, operateIndex) in operateConfig.btn"
            >
              <el-button
                :style="{
                  margin: '0 5px',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  ...operateItem.style
                }"
                v-if="operateShow(operateItem, scope.row, scope.$index)"
                :class="operateItem.class"
                :size="operateItem.size"
                :type="operateItem.type"
                :plain="operateItem.plain"
                :round="operateItem.round"
                :circle="operateItem.circle"
                :icon="operateItem.eicon"
                :loading="operateItem.loading"
                :disabled="
                  operateDisabled(operateItem, scope.row, scope.$index)
                "
                :autofocus="operateItem.autofocus"
                :native-type="operateItem.nativeType"
                @click="
                  operateItem.click
                    ? operateItem.click(scope.$index, scope.row)
                    : () => {}
                "
              >
                <template v-if="operateItem.linkType">
                  <el-link
                    :style="{ position: 'relative', top: '-3px' }"
                    :underline="false"
                    :type="operateItem.linkType"
                  >
                    <i
                      v-if="operateItem.icon"
                      :style="{
                        display: 'inline-block',
                        fontSize: '18px',
                        marginRight: '-1px',
                        position: 'relative',
                        top: '2px',
                        ...operateItem.style
                      }"
                      :class="['iconfont', operateItem.icon]"
                    ></i>
                    <span
                      :style="{ fontSize: '12px', ...operateItem.textStyle }"
                    >
                      {{ operateItem.text }}</span
                    >
                  </el-link>
                </template>
                <template v-else>
                  <i
                    v-if="operateItem.icon"
                    :style="{
                      display: 'inline-block',
                      fontSize: '18px',
                      marginRight: '-1px',
                      position: 'relative',
                      top: '2px',
                      ...operateItem.style
                    }"
                    :class="['iconfont', operateItem.icon]"
                  ></i>
                  <span :style="{ fontSize: '12px', ...operateItem.textStyle }">
                    {{ operateItem.text }}</span
                  >
                </template>
              </el-button>
            </span>
          </div>

          <!-- <template v-if="operateConfig.dropdown.btn.length">
            <el-dropdown
              :class="operateConfig.dropdown.config.className"
              :placement="operateConfig.dropdown.config.placement"
              :trigger="operateConfig.dropdown.config.trigger"
              :hide-on-click="operateConfig.dropdown.config.hideOnClick"
              :show-timeout="operateConfig.dropdown.config.showTimeout"
              :hide-timeout="operateConfig.dropdown.config.hideTimeout"
              :tabindex="operateConfig.dropdown.config.tabindex"
              @command="index => handleDropdownCommand(index, scope.row)"
            >
              <span class="el-dropdown-link">
                {{ operateConfig.dropdown.config.text
                }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <template
                  v-for="(dropdownBtnItem,
                  dropdownBtnItemIndex) in operateConfig.dropdown.btn"
                >
                  <el-dropdown-item
                    v-if="operateShow(dropdownBtnItem, scope.row)"
                    :key="dropdownBtnItemIndex"
                    :divided="operateConfig.dropdown.config.divided"
                    :disabled="dropdownBtnItem.disabled"
                    :icon="dropdownBtnItem.icon"
                    :command="dropdownBtnItemIndex"
                  >
                    {{ dropdownBtnItem.text }}
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-if="page && page.total" class="block foot">
      <el-pagination
        :hide-on-single-page="false"
        :current-page.sync="page[currentPageName]"
        :page-sizes.sync="page.pageSizes"
        :page-size.sync="page.pageSize"
        :style="{
          textAlign: page.textAlign || 'center',
          marginTop: '8px',
          ...page.style
        }"
        :layout="page.layout || 'total, prev, pager, next, jumper'"
        :total="page.total"
        @size-change="
          val => {
            handleSizeChange(val, page.handleSizeChange);
          }
        "
        @current-change="
          val => {
            handleCurrentChange(val, page.handleCurrentChange);
          }
        "
      />
    </div>
  </div>
</template>

<script>
import xColumn from "../module/xColumn.vue";
// import cloneDeep from "lodash.clonedeep";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import {
  merge,
  comdify,
  delcommafy
} from "../../utils/xElementJs/defaultFunction.js";

export default {
  name: "myTables",
  components: { xColumn },
  mixins: [mixinComponent()],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: null
    },
    load: {
      type: Function,
      default: () => {}
    },
    currentPageName: {
      type: String,
      default: "currentPageNum"
    }
  },
  data() {
    return {
      classNum: "toolBox" + parseInt(Math.random() * 1000),
      operateConfigWidth: 0
      // 选中的数据保存成string格式
      // selectArrString: []
    };
  },
  computed: {
    // 显示操作
    showTool() {
      if (this.config.operate) {
        if (this.config.operate.show == undefined) {
          return true;
        }
        return this.config.operate.show;
      }
      return false;
    },
    // 是否单选
    ifRadio() {
      if (this.config && this.config.selection == "radio") {
        return true;
      }
      return false;
    },
    // 保存禁止点击的列prop 配置有solt:true且 name:string/object 都默认禁止有点击事件
    bannedClickColumn() {
      // 保存prop字段
      var obj = {};
      var columns = this.getAllColumnChildren(this.config.column);
      // console.log("columns", columns);
      if (columns instanceof Array) {
        // 使用插槽或者使用配置组件的  保存此prop字段
        columns.forEach(column => {
          if (
            column.slot &&
            column.name &&
            ["string", "object"].includes(typeof column.name)
          ) {
            //rowClickEnable 不单独开启点击事件

            if (
              column.prop &&
              column.rowClickEnable != undefined &&
              !column.rowClickEnable
            ) {
              if (["string"].includes(typeof column.name)) {
                obj[column.prop] = true;
              } else if (
                ["object"].includes(typeof column.name) &&
                !this.computeBoolen(column.name.disabled)
              ) {
                // 不是禁止状态的时候  不能点击
                // console.log(
                //   "===>",
                //   column.prop,
                //   this.computeBoolen(column.name.disabled)
                // );
                obj[column.prop] = true;
              }
            }
          }
        });
      }
      return obj;
    },
    // 根据表格配置中 search 为true的字段生成搜索框的配置
    formConfig() {
      const _this = this;
      const formConfigTemp = {
        item: [],
        operate: []
      };
      const searchConfig = merge(
        {},
        this.golbalConfig.xtable().search,
        this.config.search
      );
      merge(formConfigTemp, searchConfig.form);
      if (this.config.searchBtn !== false) {
        const searchBtn = merge(
          {},
          searchConfig.btn,
          searchConfig.btn.searchBtn,
          { click: _this.search }
        );
        formConfigTemp.operate.push(searchBtn);
      }
      if (this.config.resetBtn !== false) {
        const resetBtn = merge(
          {},
          searchConfig.btn,
          searchConfig.btn.resetBtn,
          { click: _this.reset }
        );
        formConfigTemp.operate.push(resetBtn);
      }
      if (this.config.btn) {
        this.config.btn.forEach(btn => {
          const customBtn = merge({}, searchConfig.btn, btn);
          formConfigTemp.operate.push(customBtn);
        });
      }
      // this.config.column.forEach(item => {
      // if (item.search) {
      //   const tmp = cloneDeep(item);
      //   delete tmp.show;
      //   formConfigTemp.item.push(tmp);
      // }
      // });
      return formConfigTemp.item.length ? formConfigTemp : false;
    },
    // table配置
    computedConfig() {
      const c = {};
      merge(c, this.golbalConfig.xtable().table, this.config);
      return c;
    },
    // 操作配置
    operateConfig() {
      // !this.config.operate || !this.config.operate.length;
      // console.log(111);
      if (!this.config.operate || !this.config.operate.operateArr) return null;
      // console.log(222);
      const c = {};
      merge(
        c,
        this.golbalConfig.xtable().column,
        this.golbalConfig.xtable().operate.column,
        this.config.operate.columnConfig || {}
      );
      c.btn = [];

      c.dropdown = {
        config: this.golbalConfig.xtable().operate.dropdown,
        btn: []
      };
      if (this.config.operate.operateArr) {
        for (var i in this.config.operate.operateArr) {
          const b = merge(
            {},
            this.golbalConfig.xtable().operate.btn,
            this.config.operate.operateArr[i]
          );
          if (b.dropdown === true) {
            c.dropdown.btn.push(b);
          } else {
            c.btn.push(b);
          }
        }
        // for (let i = 0; i < this.config.operate.length; i++) {
        //   const b = merge(
        //     {},
        //     this.golbalConfig.xtable.operate.btn,
        //     this.config.operate[i]
        //   );
        //   if (b.dropdown === true) {
        //     c.dropdown.btn.push(b);
        //   } else {
        //     c.btn.push(b);
        //   }
        // }
      }
      // console.log("c", c);
      return c;
    },
    // 配置有valueType:"money" 且使用插槽或者组件配置的情况下 保存配置的model/或者prop
    cpmoutedHasMoney() {
      let obj = {};
      this.getMoneyProp(this.computedConfig.column).forEach(row => {
        obj[row] = true;
      });
      return obj;
    },
    computedData() {
      return JSON.stringify(this.data);
    }
  },
  methods: {
    // 根据this.config.selection='radio'配置中 把全选按钮去除  初始化序号 多选框居中样式
    init() {
      if (
        this.config.column &&
        this.config.column instanceof Array &&
        this.config.column.length
      ) {
        this.config.column.forEach((column, index) => {
          // 下标
          if (column.type == "index") {
            // 开启多选 默认设置   headerAlign: "center"
            if (!column.headerAlign) {
              column.headerAlign = "center";
            }
            // 开启多选 默认设置   align: "center"
            if (!column.align) {
              column.align = "center";
            }
          }
          // 多选
          if (column.type == "selection") {
            // 开启多选 默认设置   headerAlign: "center"
            if (!column.headerAlign) {
              column.headerAlign = "center";
            }
            // 开启多选 默认设置   align: "center"
            if (!column.align) {
              column.align = "center";
            }
            if (this.config.selection && this.config.selection == "radio") {
              // 有标题栏lableClassName
              if (column.labelClassName) {
                if (column.labelClassName.indexOf("selectAllBtnhide") == -1) {
                  // 有默认配置的情况下 在末尾添加selectAllBtnhide 隐藏样式
                  this.$set(
                    this.config.column[index],
                    "labelClassName",
                    column.labelClassName + " selectAllBtnhide"
                  );
                  // column.labelClassName += " hide";
                }
              } else {
                // 添加selectAllBtnhide 隐藏样式 没有默认样式情况下 直接赋值
                this.$set(
                  this.config.column[index],
                  "labelClassName",
                  "selectAllBtnhide"
                );
                // column.labelClassName = "hide";
              }
              // 当前列样式  主要修改单选情况下 把单选的勾换成圆圈
              if (column.className) {
                if (column.className.indexOf("selectRadio") == -1) {
                  // 有默认配置的情况下 在末尾添加selectAllBtnhide 隐藏样式
                  this.$set(
                    this.config.column[index],
                    "className",
                    column.className + " selectRadio"
                  );
                  // column.labelClassName += " hide";
                }
              } else {
                this.$set(
                  this.config.column[index],
                  "className",
                  "selectRadio"
                );
              }
            } else {
              // dan单选 多选切换情况下  移除对应的class
              if (
                column.labelClassName &&
                column.labelClassName.indexOf("selectAllBtnhide") != -1
              ) {
                // 多选开启 把隐藏的全选按钮的隐藏样式移除  显示全选按钮

                var labelClassName = column.labelClassName.replace(
                  /selectAllBtnhide/g,
                  ""
                );
                this.$set(
                  this.config.column[index],
                  "labelClassName",
                  labelClassName
                );
              }

              if (
                column.className &&
                column.className.indexOf("selectRadio") != -1
              ) {
                // 多选开启 把隐藏的全选按钮的隐藏样式移除  显示全选按钮

                var className = column.className.replace(/selectRadio/g, "");
                this.$set(this.config.column[index], "className", className);
              }
            }
          }
        });
      }
      //  格式化配置有千分符的数据  可以手动调用 转化需要显示千分符的数据
      // this.setCpmoutedHasMoney();
    },
    // 遍历column下所有的children 生成一个一级集合
    getAllColumnChildren(columns) {
      var arr = [];
      if (columns && columns instanceof Array && columns.length) {
        columns.forEach(column => {
          // 存在子集 回调
          if (column.children && column.children.length) {
            arr.push(...this.getAllColumnChildren(column.children));
          } else {
            arr.push(column);
          }
        });
      }
      return arr;
    },

    // table选中事件
    select(fn, selection, row) {
      // 单选模式

      // 判断是否被选中 已经被选中的清除 否则勾选
      let selected = Boolean(selection.length && selection.indexOf(row) !== -1);
      if (this.ifRadio) {
        //
        this.clearSelection();
        // console.log("selected", selected);
        this.toggleRowSelection(row, selected);
        // console.log("getSelection", this.getSelection());
      }
      if (fn) {
        /**
         * selected 当前是否选中的状态 选中 true  取消选中 false
         */
        fn(this.getSelection(), row, selected);
      }
      // console.log("select", row.checked);
    },
    // table全选中事件
    selectAll(fn, selection) {
      if (fn) {
        fn(selection);
      }
      // console.log("selectAll", selection);
    },
    // table单击事件
    // unClickName 禁止点击的操作栏名称
    rowClick(fn, row, column, event, unClickName = "操作") {
      // console.log(column.label, unClickName, "555");
      if (column && column.label == unClickName) {
        return;
      }
      // console.log("selected", this.getSelection().indexOf(row));
      // 配置使用插槽 即slot：true  禁止点击事件  bannedClickColumn里面保存slot:true 的prop字段值
      if (column && this.bannedClickColumn[column.property]) {
        // 禁止点击 !column.property ||
        return;
      }
      // 判断是否被选中 已经被选中的清除 否则勾选
      let unSelected = Boolean(
        this.getSelection().length && this.getSelection().indexOf(row) !== -1
      );
      // 单击点击事件
      if (this.ifRadio) {
        //

        // console.log("selected", selected);
        this.clearSelection();
        this.toggleRowSelection(row, !unSelected);
      } else {
        // 多选
        this.toggleRowSelection(row);
      }
      // 自定义单击事件  getSelection实际选中的集合 开启多选的时候有用 关闭单选且使用单选的时候不建议使用
      if (fn) {
        /**
         * 第四个参数是当前是否选中的状态 选中 true  取消选中 false   关闭单选且使用单选的时候不建议使用
         */
        fn(row, column, this.getSelection(), !unSelected);
      }
      // console.log("rowClick", column.property, this.ifRadio);
    },
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
        ...obj,
        list: this.data
      });
      // }, 0);

      // console.log("数据回调00000", {
      //   ...obj,
      //   list: this.formateOutFormMoneyToNum(this.outForm)
      // });
    },
    // 重置
    reset() {
      if (this.page) {
        this.page.pageNum = 1;
      }
      this.$refs["xForm"].resetFields();
      this.getList();
    },
    // 表格的操作按钮显隐
    operateShow(operateItem, row, index) {
      if (typeof operateItem.show === "boolean") {
        return operateItem.show;
      } else if (typeof operateItem.show === "function") {
        return operateItem.show(index, row);
      } else {
        return this.golbalConfig.xtable().table.operate.btn.show;
      }
    },
    operateDisabled(operateItem, row, index) {
      if (typeof operateItem.disabled === "boolean") {
        return operateItem.disabled;
      } else if (typeof operateItem.disabled === "function") {
        return operateItem.disabled(index, row);
      } else {
        return this.golbalConfig.xtable().table.operate.btn.disabled;
      }
    },
    // 下拉菜单的点击事件
    handleDropdownCommand(index, row) {
      this.operateConfig.dropdown.btn[index].click(row);
    },
    // 点击搜索
    search() {
      if (this.page) {
        this.page.pageNum = 1;
      }
      this.getList();
    },
    // 发送绑定的api
    getList() {
      this.load();
    },
    handleSizeChange(val, fn) {
      // 每页显示几条
      // this.page.pageSize = val;
      // this.$emit("handleSizeChange", val);

      if (fn) {
        fn(val);
      } else {
        this.$nextTick(() => {
          this.getList();
        });
      }
      // this.$emit("update:page", this.page);
    },
    handleCurrentChange(val, fn) {
      // 当前页显示几条
      // console.log("9898989", val);
      // this.page.pageNum = val;
      // this.$emit("handleCurrentChange", val);
      if (fn) {
        fn(val);
      } else {
        this.$nextTick(() => {
          this.getList();
        });
      }
      // this.$emit("update:page", this.page);
    },
    tableRowClassName(fn, row, rowIndex) {
      // row.index = rowIndex;
      // console.log("tableRowClassName", row, rowIndex);
      if (fn) {
        fn(row, rowIndex);
      }
    },
    // 获取选中的tableselect
    getSelection() {
      return this.$refs.table.selection;
    },
    // 重写 table methods
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.table.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.table.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.table.doLayout();
    },
    sort(prop, order) {
      this.$refs.table.sort(prop, order);
    },
    // 格式化配置有valueType:money 数据
    setCpmoutedHasMoney() {
      this.data.forEach(item => {
        Object.keys(this.cpmoutedHasMoney).forEach(prop => {
          // console.log("item[prop]", item[prop]);
          if (typeof item[prop] == "number") {
            // 格式化为千分符数据
            item[prop] = comdify(item[prop]);
          }
        });
      });
    },
    // 获取没有千分符数据的table data 返回 data
    getData() {
      let data = JSON.parse(JSON.stringify(this.data));
      data.forEach(item => {
        Object.keys(this.cpmoutedHasMoney).forEach(prop => {
          // console.log("item[prop]", item[prop]);
          if (typeof item[prop] == "string") {
            // 格式化为千分符数据
            item[prop] = delcommafy(item[prop]);
          }
        });
      });
      return data;
    },
    maxToolBtnBoxWidth() {
      let classname = "." + this.classNum;
      let divs = document.querySelectorAll("" + classname);
      if (!divs) {
        return 0;
      }
      let widths = {};

      // let len = divs.length;
      // let num = len / 3;

      // divs.splice(0, len - num);
      // console.log("divs", divs);
      divs.forEach(item => {
        // if (index > len - num - 1) {
        // console.log("item", item);
        let w = 0;
        if (item.childNodes) {
          item.childNodes.forEach(span => {
            if (span.style.display != "none" && Number(span.offsetWidth)) {
              w += Math.ceil(Number(span.offsetWidth));
            }
            // console.log("55", span, span.style.display, span.offsetWidth, w);
          });
        }

        widths[w] = true;
        // }
      });
      // console.log("widths", widths);
      // 宽度集合
      let widthArr = Object.keys(widths);
      // console.log("11", widthArr);

      if (widthArr.length) {
        // let num = Number(
        //   widthArr
        //     .sort(function(a, b) {
        //       return a - b;
        //     })
        //     .reverse()[0]
        // );
        let num = Number(Math.max(...widthArr));
        // console.log("num:", num);
        if (num) {
          // 把间距和边框加上去
          num += 23;
        }
        return num;
      }

      return 0;
    },
    // 获取所有配置有valueType:"money"
    getMoneyProp(columns) {
      let obj = [];
      if (columns && columns instanceof Array && columns.length) {
        columns.forEach(column => {
          if (column.valueType === "money") {
            if (column.prop != undefined) {
              obj.push(column.prop);
            }
            if (
              column.name &&
              typeof column.name == "object" &&
              column.name.valueType === "money"
            ) {
              //
              if (column.name.model != undefined) {
                obj.push(column.name.model);
              } else if (column.prop != undefined) {
                obj.push(column.prop);
              }
            }
          } else if (
            column.name &&
            typeof column.name == "object" &&
            column.name.valueType === "money"
          ) {
            //
            if (column.name.model != undefined) {
              obj.push(column.name.model);
            } else if (column.prop != undefined) {
              obj.push(column.prop);
            }
          }

          if (
            column.children &&
            column.children instanceof Array &&
            column.children.length
          ) {
            // console.log("666", this.getMoneyProp(column.children));
            obj.push(...this.getMoneyProp(column.children));
          }
        });
      }

      return obj;
    }
  },
  created() {
    // 初始化table数据
    this.init();
    // 设置千分符配置的数据
    // console.log("getMoneyProp", this.getMoneyProp(this.computedConfig.column));
  },
  mounted() {
    if (this.operateConfig && this.operateConfig.width != null) {
      this.operateConfigWidth = this.operateConfig.width;
    }
    // this.maxToolBtnBoxWidth();
  },
  watch: {
    // computedData: function(val) {
    //   console.log("computedData", val);
    // }
    // "config.status": {
    //   handler(val) {
    //     console.log("val", val);
    //   },
    //   deep: true
    // }
  },
  beforeUpdate() {},
  updated() {
    // console.log("8888");
    //初始化table数据

    // this.$nextTick(() => {
    this.init();
    this.operateConfigWidth = this.maxToolBtnBoxWidth();
    // });
  }
};
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 6px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
}
/deep/.el-pagination .btn-next,
/deep/.el-pagination .btn-prev {
  background-color: #f4f4f5;
}
/deep/.el-pager li {
  background: #f4f4f5;
}
/deep/.el-pager li.active {
  background-color: #409eff;
  color: #fff;
}
/deep/.selectAllBtnhide .el-checkbox {
  // opacity: 0.5;
  display: none;
}
/deep/.el-checkbox__inner {
  border-radius: 50%;
}

/deep/.selectRadio {
  .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: translate(-50%, -50%) scale(1);
  }
  .el-checkbox__inner::after {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform "0.15s" "ease-in";
  }
}
</style>
