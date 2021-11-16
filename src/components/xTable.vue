<!--
 * @Author: your name
 * @Date: 2021-06-02 16:26:49
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\views\Menus.vue
-->
<!--  -->
<template>
  <div class="">
    <myTables
      ref="myTables"
      :config="selfTableConfig.table"
      :page="selfTableConfig.page"
      :data="selfTableConfig.data"
      :load="selfTableConfig.load"
      :currentPageName="'currentPageNum'"
    >
      <!-- slot-scope="scope" -->
      <template #selectHandler="scope">
        <!-- {{ scope.$index }} -->
        <myInput
          v-model="scope.row['moneyInput']"
          :propData="scope.row['moneyInput']"
          :config="{
            xType: 'input',
            show: true,
            // type: &quot;number&quot;,
            valueType: 'money',
            // valueType: &quot;number&quot;,
            placeholder: '请输入金额'
            // suffixIcon: &quot;el-icon-search&quot;,
            // slotsuffix: &quot;%&quot; //自定义末尾标识名称
          }"
        >
          <!-- {{ scope.scope }} -->
        </myInput>
      </template>
      <template slot="selectHandler2">
        <i>自定义插槽</i>
        <template slot="selectHandler5"> <h1>selectHandler2-2</h1> </template>
        <template slot="selectHandler6"> <h1>selectHandler2-3</h1> </template>
        <!-- <h1>自定义插槽</h1>
        <h1>自定义插槽</h1>
        <h1>自定义插槽</h1> -->
      </template>
      <template slot="selectHandler3"> <h1>selectHandler2-2</h1> </template>
      <template slot="selectHandler4"> <h1>selectHandler2-3</h1> </template>
    </myTables>
    <!-- <mytable></mytable> -->
    <xTableTree
      :config="xTableTree"
      @watchCallBackFun="watchCallBackFun"
    ></xTableTree>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myTables from "src/packages/xTable/src/xTable.vue";
import myInput from "src/packages/xInput/src/xInput.vue";
import mixinComponent from "src/packages/utils/xElementJs/xMixin.js";
import xTableTree from "src/packages/xTableTree/src/xTableTree.vue";

