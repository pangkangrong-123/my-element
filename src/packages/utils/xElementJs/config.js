/*
 * @Author: your name
 * @Date: 2021-07-12 10:10:36
 * @LastEditTime: 2021-08-11 13:40:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\common\js\config.js
 */
import { merge } from "./defaultFunction";
const golbalConfig = {
  input: () => {
    return {
      disabled: false,
      type: "text",
      // valueKey: "value",
      debounce: 300,
      placement: "bottom-start",
      triggerOnFocus: true,
      selectWhenUnmatched: false,
      maxlength: null,
      minlength: null,
      showWordLimit: false,
      placeholder: "请输入",
      clearable: true,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      rows: 3,
      autosize: false,
      autocomplete: "off",
      resize: "none",
      validateEvent: true,
      hideLoading: false,
      popperAppendToBody: true,
      highlightFirstItem: false,
      slotsuffix: null, //自定义输入框末尾文字标识
      slotprefix: null //自定义输入框末尾文字标识
    };
  },
  autocomplete: () => {
    return {
      disabled: false,
      placeholder: "请输入",
      valueKey: "id",
      debounce: 300,
      placement: "bottom-start",
      fetchSuggestions: null,
      popperClass: null,
      triggerOnFocus: true,
      name: null,
      selectWhenUnmatched: false,
      label: null,
      prefixIcon: null,
      suffixIcon: null,
      hideLoading: false,
      popperAppendToBody: true,
      highlightFirstItem: false,
      maxlength: null,
      minlength: null,
      clearable: false,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      rows: 3,
      autosize: false,
      autocomplete: "off",
      resize: "none",
      validateEvent: true
    };
  },
  select: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      multiple: false,
      valueKey: "id",
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      clearable: true,
      collapseTags: false,
      multipleLimit: 0,
      autocomplete: "off",
      placeholder: "请选择",
      filterable: false,
      allowCreate: false,
      remote: false,
      loading: false,
      loadingText: "加载中",
      noMatchText: "无匹配数据",
      noDataText: "无数据",
      reserveKeyword: false,
      defaultFirstOption: false,
      popperAppendToBody: true,
      automaticDropdown: false
    };
  },
  datePicker: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      readonly: false,
      editable: true,
      clearable: true,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      placeholder: "请选择日期",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      type: "date",
      format: "",
      align: "left",
      pickerOptions: {},
      rangeSeparator: ":",
      valueFormat: "",
      unlinkPanels: false,
      prefixIcon: "el-icon-date",
      clearIcon: "el-icon-circle-close",
      validateEvent: true
    };
  },
  checkbox: () => {
    return {
      disabled: false,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      min: undefined,
      max: undefined,
      textColor: "#ffffff",
      fill: "#409EFF",
      border: false
    };
  },
  radio: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      border: false,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      textColor: "#ffffff",
      fill: "#409EFF"
    };
  },
  cascader: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      placeholder: "请选择",
      clearable: false,
      showAllLevels: true,
      collapseTags: false,
      separator: " / ",
      debounce: 300
    };
  },
  switch: () => {
    return {
      disabled: false,
      width: 40,
      activeValue: true,
      inactiveValue: false,
      activeColor: "#409EFF",
      inactiveColor: "#C0CCDA",
      validateEvent: true
    };
  },
  inputNumber: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      min: "-Infinity",
      max: "Infinity",
      step: 1,
      stepStrictly: false,
      precision: null,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      controls: true,
      controlsPosition: null,
      placeholder: "请输入"
    };
  },
  slider: () => {
    return {
      disabled: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      showInputControls: true,
      inputSize: process.env.VUE_APP_COMPONENT_SIZE || "small",
      showStops: false,
      showTooltip: true,
      range: false,
      vertical: false,
      height: null,
      label: null,
      debounce: 300,
      marks: null
    };
  },
  timePicker: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      editable: true,
      clearable: true,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      placeholder: "请选择时间",
      align: "left",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间",
      isRange: false,
      arrowControl: false,
      pickerOptions: {},
      rangeSeparator: ":",
      valueFormat: "",
      prefixIcon: "el-icon-time",
      clearIcon: "el-icon-circle-close",

      selectableRange: null,
      format: "HH:mm:ss"
    };
  },
  timeSelect: () => {
    return {
      style: { width: "100%" },
      disabled: false,
      editable: true,
      clearable: true,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      placeholder: "请选择时间",
      align: "left",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间",
      isRange: false,
      arrowControl: false,
      pickerOptions: {},
      rangeSeparator: ":",
      valueFormat: "",
      prefixIcon: "el-icon-time",
      clearIcon: "el-icon-circle-close",

      start: "09:00",
      end: "18:00",
      step: "00:30",
      minTime: "00:00",
      maxTime: null
    };
  },
  rate: () => {
    return {
      disabled: false,
      max: 5,
      texts: ["极差", "失望", "一般", "满意", "惊喜"],
      colors: ["#F7BA2A", "#F7BA2A", "#F7BA2A"],
      allowHalf: false,
      lowThreshold: 2,
      highThreshold: 4,
      voidColor: "#C6D1DE",
      iconClasses: ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on"],
      showText: false,
      showScore: false,
      textColor: "#1F2D3D",
      scoreTemplate: "{value}",
      disabledVoidColor: "#EFF2F7",
      voidIconClass: "el-icon-star-off",
      disabledVoidIconClass: "el-icon-star-on"
    };
  },
  colorPicker: () => {
    return {
      disabled: false,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      predefine: null,
      showAlpha: false,
      colorFormat: "hex"
    };
  },
  transfer: () => {
    return {
      data: [],
      disabled: false,
      filterable: false,
      filterPlaceholder: "请输入搜索内容",
      targetOrder: "original",
      titles: ["列表 1", "列表 2"],
      buttonTexts: [],
      format: {
        noChecked: "${checked}/${total}",
        hasChecked: "${checked}/${total}"
      },
      leftDefaultChecked: [],
      rightDefaultChecked: [],
      props: null
    };
  },
  xtable: () => {
    return {
      table: {
        style: { width: "100%", marginTop: "10px" },
        height: null,
        maxHeight: null,
        stripe: false,
        border: false,
        size: null,
        fit: true,
        showHeader: true,
        highlightCurrentRow: false,
        rowClassName: null,
        rowStyle: { height: "48px" },
        cellClassName: null,
        cellStyle: { padding: "3px 0", height: "46px", lineHeight: "46px" },
        headerRowClassName: null,
        headerRowStyle: null,
        headerCellClassName: null,
        headerCellStyle: {
          background: "#f4f4f4",
          borderTop: "1px solid #e0e0e0"
        },
        emptyText: "暂无数据",
        defaultExpandAll: false,
        defaultSort: { order: "ascending" },
        tooltipEffect: "dark",
        showSummary: false,
        sumText: "合计",
        selectOnIndeterminate: true,
        indent: 16,
        treeProps: { hasChildren: "hasChildren", children: "children" }
      },
      column: {
        width: null,
        minWidth: null,
        fixed: false,
        sortable: false,
        sortOrders: ["ascending", "descending", null],
        resizable: true,
        showOverflowTooltip: true,
        align: "left",
        headerAlign: "left",
        className: null,
        labelClassName: null,
        reserveSelection: false,
        filterPlacement: null,
        filterMultiple: true
      },
      search: {
        form: {
          inline: true,
          labelPosition: "right",
          labelWidth: "auto",
          labelSuffix: undefined,
          hideRequiredAsterisk: false,
          showMessage: true,
          inlineMessage: false,
          statusIcon: false,
          validateOnRuleChange: true,
          size: process.env.VUE_APP_COMPONENT_SIZE || "small",
          disabled: false,
          itemStyle: "width: 200px;"
        },
        btn: {
          size: process.env.VUE_APP_COMPONENT_SIZE || "small",
          type: "primary",
          plain: false,
          round: false,
          circle: false,
          loading: false,
          disabled: false,
          icon: null,
          autofocus: false,
          nativeType: "button",
          searchBtn: {
            // circle: false,
            // round: false,
            // plain: false,
            // type: 'primary',
            show: true,
            text: "搜索",
            icon: "el-icon-search"
          },
          resetBtn: {
            // circle: false,
            // round: false,
            // plain: false,
            // type: 'primary',
            show: true,
            text: "重置",
            icon: "el-icon-refresh-right"
          }
        }
      },
      operate: {
        column: {
          label: "操作",
          // width: null,
          // minWidth: null,
          fixed: "right",
          // renderHeader: null,
          // resizable: null,
          align: "left",
          headerAlign: "center"
          // className: null,
          // labelClassName: null
        },
        btn: {
          size: process.env.VUE_APP_COMPONENT_SIZE || "small",
          type: "primary",
          plain: false,
          round: false,
          circle: false,
          loading: false,
          disabled: false,
          icon: null,
          autofocus: false,
          nativeType: "button"
        },
        dropdown: {
          className: "",
          text: "更多",
          placement: "bottom-end",
          trigger: "hover",
          hideOnClick: true,
          showTimeout: 250,
          hideTimeout: 150,
          tabindex: 0,
          divided: false
        }
      }
    };
  },
  xform: () => {
    return {
      form: {
        inline: false,
        labelPosition: "right",
        labelWidth: "120px",
        labelSuffix: undefined,
        hideRequiredAsterisk: false,
        showMessage: true,
        inlineMessage: false,
        statusIcon: false,
        validateOnRuleChange: true,
        size: process.env.VUE_APP_COMPONENT_SIZE || "small",
        disabled: false,
        itemStyle: "max-width: 300px; width: 100%;",
        tooltip: {
          effect: "dark",
          placement: "top-start",
          iconName: "el-icon-info",
          iconStyle: "color: #409EFF"
        },
        tabs: {
          type: "border-card",
          closable: false,
          addable: false,
          editable: false,
          tabPosition: "top",
          stretch: false,
          table: {
            height: null,
            maxHeight: null,
            stripe: false,
            border: true,
            size: process.env.VUE_APP_COMPONENT_SIZE || "small",
            fit: true,
            showHeader: true,
            highlightCurrentRow: false,
            rowClassName: null,
            rowStyle: null,
            cellClassName: null,
            cellStyle: null,
            headerRowClassName: null,
            headerRowStyle: null,
            headerCellClassName: null,
            headerCellStyle: null,
            emptyText: "暂无数据",
            defaultExpandAll: false,
            defaultSort: { order: "ascending" },
            tooltipEffect: "dark",
            showSummary: false,
            sumText: "合计",
            selectOnIndeterminate: true,
            indent: 16,
            treeProps: { hasChildren: "hasChildren", children: "children" },
            column: {
              width: null,
              minWidth: null,
              showOverflowTooltip: true,
              align: "center",
              headerAlign: "center",
              className: null,
              // input的宽度100%
              style: "width: 100%"
            },
            addConfig: {
              show: true,
              type: "primary",
              icon: "",
              text: "新增",
              size: "mini",
              circle: false,
              style: "margin-bottom:14px;",
              className: "",
              click: (fun, arr) => {
                if (fun) {
                  fun(arr);
                  return;
                }
                arr.splice(arr.length, 0, {});
              }
            },
            operate: {
              show: true,
              label: "操作",
              width: "60px",
              headerAlign: "center",
              align: "center",
              btn: [
                {
                  type: "danger",
                  icon: "el-icon-close",
                  text: "",
                  size: "mini",
                  circle: true,
                  style: "",
                  className: "",
                  click: (arr, index, fun) => {
                    if (fun) {
                      fun(arr, index);
                      return;
                    }
                    arr.splice(index, 1);
                  }
                }
              ]
            }
          }
        }
      },
      operate: {
        btn: {
          size: process.env.VUE_APP_COMPONENT_SIZE || "small",
          type: "primary",
          plain: false,
          round: false,
          circle: false,
          loading: false,
          disabled: false,
          icon: null,
          autofocus: false,
          nativeType: "button"
        }
      }
    };
  },
  tree: () => {
    return {
      renderAfterExpand: true,
      highlightCurrent: false,
      defaultExpandAll: false,
      expandOnClickNode: true,
      checkOnClickNode: false,
      autoExpandParent: true,
      showCheckbox: false,
      checkStrictly: false,
      accordion: false,
      indent: 16,
      lazy: false,
      draggable: false
    };
  },
  progress: () => {
    return {
      percentage: 0,
      type: "line",
      strokeWidth: 6,
      textInside: false,
      color: "",
      width: 126,
      showText: true,
      strokeLinecap: "round"
    };
  },
  upload: () => {
    return {
      action: "",
      multiple: false,
      data: null,
      name: "file",
      withCredentials: false,
      showFileList: false,
      drag: false,
      accept: null,
      listType: "text",
      autoUpload: true,
      fileList: [],
      disabled: false,
      uploadButtonName: null, //上传按钮名字
      type: "primary",
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      tip: "此处配置提示语",
      uploadProgressShow: true //上传进度条
    };
  },
  button: () => {
    return {
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      type: "primary",
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: null,
      autofocus: false,
      nativeType: "button",
      text: "按钮"
    };
  },
  tabs: () => {
    return {
      type: null,
      closable: false,
      addable: false,
      editable: false,
      tabPosition: "top",
      stretch: false
    };
  },
  tag: () => {
    return {
      style: { display: "inline-block", marginLeft: "10px" },
      type: null,
      closable: false,
      disableTransitions: false,
      hit: false,
      color: null,
      size: process.env.VUE_APP_COMPONENT_SIZE || "small",
      effect: "light"
    };
  }
};
export default {
  get: () => golbalConfig,
  set: item => {
    merge(golbalConfig, item);
  }
};