// import mytable from "./Table.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  mixins: [mixinComponent()],
  components: {
    myTables,
    myInput,
    xTableTree
    // mytable
  },
  props: {},
  data() {
    //这里存放数据
    var self = this;
    return {
      boolNum: true,
      query: {
        currentPageNum: 4,
        pageSize: 11,
        total: 51
      },
      // table配置
      selfTableConfig: {
        table: {
          // rowStyle: { height: "36px" },
          status: self.computedBool,
          selection: "radio", //单选开启
          // 选中事件
          /**
           * @selection 所有选中数据
           * @row 当前操作数据
           * @selected 当前操作是否选中
           */
          select: (selection, row, selected) => {
            console.log("select00", selection, row, selected);
          },
          /** 单击事件
           *@row 当前操作的数据
           *@column 表格数据
           *@selection 所有选中数据
           *@selected 当前操作是否选中
           */
          rowClick: (row, column, selection, selected) => {
            console.log("rowClick00", row, column, selection, selected);
            // console.log("点击数据的下标", index);
          },
          // { row, column, rowIndex, columnIndex }
          headerCellStyle: ({ column, rowIndex }) => {
            if (
              rowIndex == 1 &&
              ["物资", "物资名称及规格", "单位"].includes(column.label)
            ) {
              // console.log(
              //   "row, column, rowIndex, columnIndex",
              //   // row,
              //   column.label,
              //   rowIndex,
              //   columnIndex
              // );
              // return { height: "0px" };
            }
          },
          column: [
            {
              // prop: "id1",
              show: true,

              // headerAlign: "center",
              // align: "center",
              type: "selection",
              // labelClassName: "selectAllBtnhide", //单选时给hide样式 隐藏样式
              fixed: "left"
            },
            {
              type: "expand",
              slot: true,
              name: "selectHandler3"
            },
            {
              type: "index",
              width: 100,
              label: "序号"
              // slot: true,
              // name: "selectHandler3"
            },
            {
              prop: "id9",
              label: "表头00",
              // show: self.computedBool,
              headerAlign: "center",
              // children: [],
              children: [
                {
                  prop: "id",
                  label: "物资555",
                  // show: self.computedBool,
                  width: 200,

                  // show: false
                  slot: true,
                  // rowClickEnable: true,
                  name: {
                    xType: "button",
                    text: index => {
                      return index;
                    }
                  }
                },
                {
                  prop: "input2",
                  label: "物资名称及规格",
                  width: "150px",
                  slot: true,
                  name: {
                    xType: "input",
                    valueType: "money"
                  }
                },
                { prop: "id", label: "单位" }
              ]
            },
            {
              prop: "id15",
              // show: self.computedBool,
              // show: () => {
              //   return self.computedBool();
              // },
              // show: false,
              label: "金额",
              valueType: "money",
              width: 150,
              slot: true,
              name: {
                xType: "input",
                valueType: "money"
              }
            },
            {
              label: "插槽",
              prop: "moneyInput",
              valueType: "money",
              width: 250,
              slot: true,
              name: "selectHandler"
            },
            {
              label: "状态",
              prop: "type",
              width: 150,
              slot: true,
              name: {
                xType: "tag",
                // show: true,
                dic: {
                  label: "name",
                  type: "type",
                  // data: (type) => {
                  //   // console.log("formData", type);
                  //   return [{ name: "动态控制", type: type }];
                  // }
                  data: [{ name: "成功", type: "success" }]
                }
              }
            },

            {
              prop: "type0",
              label: "是否整理",
              width: "300px",
              slot: () => {
                // console.log("是否整理", ...e);
                return true;
              }, //开启插槽或者配置
              // name: string/object  string:插槽  object:配置
              name: {
                xType: "select",
                style: { width: "150px" },
                labelStyle: {
                  display: "inline-block",
                  width: "80px",
                  textAlign: "right"
                  // paddingRight: "5px"
                },
                disabled: () => {
                  // console.log("是否", ...e);
                  return false;
                },
                show: true,
                label: row => {
                  if (row.id16) {
                    return "输入(自定义)：";
                  }
                  // console.log("row000", row);
                },
                // type: "select",
                // valueType: "object", //选择对象类型
                model: "type",
                // valueType: "money",
                // valueType: "number",
                dic: {
                  label: "label",
                  value: "type",
                  data: () => {
                    // console.log(val, index);
                    return [
                      { type: "", label: "默认" },
                      { type: "success", label: "success" },
                      { type: "info", label: "info" },
                      { type: "danger", label: "danger" },
                      { type: "error", label: "error" },
                      { type: "warning", label: "warning" }
                    ];
                  }
                },
                // allowCreate: true,
                // filterable: true,
                // multiple: true,
                placeholder: "普通下拉框",

                // change: "changeClickName",
                removeTag: val => {
                  console.log("removeTag", val);
                },
                // clear: val => {
                //   console.log("clear", val);
                // },
                // change: "changeSelect"
                change: (val, index) => {
                  console.log("change", val, index);
                }
                // blur: "blurChange"
                // focus: val => {
                //   console.log("focus", val);
                // }
                // readonly: false,
                // disabled: true,
                // value: "多发高发"
              }
              // name: "selectHandler" // ["selectHandler2", "selectHandler4"]

              // formatter: () => {
              //   // console.log("99999999999", row, column, cellValue, index);
              //   return "888888888888888888888888888888888";
              // }
            },
            {
              // show: true,
              prop: "id2",
              label: "整理前",
              headerAlign: "center",

              // slot: true,
              // name: "selectHandler2",
              children: [
                {
                  prop: "id1",
                  // show: true,
                  width: "250px",
                  label: "物资编码"
                  // show: self.computedBool
                  // slot: true,
                  // rowClickEnable: true, //独立开启能单击事件 条件：slot: true,name:string/object
                  // name: "selectHandler2"
                },
                {
                  prop: "id4",
                  label: "物资名称",
                  width: "250px"
                  // show: self.computedBool
                  // slot: true,
                  // name: "selectHandler2"
                  // name: {
                  //   style: { width: "150px" },
                  //   xType: "input",
                  //   show: true,
                  //   valueType: "money",
                  //   // change: val => {
                  //   //   console.log("change", val);
                  //   // },
                  //   change: "consigneeChange",
                  //   // line: true,
                  //   label: "收货人",
                  //   // disabled: true,

                  //   model: "consignee",
                  //   placeholder: "收货人"
                  // }
                  // name: "selectHandler3"
                }
                // {
                //   prop: "id5",
                //   label: "物资规格",
                //   width: "250px",
                //   slot: true,
                //   name: {
                //     xType: "upload",
                //     show: true,
                //     // label: "上传",
                //     type: "text",
                //     uploadButtonName: "上传附件",
                //     tip: "",
                //     action: "https://jsonplaceholder.typicode.com/posts/",
                //     onProgress: event => {
                //       this.formDataB.form.percentage = parseInt(event.percent);
                //       console.log("onProgress", parseInt(event.percent));
                //       console.log(this.formDataB.form.percentage);
                //     },
                //     onError: (err, file, fileList) => {
                //       console.log("onError", err, file, fileList);
                //     },
                //     onSuccess: (response, file, fileList) => {
                //       console.log("onSuccess", response, file, fileList);
                //     }
                //   }
                // },
                // { prop: "id6", label: "单位" }
              ]
            },
            // {
            //   prop: "id7",
            //   label: "备注",
            //   width: "250px",
            //   slot: true,
            //   name: {
            //     // style: "height: 32px;line-height: 32px;",
            //     xType: "checkbox",
            //     model: "checkbox",
            //     show: true,
            //     // label: "多选按钮",
            //     dic: {
            //       label: "label",
            //       value: "value",
            //       data: [
            //         { label: "多选一", value: 1 },
            //         { label: "多选二", value: 2 }
            //       ]
            //     }
            //   }
            // },
            // {
            //   prop: "id8",
            //   label: "品牌需求",
            //   width: "250px",
            //   slot: true,
            //   name: {
            //     // style: "height: 40px;line-height: 40px;",
            //     xType: "progress",
            //     show: true,
            //     // label: "进度条",
            //     strokeWidth: 15,
            //     // percentage: 25, //优先使用此数值
            //     model: "percentage" //先获取 model配置 其次 prop
            //     // type: "circle"
            //     // status: "success"
            //     // textInside: true//type=line 生效
            //   }
            // },

            // { prop: "id10", label: "品牌需求" },
            // {
            //   prop: "id11",
            //   label: "需求数量",
            //   headerAlign: "center",
            //   children: [
            //     { prop: "id12", label: "申请数量" },
            //     { prop: "id13", label: "批准数量" }
            //   ]
            // },
            // { prop: "id14", label: "要求供货日期" },
            // { prop: "id17", label: "计划供货日期" },
            {
              prop: "id16",
              label: "采购数量",
              width: 200,
              slot: true,
              name: {
                // style: "height: 40px;line-height: 40px;",
                xType: "rate",
                // disabled: true,
                show: true,
                showScore: true,
                // scoreTemplate: "{formData}",
                // label: "评价",
                model: "id16"
              }
            },
            { prop: "id14", label: "采购利库" }
          ],
          operate: {
            show: true,
            columnConfig: {
              // width: "250px"
              // label: "操作2"
            },
            operateArr: {
              button2: {
                //   disabled:true,
                show: () => {
                  // let num = parseInt(Math.random() * 10) % 2;
                  // // console.log(num);
                  // return Boolean(num);
                  return true;
                },
                type: "text",
                linkType: "danger",
                // button: true,
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                style: {},
                size: "medium",
                round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // eicon: "el-icon-edit",
                text: "编辑"
                // size: "mini"
              },
              button1: {
                //   disabled:true,
                show: () => {
                  return false;
                  // let num = parseInt(Math.random() * 10) % 2;
                  // // console.log(num);
                  // return Boolean(num);
                  // return true;
                },

                type: "text",
                // linkType: "default",
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                // round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // class: "edit",
                // eicon: "el-icon-edit",
                text: "删除"
                // size: "medium"
              },
              button21: {
                //   disabled:true,
                show: () => {
                  // let num = parseInt(Math.random() * 10) % 2;
                  // // console.log(num);
                  // return Boolean(num);
                  return false;
                },
                type: "text",
                linkType: "danger",
                // button: true,
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                style: {},
                size: "medium",
                round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // eicon: "el-icon-edit",
                text: "编辑"
                // size: "mini"
              },
              button11: {
                //   disabled:true,
                show: () => {
                  return false;
                  // let num = parseInt(Math.random() * 10) % 2;
                  // console.log(num);
                  // return Boolean(num);
                  // return false;
                },

                type: "text",
                // linkType: "default",
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                // round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // class: "edit",
                // eicon: "el-icon-edit",
                text: "删除"
                // size: "medium"
              },
              button211: {
                //   disabled:true,
                show: () => {
                  // let num = parseInt(Math.random() * 10) % 2;
                  // // console.log(num);
                  // return Boolean(num);
                  return true;
                },
                type: "text",
                linkType: "danger",
                // button: true,
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                style: {},
                size: "medium",
                round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // eicon: "el-icon-edit",
                text: "编辑"
                // size: "mini"
              },
              button111: {
                //   disabled:true,
                show: () => {
                  return true;
                  // let num = parseInt(Math.random() * 10) % 2;
                  // console.log(num);
                  // return Boolean(num);
                  // return false;
                },

                type: "text",
                // linkType: "default",
                click: (index, row) => {
                  self.submitClick();
                  console.log("点击提交", index, row);
                },
                // round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // class: "edit",
                // eicon: "el-icon-edit",
                text: "删除"
                // size: "medium"
              }
            }
          }
        },
        data: this.putDate(),
        page: {
          total: 51,
          pageSize: 11,
          pageNum: 1
          // handleCurrentChange: val => {
          //   console.log("5555", val);
          // },
          // handleSizeChange: val => {
          //   console.log("5555", val);
          // }
        },
        load: this.getList
      },
      // xTableTree配置
      xTableTree: {
        form: {},
        config: {
          //   gutter: null,
          //   leftSpan: null,
          //   rightSpan: null
        },
        headerDate: {
          backgroundImgUrl: null, //背景图
          name: "立项管理", // 头部左边显示名
          // 监听字段
          tableToolFormWatch: [
            "startTime",
            "endTime",
            "approvalStatus",
            "engineeringStatus"
          ],
          btnList: [
            {
              name: "新建系统工程立项",
              show: true, //显示隐藏
              icon: "sub_color el-icon-plus", //icon
              iconParams: "", //icon自定义显示
              clickName: "addSystemProject" //点击按钮返回操作名称标识名
            },
            {
              name: "新建用户工程立项",
              show: true, //显示隐藏
              icon: "sub_color el-icon-plus", //icon
              iconParams: "", //icon自定义显示
              clickName: "addUserProject" //点击按钮返回操作名称标识名
            }
          ],
          // 列表的搜索栏部分配置
          toolList: {
            // show: true,
            list: {
              left: {
                justify: "left", //定位位置
                span: 4, //占比  总数24
                // offset:0
                items: [
                  {
                    type: "text",
                    // show: true,
                    span: 12,
                    name: "工程信息列表", //搜索栏左边的列表标题
                    class: " left",
                    style: ""
                  }
                ]
              },
              right: {
                justify: "end",
                span: 20,
                // offset:0
                items: {
                  startTime: {
                    type: "month",
                    // pickerOptions: null,
                    label: "项目期间",
                    span: 3,
                    placeholder: "开始月份",
                    class: "right",
                    valueFormat: "yyyy-MM",
                    model: "startTime"
                  },
                  endTime: {
                    type: "month",
                    // pickerOptions: self.endTimePickerOptions,
                    label: "~",
                    span: 3,
                    placeholder: "结束月份",
                    valueFormat: "yyyy-MM",
                    model: "endTime"
                  },
                  approvalStatus: {
                    type: "select",
                    inputModel: "approvalStatus",
                    span: 3,
                    clearable: false,
                    placeholder: "审核状态",
                    labelOrName: {
                      label: "name",
                      name: "id"
                    },
                    list: []
                  },
                  engineeringStatus: {
                    type: "select",
                    inputModel: "engineeringStatus",
                    span: 3,
                    placeholder: "工程状态",
                    labelOrName: {
                      label: "name",
                      name: "id"
                    },
                    list: [
                      // { name: "在建", id: 1 },
                      // { name: "归档", id: 2 },
                      // { name: "终止", id: 3 }
                    ]
                  },
                  filterValue: {
                    type: "inputSearch",
                    span: 6,
                    inputPlaceholder: "工程名称/编号/项目名称/编号",
                    showClick: true,
                    inputModel: "filterValue",
                    clickName: "filterValue"
                  },
                  exportBtn: {
                    type: "customButton",
                    buttonName: "导出",
                    show: true,
                    clickName: "exportBtn"
                  }
                }
              }
            }
          },
          tableToolForm: {
            approvalStatus: null //设置操作栏字段默认值
          }
        },
        xInput: {
          show: true,
          model: "projectType",
          placeholder: "搜索项目类别",
          prefixIcon: "el-icon-search"
        },
        xTree: {
          // span: 12,
          show: true,
          label: "树节点",
          // model: "itemClassificationTree",
          showCheckbox: false,
          nodeKey: "id",
          props: { label: "name", children: "children" },
          defaultExpandAll: false,
          dic: [],
          // check: "checkHandler",
          // check: (clickNode, status) => {
          //   console.log("check", clickNode, status);
          // },
          nodeClick: row => {
            console.log("nodeClick", row);
          },
          filterNode: (value, data) => {
            console.log("filterNode", data);
          }
        },
        xTable: {
          data: [
            // { id: 1, engineeringNumber: 33, approvalStatus: "AUDITED" },
            // { engineeringNumber: 22, approvalStatus: "DRAFT" },
            // { engineeringNumber: 44, approvalStatus: "REJECTED" },
            // { engineeringNumber: 55, approvalStatus: "IN_AUDIT" }
          ],
          page: {
            currentPageNum: 1,
            pageSize: 10,
            total: 0
          },
          config: {
            rowClick: self.rowClick,
            column: [
              // { type: "index", label: "序号", fixed: "left", show: false },
              { prop: "engineeringNumber", label: "工程编号" },
              { prop: "engineeringName", label: "工程名称" },
              // { prop: "engineeringType", label: "工程类型" },
              { prop: "projectNumber", label: "项目编号" },
              { prop: "projectName", label: "项目名称" },
              { prop: "projectType", label: "项目类别" },
              { prop: "creatorName", label: "登记人" },
              { prop: "duringTheProject", label: "项目期间" },
              {
                prop: "engineeringStatus",
                label: "工程状态",
                width: 100,
                // align: "center",
                slot: true,
                rowClickEnable: true,
                name: {
                  xType: "tag",
                  dic: {
                    label: "name",
                    type: "type",
                    // data: [{ name: "已审核", type: "success" }]
                    data: self.formatApproveStatus
                  }
                }
              },
              {
                prop: "approvalStatus",
                label: "审核状态",
                width: 100,
                // align: "center",
                slot: true,
                rowClickEnable: true,
                name: {
                  xType: "tag",
                  dic: {
                    label: "name",
                    type: "type",
                    // data: [{ name: "已审核", type: "success" }]
                    data: self.formatApproveStatus
                  }
                }
              },
              { prop: "approvalLink", label: "当前审核环节", width: 120 },
              { prop: "approver", label: "当前审批人", width: 120 }
            ],
            operate: {
              show: true,
              columnConfig: {
                width: 430
                // label: "操作2"
              },
              operateArr: {
                editHandle: {
                  xType: "button",
                  type: "text",
                  // label: "变更",
                  linkType: "primary",
                  text: "编辑",
                  show: true,
                  // icon: getIconFont ? getIconFont("编辑") : "",
                  // class: "edit",
                  disabled: false,
                  // show: self.editHandleShow,
                  click: () => {
                    console.log("click");
                  }
                }
              }
            }
          }
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // "selfTableConfig.data": {
    //   handler(val) {
    //     console.log("selfTableConfig.data", val);
    //   },
    //   deep: true
    // }
    "selfTableConfig.page.currentPageNum": function(val) {
      this.query.currentPageNum = val;
    }
    // boolNum(val) {
    //   console.log("boolNum", val);
    // }
  },
  //方法集合
  methods: {
    computedBool() {
      return this.boolNum;
    },
    watchCallBackFun() {},
    submitClick() {
      var self = this;
      console.log("self.$refs.myTables", self.$refs.myTables.getData());
      this.loading({ target: self.$refs.myTables.$el });
      setTimeout(() => {
        this.loadingClose();
      }, 3000);
      // this.confirm("确认吗", () => {
      //   console.log("好的");
      // });
    },
    putDate: () => {
      var val = parseInt(Math.random());
      return [
        {
          checkbox: [],
          type: "success",
          id: 1,
          name: "gsdfgsdfg",
          id15: val,
          moneyInput: 555
        },
        {
          checkbox: [],
          type: "error",
          id: 1,
          name: "gsdfgsdfg",
          moneyInput: 666
        },
        { checkbox: [], type: "", id: 1, name: "gsdfgsdfg" },
        {
          checkbox: [],
          type: "info",
          id: 1,
          name: "gsdfgsdfg",
          id4: 5556,
          id5: "ddfdgsdf",
          id6: "ddfdgsdf",
          id7: val,
          id8: "ddfdgsdf",
          id9: "ddfdgsdf",
          id10: "ddfdgsdf",
          id11: "ddfdgsdf",
          id12: "ddfdgsdf",
          id13: val,
          id1: "ddfdgsdf",
          id15: "ddfdgsdf",
          id16: 1,
          id17: "2021-5-9",
          percentage: 50
          // id15: 555
        },
        {
          checkbox: [],
          type: "warning",
          id: 1,
          name: val,
          percentage: 50,
          id15: 555,
          id16: 5
        },
        { checkbox: [], type: "error", id: 1, name: "gsdfgsdfg" },
        { checkbox: [], type: "", id: 1, name: val },
        {
          checkbox: [],
          type: "info",
          id: 1,
          name: "gsdfgsdfg",
          id4: 5556,
          id5: "ddfdgsdf",
          id6: "ddfdgsdf",
          id7: "ddfdgsdf",
          id8: val,
          id9: "ddfdgsdf",
          id10: "ddfdgsdf",
          id11: val,
          id12: "ddfdgsdf",
          id13: "ddfdgsdf",
          id14: "ddfdgsdf",
          id15: val,
          id16: 1,
          id17: "2021-5-9",
          percentage: 50
          // id15: 555
        }
      ];
    },
    // table 数据自动调用
    getList() {
      // var self = this;
      // this.$set(this.selfTableConfig, "data", []);
      // let tiemout = setTimeout(() => {
      //   if (tiemout) {
      //     clearTimeout(tiemout);
      //     tiemout = null;
      //   }
      // self.$set(self.selfTableConfig.page, "pageNum", 1);
      //   this.$set(this.selfTableConfig, "data", this.putDate());
      // }, 3000);
      console.log("getList", this.selfTableConfig.page);
    }
    // 数据回调
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    setInterval(() => {
      this.$nextTick(() => {
        this.boolNum = Boolean(parseInt(Math.random() * 10) % 2);
        // this.$set(this.selfTableConfig.table, "status", this.boolNum);
        // this.$set(this.selfTableConfig.table.column[3], "show", this.boolNum);
      });

      // console.log("555", this.selfTableConfig.table.column);
      // this.selfTableConfig.page.currentPageNum = 2;
    }, 1000);
    // setInterval(() => {
    // this.getList();
    // this.selfTableConfig.data = [];
    // this.$set(
    //   this.selfTableConfig.table,
    //   "selection",
    //   parseInt(Math.random() * 100) % 2 ? "radio" : ""
    // );
    // this.$set(
    //   this.selfTableConfig.table.operate.operateArr.button2,
    //   "show",
    //   Boolean(parseInt(Math.random() * 100) % 2)
    // );
    // this.formDataB.form["defaultInput"] = "";
    // }, 3000);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    // console.timeEnd("pkr加载耗时");
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类 */
</style>
