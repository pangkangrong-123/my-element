<!--
 * @Author: your name
 * @Date: 2021-06-02 16:26:49
 * @LastEditTime: 2021-11-16 10:24:45
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\views\Menus.vue
-->
<template>
  <div class="">
    <MyInput
      :config="{
        xType: 'input',
        show: true,
        label: '邮箱输入框',
        prepend: 'emailInput',
        type: 'email',
        model: 'emailInput',
        rightButton: {},
        // valueType: &quot;number&quot;,
        placeholder: '请输入邮箱输入框',
        rules: [
          {
            required: false,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur']
          }
        ]
        // suffixIcon: &quot;el-icon-search&quot;,
        // slotsuffix: &quot;%&quot; //自定义末尾标识名称
      }"
    >
      <template slot="emailInput" slot-scope="scope">
        5555{{ scope.row.prepend }}
      </template>
    </MyInput>
    <!-- <a href="javascript:void(0)" @click="clickhandle">
      点击
    </a> -->
    <my-forms
      ref="xForm"
      :formDataConfig="formDataB"
      @watchCallBackFun="watchCallBackFun"
    >
      <template slot="emailInput"> 555555 </template>
      <template slot="tabs">
        <template slot="titleConfig">
          <div slot="header">自定义插槽</div>
        </template>
        <template slot="selfSlot">
          <h1 class="box">自定义插槽</h1>
        </template>
        <template slot="accTable">
          <h1 class="box">自定义插槽2</h1>
        </template>
      </template>
      <template slot="titleConfig">
        <div slot="header">自定义插槽</div>
      </template>
      <template slot="selfSlot">
        <h1 class="box">自定义插槽</h1>
      </template>
      <template slot="accTable">
        <h1 class="box">自定义插槽2</h1>
      </template>
      <template slot="selfTable"> </template>
    </my-forms>
    <el-divider><i class="el-icon-mobile-phone"></i>组件基础配置</el-divider>
    <el-row :gutter="5">
      <el-col :span="8" v-for="(item, key) in configData.list" :key="key">
        <!-- tabs动态配置 -->
        <component
          :is="getComponentType(item)"
          v-model="formDataB.form[item.model]"
          :propData="formDataB.form[item.model]"
          :config="item"
          @watchCallBackFun="watchCallBackFun"
        >
          <template slot="slotA" slot-scope="scope">
            <h1>{{ scope.row.label }}</h1>
          </template>
          <template slot="slotB" slot-scope="scope">
            <h1>{{ scope.row.label }}</h1>
          </template>
          <template slot="slotC" slot-scope="scope">
            <h1>{{ scope.row.label }}</h1>
          </template>
        </component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getComponentType } from "src/packages/utils/xElementJs/defaultFunction";
import MyInput from "src/packages/xInput/src/xInput.vue";
import MySelect from "src/packages/xSelect/src/xSelect.vue";
import MyDatePicker from "src/packages/xDatePicker/src/xDatePicker.vue";
import MyAutocomplete from "src/packages/xAutocomplete/src/xAutocomplete.vue";
import MyCascader from "src/packages/xCascader/src/xCascader.vue";
import MyCheckbox from "src/packages/xCheckbox/src/xCheckbox.vue";
import MyColorPicker from "src/packages/xColorPicker/src/xColorPicker.vue";
import MyInputNumber from "src/packages/xInputNumber/src/xInputNumber.vue";
import MyRadio from "src/packages/xRadio/src/xRadio.vue";
import MyRate from "src/packages/xRate/src/xRate.vue";
import MySlider from "src/packages/xSlider/src/xSlider.vue";
import MySwitch from "src/packages/xSwitch/src/xSwitch.vue";
import MyTimePicker from "src/packages/xTimePicker/src/xTimePicker.vue";
import MyTimeSelect from "src/packages/xTimeSelect/src/xTimeSelect.vue";
import MyTransfer from "src/packages/xTransfer/src/xTransfer.vue";
import MyTree from "src/packages/xTree/src/xTree.vue";
import MySelectTree from "src/packages/xSelectTree/src/xSelectTree.vue";
import MyProgress from "src/packages/xProgress/src/xProgress.vue";
import MyUpload from "src/packages/xUpload/src/xUpload.vue";
import MyButton from "src/packages/xButton/src/xButton.vue";
import MyTabs from "src/packages/xTabs/src/xTabs.vue";
import MyForms from "src/packages/xForm/src/xForm.vue";
import myTables from "src/packages/xTable/src/xTable.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    MyForms,
    MyInput,
    MySelect,
    MyDatePicker,
    MyAutocomplete,
    MyCascader,
    MyCheckbox,
    MyColorPicker,
    MyInputNumber,
    MyRadio,
    MyRate,
    MySlider,
    MySwitch,
    MyTimePicker,
    MyTimeSelect,
    MyTransfer,
    MyTree,
    MySelectTree,
    MyProgress,
    MyUpload,
    MyButton,
    myTables,
    MyTabs
  },
  data() {
    //这里存放数据
    var self = this;
    var Authorization = ``;
    var action = "";
    return {
      filesList: [],
      // table配置
      selfTableConfig: {
        table: {
          // rowStyle: { height: "36px" },
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
          },
          column: [
            {
              // prop: "id1",
              label: "序号",
              // headerAlign: "center",
              // align: "center",
              type: "selection",
              // labelClassName: "selectAllBtnhide", //单选时给hide样式 隐藏样式
              fixed: "left"
            },
            {
              prop: "name1",
              label: "是否整理",
              width: "250px",
              slot: true, //开启插槽或者配置
              // name: string/object  string:插槽  object:配置
              name: {
                xType: "select",
                show: true,
                label: row => {
                  console.log("row000", row);
                },
                // type: "select",
                // valueType: "object", //选择对象类型
                model: "defaultSelect",
                // valueType: "money",
                // valueType: "number",
                dic: {
                  label: "name",
                  value: "id",
                  data: [
                    { id: "ddddd", name: "ddddd" },
                    { id: "eee", name: "eee" }
                  ]
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
                change: "changeSelect"
                // input: val => {
                //   console.log("input", val);
                // },
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
              show: true,
              prop: "id2",
              label: "整理前",
              headerAlign: "center",
              slot: true,
              name: "selectHandler2",
              children: [
                {
                  prop: "id3",
                  show: true,
                  width: "250px",
                  label: "物资编码",
                  slot: true,
                  rowClickEnable: true, //独立开启能单击事件 条件：slot: true,name:string/object
                  name: "selectHandler2"
                },
                {
                  prop: "id4",
                  label: "物资名称",
                  width: "250px",
                  slot: true,
                  name: {
                    xType: "input",
                    show: true,
                    valueType: "money",
                    // change: val => {
                    //   console.log("change", val);
                    // },
                    change: "consigneeChange",
                    // line: true,
                    label: "收货人",
                    // disabled: true,
                    model: "consignee",
                    placeholder: "收货人"
                  }
                  // name: "selectHandler3"
                },
                {
                  prop: "id5",
                  label: "物资规格",
                  width: "250px",
                  slot: true,
                  name: {
                    xType: "upload",
                    show: true,
                    label: "上传",

                    type: "text",
                    uploadButtonName: "上传附件",
                    tip: "",
                    headers: {
                      Authorization
                    },
                    action,
                    onProgress: event => {
                      this.formDataB.form.percentage = parseInt(event.percent);
                      console.log("onProgress", parseInt(event.percent));
                      console.log(this.formDataB.form.percentage);
                    },
                    onError: (err, file, fileList) => {
                      console.log("onError", err, file, fileList);
                    },
                    onSuccess: (response, file, fileList) => {
                      console.log("onSuccess", response, file, fileList);
                    }
                  }
                },
                { prop: "id6", label: "单位" }
              ]
            },
            {
              prop: "id7",
              label: "备注",
              width: "250px",
              slot: true,
              components: {}
            },
            {
              prop: "id8",
              label: "品牌需求",
              width: "250px",
              slot: true,
              name: {
                // style: "height: 40px;line-height: 40px;",
                xType: "progress",
                show: true,
                label: "进度条",
                strokeWidth: 15,
                // percentage: 25, //优先使用此数值
                model: "percentage" //先获取 model配置 其次 prop
                // type: "circle"
                // status: "success"
                // textInside: true//type=line 生效
              }
            },
            {
              prop: "id9",
              label: "整理后",
              headerAlign: "center",
              children: [
                { prop: "id", label: "物资编码" },
                { prop: "id", label: "物资名称及规格", width: "150px" },
                { prop: "id", label: "单位" }
              ]
            },
            { prop: "id10", label: "品牌需求" },
            {
              prop: "id11",
              label: "需求数量",
              headerAlign: "center",
              children: [
                { prop: "id12", label: "申请数量" },
                { prop: "id13", label: "批准数量" }
              ]
            },
            { prop: "id14", label: "要求供货日期" },
            { prop: "id25", label: "计划供货日期" },
            { prop: "id16", label: "采购数量" },
            { prop: "id14", label: "采购利库" },
            { prop: "id15", label: "库存量", valueType: "money", width: 150 }
          ],
          operate: {
            columnConfig: {
              width: "250px"
              // label: "操作2"
            },
            operateArr: {
              button2: {
                //   disabled:true,
                show: true,
                type: "text",
                click: () => {
                  console.log("点击提交");
                },
                size: "medium",
                round: true,
                icon: "icon-tuBiao_zhongbiaoluru",
                // eicon: "el-icon-edit",
                text: "中标录入111"
                // size: "mini"
              },
              button1: {
                //   disabled:true,
                show: true,
                type: "text",
                click: () => {
                  console.log("点击提交");
                },
                round: true,
                eicon: "el-icon-edit",
                text: "返回",
                size: "medium"
              }
            }
          }
        },
        data: [
          { id: 1, name: "gsdfgsdfg", id15: "556655488.5" },
          { id: 1, name: "gsdfgsdfg" },
          { id: 1, name: "gsdfgsdfg" },
          { id: 1, name: "gsdfgsdfg", percentage: 50, id15: 555 }
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 1, name: "gsdfgsdfg" },
          // { id: 2, name: "gsdfgsdfg" }
        ],
        page: {
          total: 50,
          pageSize: 10,
          pageNum: 1
        },
        load: () => {
          self.getList();
          // console.log("pageNum:", self.selfTableConfig.page.pageNum);
        }
      },
      // form表单配置
      formDataB: {
        // ref: null,
        formItemDisabled: () => {
          return false;
        }, //全局禁用  优先级selfDisabled(单独对象里面使用) > formItemDisabled
        labelWidth: null, //默认
        gutter: null,
        // 移除 需要监听返回的字段 移除
        // formWatch: ["dateValue"],
        //初始值或者回显值 设置默认值
        form: {
          firstName: "firstName",
          allName: "firstName",
          lastName: "名字",
          // tabs: "first",
          radio: 1,
          cascader: ["zujian", "data", "progress"],
          moneyInput: 5555, //this.formDataB.form.moneyInput
          // childrenForm: [{}],
          childrenForm: {
            obj: {
              moneyInput: 75758888575,
              defaultInput: 88
            },
            firstName: "firstName1111",
            allName: "firstName",
            moneyInput: 75758888575,
            defaultInput: 88,
            radio: 1
          }
          // defaultSelect: ""
          // checkboxValue: [],
          // checkboxButtonValue: [],
          // inputValue: "名称"
        },
        // 移除 校验规则 移除  改为写在每一个表单元素里面
        // rules: {
        //   inputValue: [{ required: true, message: "请输入", trigger: "blur" }],
        //   numberValue: [{ required: true, message: "请输入", trigger: "blur" }]
        // },
        // 头部按钮和标题配置
        headerConfig: {
          show: true,
          list: {
            left: {
              justify: "left",
              span: 8,
              offset: 0,
              show: true,
              list: {}
            },
            center: {
              justify: "center",
              span: 8,
              offset: 8,
              show: true,
              list: {
                title: {
                  xType: "text",
                  label: "收入合同编辑",
                  show: true
                }
              }
            },
            right: {
              justify: "right",
              span: 8,
              offset: 0,
              show: true,
              list: {
                xButton: {
                  xType: "button",
                  //   disabled:true,
                  show: true,
                  click: () => {
                    console.log("点击提交");
                  },
                  round: true,
                  eicon: "el-icon-edit",
                  text: "返回",
                  size: "mini"
                },
                xButtona: {
                  xType: "button",
                  //   disabled:true,
                  show: true,
                  click: () => {
                    console.log("点击提交");
                  },
                  round: true,
                  eicon: "el-icon-edit",
                  text: "返11回00",
                  size: "mini"
                }
              }
            }
          }
        },
        formConfig: {
          boxA: {
            noBorder: true,
            cardShadow: "never",
            // bodyStyle: { padding: 0 },
            titleConfig: {
              show: true,
              slot: "titleConfig"
              // leftBorderShow: true
              // text: "组件",
              // subtext: "table组件测试"
            },
            list: {
              table: {
                span: 24,
                show: true,
                label: "table组件测试",
                xType: "slot",
                name: "selfTable"
              }
            }
          },
          cardQ: {
            noBorder: true,
            cardShadow: "never",
            list: {
              remarkInstruction: {
                xType: "input",
                type: "textarea",
                span: 24,
                // rows: 3,
                show: true,
                autosize: true,
                resize: "vertical", //none, both, horizontal, vertical
                // disabled: true,
                // line: true,
                maxlength: 200,
                showWordLimit: true,
                label: "备注",
                model: "remarkInstruction",
                placeholder: "请输入内容"
              }
            }
          },
          cardA: {
            noBorder: true,
            cardShadow: "never",
            // enableSelfDisabled: () => {
            //   // console.log("enableSelfDisabled:", data);
            //   return true;
            // },
            // show: null,
            // showHeader: true,
            // leftBorderShow: true,
            // headerName: "名称",
            // subHeaderName: "", //描述标题
            titleConfig: {
              show: true,
              leftBorderShow: true,
              text: "名称",
              subtext: "描述标题"
            },
            // modelChildren: "obj", // 如果 是数组  则配置 modelChildren 代表数组的下标
            // model: "childrenForm", //配置二级form 如果form表单不是都同一个层级 可单独为formConfig的每一个item配置一个单独的model
            list: {
              firstName: {
                xType: "input",
                show: true,
                label: "姓氏",
                maxlength: 10,
                showWordLimit: true,
                // disabled: this.setdisabled,
                border: true, //短横线条
                model: "firstName",
                placeholder: "输入框姓氏 "
              },
              lastName: {
                xType: "input",
                show: true,
                label: "名字",
                border: true, //短横线条
                model: "lastName",
                placeholder: "输入框名字"
              },
              allName: {
                xType: "input",
                show: true,
                label: "姓名",
                model: "allName",
                disabled: true,
                // line: true,
                placeholder: "姓名"
                // placeholder: "输入框名字"
              },
              upload: {
                xType: "upload",
                type: "text",
                show: true,
                label: "上传",
                disabled: false,
                filesName: "fileName",
                fileList: () => {
                  // console.log("5556");
                  return this.filesList;
                },
                xButtonRight: {
                  xType: "button",
                  type: "text",
                  linkType: "danger",
                  show: true,
                  label: "按钮",
                  round: true,
                  icon: "el-icon-edit",
                  text: () => {
                    return "删除";
                  }
                },
                uploadButtonName: () => {
                  return "上00传" + this.formDataB.form.childrenForm.firstName;
                },
                rightConfig: {},
                tip: "",
                limit: 3,
                headers: {
                  Authorization
                },
                action,
                onProgress: event => {
                  this.formDataB.form.percentage = parseInt(event.percent);
                  console.log("onProgress", parseInt(event.percent));
                  console.log(this.formDataB.form.percentage);
                },
                onError: (err, file, fileList) => {
                  console.log("onError", err, file, fileList);
                },
                onSuccess: response => {
                  const { code, data } = response;
                  if (code === 200) {
                    this.filesList.push(data);
                  }
                  // console.log(
                  //   "this.filesList",
                  //   this.filesList,
                  //   code,
                  //   data,
                  //   response
                  // );
                },
                beforeUpload: file => {
                  console.log("beforeUpload", file);
                }
              },
              remarkInstruction: {
                xType: "input",
                type: "textarea",
                span: 24,
                rows: 2,
                show: true,
                disabled: true,
                // line: true,
                label: "备注",
                model: "remarkInstruction",
                placeholder: "请输入内容"
              },
              selfSlot: {
                span: 24,
                show: true,
                label: "",
                labelWidth: "0px",
                xType: "slot",
                name: "selfSlot"
              },
              defaultInput: {
                xType: "input",
                show: true,
                // line: true,
                rightButton: true,
                click: (e, value) => {
                  console.log(e, value);
                },
                label: "普通输入框",
                rules: [{ required: true, message: "请输入", trigger: "blur" }],
                // disabled: true,
                // type: "number",
                model: "defaultInput",
                valueType: "money",
                // valueType: "number",
                placeholder: "普通输入框",
                // suffixIcon: "el-icon-search",
                // slotsuffix: "%", //自定义末尾标识名称
                change: "changeClickName",
                clear: val => {
                  console.log("clear", val);
                },
                // change: val => {
                //   console.log("change", val);
                // },
                input: val => {
                  console.log("input", val);
                },
                blur: val => {
                  console.log("blur", val);
                },
                focus: val => {
                  console.log("focus", val);
                }
                // readonly: false,
                // disabled: true,
                // value: "多发高发"
              },
              moneyInput: {
                xType: "input",
                show: true,
                label: "金额输入框",
                // type: "number",
                model: "moneyInput",
                valueType: "money",
                // valueType: "number",
                placeholder: "请输入金额"
                // suffixIcon: "el-icon-search",
                // slotsuffix: "%" //自定义末尾标识名称
              },
              emailInput: {
                xType: "input",
                show: true,
                label: "邮箱输入框",
                prepend: "emailInput",
                type: "email",
                model: "emailInput",
                // valueType: "number",
                placeholder: "请输入邮箱输入框",
                rules: [
                  {
                    required: false,
                    message: "请输入邮箱地址",
                    trigger: "blur"
                  },
                  {
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur"]
                  }
                ]
                // suffixIcon: "el-icon-search",
                // slotsuffix: "%" //自定义末尾标识名称
              },
              numberInput: {
                xType: "input",
                show: true,
                label: "数字输入框",
                type: "number",
                model: "numberInput",
                // valueType: "money",
                valueType: "number",
                placeholder: "数字输入框",
                // suffixIcon: "el-icon-search",
                slotsuffix: "%", //自定义末尾标识名称
                input: val => {
                  console.log("input", val);
                }
              },
              defaultSelect: {
                // style: {},
                xType: "select",
                show: true,
                label: "普通下拉框",
                rules: [
                  {
                    required: true,
                    message: "请输入",
                    trigger: "change"
                  }
                ],
                // type: "select",
                model: "defaultSelect",
                // valueType: "money",
                // valueType: "number",
                // 配置1
                dic: {
                  label: "name",
                  value: "id",
                  data: [
                    { id: "ddddd", name: "ddddd" },
                    { id: "eee", name: "eee" }
                  ]
                },
                // 配置2
                //dic:{label: "name",value: "id",data:(model)=>{return []}}
                // 配置3
                //dic:[],
                // 配置4
                // dic:(model)=>{return []},

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
                change: "changeSelect",
                input: val => {
                  console.log("input", val);
                }
                // blur: "blurChange"
                // focus: val => {
                //   console.log("focus", val);
                // }
                // readonly: false,
                // disabled: true,
                // value: "多发高发"
              },
              multipleSelect: {
                xType: "select",
                show: false,
                label: "多选下拉框",
                // type: "select",
                model: "multipleSelect",
                // valueType: "money",
                // valueType: "number",
                valueKey: "id",
                dic: [
                  { id: 1, value: 1, label: "ddddd" },
                  { id: 2, value: 2, label: "dsfsdf" },
                  { id: 3, value: 3, label: "ccccc" }
                ],
                // allowCreate: true,
                // filterable: true,
                multiple: true,
                placeholder: "多选下拉框",

                // change: "changeClickName",
                removeTag: val => {
                  console.log("removeTag", val);
                },
                // clear: val => {
                //   console.log("clear", val);
                // },
                change: "changeSelect",
                // input: val => {
                //   console.log("input", val);
                // },
                blur: "blurChange"
                // focus: val => {
                //   console.log("focus", val);
                // }
                // readonly: false,
                // disabled: true,
                // value: "多发高发"
              },
              allowCreateSelect: {
                xType: "select",
                show: false,
                label: "可自创建下拉框",
                // type: "select",
                model: "allowCreateSelect",
                // valueType: "money",
                // valueType: "number",
                dic: [
                  { value: 1, label: "ddddd" },
                  { value: 2, label: "dsfsdf" },
                  { value: 3, label: "ccccc" }
                ],
                allowCreate: true,
                filterable: true,
                multiple: true,
                placeholder: "可自创建下拉框",

                // change: "changeClickName",
                removeTag: val => {
                  console.log("removeTag", val);
                },
                // clear: val => {
                //   console.log("clear", val);
                // },
                change: "changeSelect",
                // input: val => {
                //   console.log("input", val);
                // },
                blur: "blurChange"
                // focus: val => {
                //   console.log("focus", val);
                // }
                // readonly: false,
                // disabled: true,
                // value: "多发高发"
              },
              datePicker: {
                xType: "datePicker",
                show: true,
                // pickerOptions: {
                //   disabledDate(time) {
                //     return time.getTime() > Date.now();
                //   }
                // },
                pickerOptions: () => {
                  // console.log("row", data);
                  return {
                    disabledDate(time) {
                      return time.getTime() > Date.now();
                    }
                  };
                },
                label: "日期选择器00",
                model: "year",
                valueFormat: "yyyy-MM-dd"
              },
              autocomplete: {
                xType: "autocomplete",
                model: "autocomplete",
                show: true,
                label: "选择器00",
                // value: "value",
                // value: "value",
                // name: "value",
                // label: "value",
                valueKey: "value",
                //搜索使用数据
                fetchSuggestions: (queryString, cb) => {
                  let results = [
                    {
                      value: "三全鲜食（北新泾店）",
                      address: "长宁区新渔路144号"
                    },
                    {
                      value: "Hot honey 首尔炸鸡（仙霞路）",
                      address: "上海市长宁区淞虹路661号"
                    },
                    {
                      value: "新旺角茶餐厅",
                      address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
                    },
                    { value: "泷千家(天山西路店)", address: "天山西路438号" },
                    {
                      value: "胖仙女纸杯蛋糕（上海凌空店）",
                      address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
                    }
                  ];
                  if (queryString) {
                    let copyresults = results.filter(result => {
                      if (result.value.indexOf(queryString) != -1) {
                        return true;
                      }
                      return false;
                    });
                    //下拉数据使用
                    cb(copyresults);
                  } else {
                    //下拉数据使用
                    cb(results);
                  }
                  // console.log(queryString, cb);
                }
                // valueFormat: "yyyy-MM-dd"
              },
              cascader: {
                xType: "cascader",
                model: "cascader",
                show: true,
                label: "联动下拉00",
                // change: (...e) => {
                //   console.log("联动下拉00", ...e);
                // },
                props: { expandTrigger: "hover" },
                options: [
                  {
                    value: "zhinan",
                    label: "指南",
                    disabled: true,
                    children: [
                      {
                        value: "shejiyuanze",
                        label: "设计原则",
                        children: [
                          {
                            value: "yizhi",
                            label: "一致"
                          },
                          {
                            value: "fankui",
                            label: "反馈"
                          },
                          {
                            value: "xiaolv",
                            label: "效率"
                          },
                          {
                            value: "kekong",
                            label: "可控"
                          }
                        ]
                      },
                      {
                        value: "daohang",
                        label: "导航",
                        children: [
                          {
                            value: "cexiangdaohang",
                            label: "侧向导航"
                          },
                          {
                            value: "dingbudaohang",
                            label: "顶部导航"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    value: "zujian",
                    label: "组件",
                    children: [
                      {
                        value: "basic",
                        label: "Basic",
                        children: [
                          {
                            value: "layout",
                            label: "Layout 布局"
                          },
                          {
                            value: "color",
                            label: "Color 色彩"
                          },
                          {
                            value: "typography",
                            label: "Typography 字体"
                          },
                          {
                            value: "icon",
                            label: "Icon 图标"
                          },
                          {
                            value: "button",
                            label: "Button 按钮"
                          }
                        ]
                      },
                      {
                        value: "form",
                        label: "Form",
                        children: [
                          {
                            value: "radio",
                            label: "Radio 单选框"
                          },
                          {
                            value: "checkbox",
                            label: "Checkbox 多选框"
                          },
                          {
                            value: "input",
                            label: "Input 输入框"
                          },
                          {
                            value: "input-number",
                            label: "InputNumber 计数器"
                          },
                          {
                            value: "select",
                            label: "Select 选择器"
                          },
                          {
                            value: "cascader",
                            label: "Cascader 级联选择器"
                          },
                          {
                            value: "switch",
                            label: "Switch 开关"
                          },
                          {
                            value: "slider",
                            label: "Slider 滑块"
                          },
                          {
                            value: "time-picker",
                            label: "TimePicker 时间选择器"
                          },
                          {
                            value: "date-picker",
                            label: "DatePicker 日期选择器"
                          },
                          {
                            value: "datetime-picker",
                            label: "DateTimePicker 日期时间选择器"
                          },
                          {
                            value: "upload",
                            label: "Upload 上传"
                          },
                          {
                            value: "rate",
                            label: "Rate 评分"
                          },
                          {
                            value: "form",
                            label: "Form 表单"
                          }
                        ]
                      },
                      {
                        value: "data",
                        label: "Data",
                        children: [
                          {
                            value: "table",
                            label: "Table 表格"
                          },
                          {
                            value: "tag",
                            label: "Tag 标签"
                          },
                          {
                            value: "progress",
                            label: "Progress 进度条"
                          },
                          {
                            value: "tree",
                            label: "Tree 树形控件"
                          },
                          {
                            value: "pagination",
                            label: "Pagination 分页"
                          },
                          {
                            value: "badge",
                            label: "Badge 标记"
                          }
                        ]
                      },
                      {
                        value: "notice",
                        label: "Notice",
                        children: [
                          {
                            value: "alert",
                            label: "Alert 警告"
                          },
                          {
                            value: "loading",
                            label: "Loading 加载"
                          },
                          {
                            value: "message",
                            label: "Message 消息提示"
                          },
                          {
                            value: "message-box",
                            label: "MessageBox 弹框"
                          },
                          {
                            value: "notification",
                            label: "Notification 通知"
                          }
                        ]
                      },
                      {
                        value: "navigation",
                        label: "Navigation",
                        children: [
                          {
                            value: "menu",
                            label: "NavMenu 导航菜单"
                          },
                          {
                            value: "tabs",
                            label: "Tabs 标签页"
                          },
                          {
                            value: "breadcrumb",
                            label: "Breadcrumb 面包屑"
                          },
                          {
                            value: "dropdown",
                            label: "Dropdown 下拉菜单"
                          },
                          {
                            value: "steps",
                            label: "Steps 步骤条"
                          }
                        ]
                      },
                      {
                        value: "others",
                        label: "Others",
                        children: [
                          {
                            value: "dialog",
                            label: "Dialog 对话框"
                          },
                          {
                            value: "tooltip",
                            label: "Tooltip 文字提示"
                          },
                          {
                            value: "popover",
                            label: "Popover 弹出框"
                          },
                          {
                            value: "card",
                            label: "Card 卡片"
                          },
                          {
                            value: "carousel",
                            label: "Carousel 走马灯"
                          },
                          {
                            value: "collapse",
                            label: "Collapse 折叠面板"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    value: "ziyuan",
                    label: "资源",
                    children: [
                      {
                        value: "axure",
                        label: "Axure Components"
                      },
                      {
                        value: "sketch",
                        label: "Sketch Templates"
                      },
                      {
                        value: "jiaohu",
                        label: "组件交互文档"
                      }
                    ]
                  }
                ]
              },
              radio: {
                style: "height: 32px;line-height: 42px;",
                xType: "radio",
                show: true,
                label: "单选按钮",
                model: "radio",
                dic: [
                  { label: "单选一", value: 1 },
                  { label: "单选二", value: 2 }
                ]
                // dic: {
                //   label: "label",
                //   value: "value",
                //   data: [
                //     { label: "单选一", value: 1 },
                //     { label: "单选二", value: 2 }
                //   ]
                // }
              },
              checkbox: {
                // style: "height: 32px;line-height: 32px;",
                xType: "checkbox",
                model: "checkbox",
                show: true,
                label: "多选按钮",
                dic: {
                  label: "label",
                  value: "value",
                  data: [
                    { label: "多选一", value: 1 },
                    { label: "多选二", value: 2 }
                  ]
                }
              },
              xColorPicker: {
                // style: "height: 32px;line-height: 32px;",
                show: true,
                label: "颜色选择器",
                xType: "colorPicker",
                model: "colorPicker"
              },
              inputNumber: {
                xType: "inputNumber",
                model: "inputNumber",
                show: true,
                label: "数字增减框",
                min: 0,
                max: 10
              },

              xRate: {
                style: "height: 40px;line-height: 40px;",
                xType: "rate",
                show: true,
                label: "评价",
                model: "rate"
              },
              slider: {
                xType: "slider",
                show: true,
                label: "拉条",
                model: "slider"
              },
              switch: {
                xType: "switch",
                show: true,
                label: "开关",
                model: "switch",
                activeText: "按月付费",
                inactiveText: "按年付费"
              },
              timePicker: {
                xType: "timePicker",
                show: true,
                label: "时间选择器",
                model: "timePicker",
                valueFormat: "yyyy-MM-dd hh:mm:ss"
              },
              timeSelect: {
                xType: "timeSelect",
                show: true,
                label: "时间下拉选择器",
                labelLineFeed: true, //label 换行
                model: "timeSelect",
                valueFormat: "yyyy-MM-dd hh:mm"
              },
              selectTree: {
                // xType: "select",
                xType: "selecttree",
                model: "selectTree",
                show: false,
                label: "下拉树节点",
                multiple: true,
                // valueType: "money",
                // valueType: "number",
                dic: {
                  data: [
                    {
                      id: 1,
                      label: "一级 2",
                      children: [
                        {
                          id: 3,
                          label: "二级 2-1",
                          children: [
                            {
                              id: 4,
                              label: "三级 3-1-1"
                            },
                            {
                              id: 5,
                              label: "三级 3-1-2",
                              disabled: true
                            }
                          ]
                        },
                        {
                          id: 2,
                          label: "二级 2-2",
                          disabled: true,
                          children: [
                            {
                              id: 6,
                              label: "三级 3-2-1"
                            },
                            {
                              id: 7,
                              label: "三级 3-2-2",
                              disabled: true
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  // value: "label", //选中显示的字段 不填就默认使用label对应的字段  都不填默认使用value字段的值
                  label: "label",
                  children: "children",
                  defaultExpandAll: false
                }
              },
              progress: {
                style: "height: 40px;line-height: 40px;",
                xType: "progress",
                show: true,
                label: "进度条",
                // percentage: 25, //优先使用此数值
                model: "percentage" //没有percentage 就使用model
                // type: "circle"
                // status: "success"
                // textInside: true//type=line 生效
              },
              xButton: {
                xType: "button",
                show: true,
                label: "按钮",
                click: "clickHandler",
                round: true,
                eicon: "el-icon-edit",
                text: () => {
                  return "提交" + this.formDataB.form.childrenForm.firstName;
                }
              },
              tabs: {
                xType: "tabs",
                show: true,
                label: "切换栏",
                slot: "emailInput",
                model: "tabs",
                dic: {
                  label: "label",
                  value: "value", //不配置默认使用name
                  data: [
                    {
                      label: "用户管理",
                      value: "first",
                      slot: "emailInput",
                      closable: true
                    },
                    { label: "配置管理", value: "second", slot: "selfSlot" },
                    { label: "角色管理", value: "third", slot: "accTable" }
                  ]
                },
                tabClick: (tab, event) => {
                  console.log("tabClick", tab, event);
                },
                edit: (targetName, action) => {
                  console.log("edit", targetName, action);
                }
              },
              transfer: {
                xType: "transfer",
                show: false,
                label: "穿梭框",
                model: "transfer",
                span: 12,
                props: {
                  key: "key",
                  label: "name"
                },
                data: [
                  { key: 1, id: 1, name: "001" },
                  { key: 2, id: 2, name: "002" }
                ]
              },
              tree: {
                xType: "tree",
                // type: "tree",
                span: 12,
                show: false,
                label: "树节点",
                model: "tree",
                showCheckbox: true,
                dic: {
                  data: [
                    {
                      id: 1,
                      label: "一级 2",
                      children: [
                        {
                          id: 3,
                          label: "二级 2-1",
                          children: [
                            {
                              id: 4,
                              label: "三级 3-1-1"
                            },
                            {
                              id: 5,
                              label: "三级 3-1-2",
                              disabled: true
                            }
                          ]
                        },
                        {
                          id: 2,
                          label: "二级 2-2",
                          disabled: true,
                          children: [
                            {
                              id: 6,
                              label: "三级 3-2-1"
                            },
                            {
                              id: 7,
                              label: "三级 3-2-2",
                              disabled: true
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  value: "value",
                  label: "label",
                  children: "children",
                  defaultExpandAll: false
                },
                check: "checkHandler",
                // check: (clickNode, status) => {
                //   console.log("check", clickNode, status);
                // },
                nodeClick: data => {
                  console.log("nodeClick", data);
                }
              }
            }
          },
          cardB: {
            // showHeader: true,
            // leftBorderShow: true,
            // headerName: "附件",
            // subHeaderName: "描述标题", //描述标题
            titleConfig: {
              show: true,
              leftBorderShow: true,
              text: "附件",
              subtext: "描述标题"
            },
            headerRightConfig: {
              show: true,
              list: {
                xButton: {
                  xType: "button",
                  label: "",
                  // style: { cursor: "default" },
                  // type: "text",
                  show: true,
                  click: () => {
                    console.log("5555");
                  },
                  disabled: true,
                  round: true,
                  eicon: "el-icon-edit",
                  text: "按时间"
                },
                xButton2: {
                  xType: "button",
                  label: "",
                  // style: { cursor: "default" },
                  // type: "text",
                  show: true,
                  click: () => {
                    console.log("5555");
                  },
                  // disabled: true,
                  // round: true,
                  eicon: "el-icon-edit",
                  text: "按时间节点过滤"
                },
                input: {
                  xType: "input",
                  label: "权限",
                  rightButton: true, //右边搜索按钮
                  // style: "position:relative;top:5px",
                  //value input的值
                  click: (e, value) => {
                    console.log("e,value", e, value);
                  },
                  // type: "text",
                  show: true
                },
                uploadBtn: {
                  xType: "upload",
                  show: true,
                  // type: "text",
                  // label: "上传",
                  uploadButtonName: "上传",
                  round: true,
                  tip: "",
                  headers: {
                    Authorization
                  },
                  action,
                  onProgress: event => {
                    this.formDataB.form.percentage = parseInt(event.percent);
                    console.log("onProgress", parseInt(event.percent));
                    console.log(this.formDataB.form.percentage);
                  },
                  onError: (err, file, fileList) => {
                    console.log("onError", err, file, fileList);
                  },
                  onSuccess: (response, file, fileList) => {
                    console.log("onSuccess", response, file, fileList);
                  }
                }
              }
            },
            slot: "accTable" //插槽名称
            // uploadBtnShow: true,
            // seeDetails: false,
          }
        },
        // 操作按钮配置
        formFootConfig: {
          show: true, //显示脚部按钮操作区
          backgroundNone: true, // 去除按钮背景色
          class: "footerClass",
          list: {
            center: {
              justify: "center",
              span: 8,
              offset: 8,
              show: true,
              list: {
                saveInfo: {
                  xType: "button",
                  //   disabled:true,
                  type: "info",
                  show: () => {
                    return true;
                  },
                  // click: "submitHandler",//可配字符串或者方法
                  click: () => {
                    //
                    console.log(
                      "formateOutFormMoneyToNum:",
                      self.$refs.xForm.formateOutFormMoneyToNum()
                    );
                    // 表单验证方法一
                    this.$refs.xForm
                      .validate()
                      .then(() => {
                        console.log("表单验证方法一成功");
                      })
                      .catch(() => console.log("表单验证方法一失败"));
                    // 表单验证方法二
                    this.$refs.xForm.validate(valid => {
                      console.log("表单验证方法二", valid);
                    });
                  },
                  round: true,
                  eicon: "el-icon-edit",
                  text: "保存00",
                  size: "small"
                },
                resetFields: {
                  xType: "button",
                  //   disabled:true,
                  show: true,
                  // click: "resetFields",
                  click: () => {
                    // 清除校验
                    this.$refs.xForm.resetFields();
                    console.log("点击取消");
                  },
                  round: true,
                  // icon: "el-icon-edit",
                  text: "重置表单",
                  size: "small"
                },
                clearValidate: {
                  xType: "button",
                  //   disabled:true,
                  show: true,
                  click: () => {
                    // 清除校验
                    this.$refs.xForm.clearValidate();
                    console.log("点击取消");
                  },
                  type: "danger",
                  round: true,
                  // icon: "el-icon-edit",
                  text: "清除检验",
                  size: "small"
                }
              }
            }
          }
        }
      },
      configData: {
        list: {
          input: {
            xType: "input",
            // type: "number",
            model: "name",
            valueType: "money",
            // valueType: "number",
            placeholder: "请输入金额",
            // suffixIcon: "el-icon-search",
            slotsuffix: "%", //自定义末尾标识名称
            // change: "changeClickName",
            clear: val => {
              console.log("clear", val);
            },
            change: val => {
              console.log("change", val);
            },
            input: val => {
              console.log("input", val);
            },
            blur: val => {
              console.log("blur", val);
            },
            focus: val => {
              console.log("focus", val);
            }
            // readonly: false,
            // disabled: true,
            // value: "多发高发"
          },
          select: {
            xType: "select",
            // type: "select",
            model: "age",
            // valueType: "money",
            // valueType: "number",
            dic: {
              label: "name",
              value: "id",
              data: [{ id: 1, name: "ddddd" }]
            },
            allowCreate: true,
            filterable: true,
            multiple: true,
            placeholder: "请输入年龄",

            // change: "changeClickName",
            removeTag: val => {
              console.log("removeTag", val);
            },
            // clear: val => {
            //   console.log("clear", val);
            // },
            change: "changeSelect",
            // input: val => {
            //   console.log("input", val);
            // },
            blur: "blurChange"
            // focus: val => {
            //   console.log("focus", val);
            // }
            // readonly: false,
            // disabled: true,
            // value: "多发高发"
          },
          datePicker: {
            xType: "datePicker",
            model: "year",
            valueFormat: "yyyy-MM-dd"
          },
          autocomplete: {
            xType: "autocomplete",
            model: "autocomplete",
            // value: "value",
            // value: "value",
            // name: "value",
            // label: "value",
            valueKey: "value",
            //搜索使用数据
            fetchSuggestions: (queryString, cb) => {
              let results = [
                {
                  id: 1,
                  value: "三全鲜食（北新泾店）",
                  address: "长宁区新渔路144号"
                },
                {
                  id: 2,
                  value: "Hot honey 首尔炸鸡（仙霞路）",
                  address: "上海市长宁区淞虹路661号"
                },
                {
                  id: 3,
                  value: "新旺角茶餐厅",
                  address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
                },
                {
                  id: 4,
                  value: "泷千家(天山西路店)",
                  address: "天山西路438号"
                },
                {
                  id: 5,
                  value: "胖仙女纸杯蛋糕（上海凌空店）",
                  address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
                }
              ];
              if (queryString) {
                let copyresults = results.filter(result => {
                  if (result.value.indexOf(queryString) != -1) {
                    return true;
                  }
                  return false;
                });
                //下拉数据使用
                cb(copyresults);
              } else {
                //下拉数据使用
                cb(results);
              }
              // console.log(queryString, cb);
            }
            // valueFormat: "yyyy-MM-dd"
          },
          cascader: {
            xType: "cascader",
            model: "cascader",
            props: { expandTrigger: "hover" },
            options: [
              {
                value: "zhinan",
                label: "指南",
                disabled: true,
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      { id: 1, value: "yizhi", label: "一致" },
                      { id: 2, value: "fankui", label: "反馈" },
                      { id: 3, value: "xiaolv", label: "效率" },
                      { id: 4, value: "kekong", label: "可控" }
                    ]
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      { id: 5, value: "cexiangdaohang", label: "侧向导航" },
                      { id: 6, value: "dingbudaohang", label: "顶部导航" }
                    ]
                  }
                ]
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局"
                      },
                      {
                        value: "color",
                        label: "Color 色彩"
                      },
                      {
                        value: "typography",
                        label: "Typography 字体"
                      },
                      {
                        value: "icon",
                        label: "Icon 图标"
                      },
                      {
                        value: "button",
                        label: "Button 按钮"
                      }
                    ]
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框"
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框"
                      },
                      {
                        value: "input",
                        label: "Input 输入框"
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器"
                      },
                      {
                        value: "select",
                        label: "Select 选择器"
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器"
                      },
                      {
                        value: "switch",
                        label: "Switch 开关"
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块"
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器"
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器"
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器"
                      },
                      {
                        value: "upload",
                        label: "Upload 上传"
                      },
                      {
                        value: "rate",
                        label: "Rate 评分"
                      },
                      {
                        value: "form",
                        label: "Form 表单"
                      }
                    ]
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格"
                      },
                      {
                        value: "tag",
                        label: "Tag 标签"
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条"
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件"
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页"
                      },
                      {
                        value: "badge",
                        label: "Badge 标记"
                      }
                    ]
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告"
                      },
                      {
                        value: "loading",
                        label: "Loading 加载"
                      },
                      {
                        value: "message",
                        label: "Message 消息提示"
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框"
                      },
                      {
                        value: "notification",
                        label: "Notification 通知"
                      }
                    ]
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单"
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页"
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑"
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单"
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条"
                      }
                    ]
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框"
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示"
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框"
                      },
                      {
                        value: "card",
                        label: "Card 卡片"
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯"
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板"
                      }
                    ]
                  }
                ]
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components"
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates"
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档"
                  }
                ]
              }
            ]
          },
          checkbox: {
            style: "height: 32px;line-height: 32px;",
            xType: "checkbox",
            model: "checkbox",
            dic: {
              label: "label",
              value: "value",
              data: [
                { label: "多选一", value: 1 },
                { label: "多选二", value: 2 }
              ]
            }
          },
          xColorPicker: {
            style: "height: 32px;line-height: 32px;",
            xType: "colorPicker",
            model: "colorPicker"
          },
          inputNumber: {
            xType: "inputNumber",
            model: "inputNumber",
            min: 0,
            max: 10
          },
          radio: {
            style: "height: 32px;line-height: 42px;",
            xType: "radio",
            model: "radio",
            dic: [
              { label: "单选一", value: 1 },
              { label: "单选二", value: 2 }
            ]
            // dic: {
            //   label: "label",
            //   value: "value",
            //   data: [
            //     { label: "单选一", value: 1 },
            //     { label: "单选二", value: 2 }
            //   ]
            // }
          },
          xRate: {
            xType: "rate",
            model: "rate"
          },
          slider: {
            xType: "slider",
            model: "slider"
          },
          switch: {
            xType: "switch",
            model: "switch",
            activeText: "按月付费",
            inactiveText: "按年付费"
          },
          timePicker: {
            xType: "timePicker",
            model: "timePicker",
            valueFormat: "yyyy-MM-dd hh:mm:ss"
          },
          timeSelect: {
            xType: "timeSelect",
            model: "timeSelect",
            valueFormat: "yyyy-MM-dd hh:mm"
          },
          transfer: {
            xType: "transfer",
            model: "transfer",
            props: {
              key: "key",
              label: "name"
            },
            data: [
              { key: 1, id: 1, name: "001" },
              { key: 2, id: 2, name: "002" }
            ]
          },
          tree: {
            xType: "tree",
            // type: "tree",
            model: "tree",
            showCheckbox: true,
            dic: {
              data: [
                {
                  id: 1,
                  label: "一级 2",
                  children: [
                    {
                      id: 3,
                      label: "二级 2-1",
                      children: [
                        {
                          id: 4,
                          label: "三级 3-1-1"
                        },
                        {
                          id: 5,
                          label: "三级 3-1-2",
                          disabled: true
                        }
                      ]
                    },
                    {
                      id: 2,
                      label: "二级 2-2",
                      disabled: true,
                      children: [
                        {
                          id: 6,
                          label: "三级 3-2-1"
                        },
                        {
                          id: 7,
                          label: "三级 3-2-2",
                          disabled: true
                        }
                      ]
                    }
                  ]
                }
              ],
              value: "value",
              label: "label",
              children: "children",
              defaultExpandAll: false
            },
            check: "checkHandler",
            // check: (clickNode, status) => {
            //   console.log("check", clickNode, status);
            // },
            nodeClick: data => {
              console.log("nodeClick", data);
            }
          },
          selectTree: {
            // style: { width: "100%" },
            // xType: "select",
            xType: "selecttree",
            model: "selectTree",
            multiple: true,
            // valueType: "money",
            // valueType: "number",
            dic: {
              data: [
                {
                  id: 1,
                  label: "一级 2",
                  children: [
                    {
                      id: 3,
                      label: "二级 2-1",
                      children: [
                        {
                          id: 4,
                          label: "三级 3-1-1"
                        },
                        {
                          id: 5,
                          label: "三级 3-1-2",
                          disabled: true
                        }
                      ]
                    },
                    {
                      id: 2,
                      label: "二级 2-2",
                      disabled: true,
                      children: [
                        {
                          id: 6,
                          label: "三级 3-2-1"
                        },
                        {
                          id: 7,
                          label: "三级 3-2-2",
                          disabled: true
                        }
                      ]
                    }
                  ]
                }
              ],
              // value: "label", //选中显示的字段 不填就默认使用label对应的字段  都不填默认使用value字段的值
              label: "label",
              children: "children",
              defaultExpandAll: false
            }
          },
          progress: {
            xType: "progress",
            // percentage: 25, //优先使用此数值
            model: "percentage" //没有percentage 就使用model
            // type: "circle"
            // status: "success"
            // textInside: true//type=line 生效
          },
          upload: {
            xType: "upload",
            uploadButtonName: "上传附件",
            tip: "",
            headers: {
              Authorization
            },
            action,
            onProgress: event => {
              this.formDataB.form.percentage = parseInt(event.percent);
              console.log("onProgress", parseInt(event.percent));
              console.log(this.formDataB.form.percentage);
            },
            onError: (err, file, fileList) => {
              console.log("onError", err, file, fileList);
            },
            onSuccess: (response, file, fileList) => {
              console.log("onSuccess", response, file, fileList);
            }
          },
          xButton: {
            xType: "button",
            click: "clickHandler",
            round: true,
            eicon: "el-icon-edit",
            text: "提交"
          },
          tabs: {
            xType: "tabs",
            model: "tabs",
            dic: {
              label: "label",
              value: "value", //不配置默认使用name
              data: [
                {
                  label: "用户管理",
                  value: "first",
                  slot: "slotA",
                  closable: true
                },
                { label: "配置管理", value: "second", slot: "slotB" },
                { label: "角色管理", value: "third", slot: "slotC" }
              ]
            },
            tabClick: (tab, event) => {
              console.log("tabClick", tab, event);
            },
            edit: (targetName, action) => {
              console.log("edit", targetName, action);
            }
          }
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    // 计算姓名
    allName() {
      // let firstName = this.formDataB.form.firstName;
      // let lastName = this.formDataB.form.lastName;
      // if (firstName && lastName) {
      return this.formDataB.form.firstName + this.formDataB.form.lastName;
      // }
      // return "";
    }
  },
  //监控data中的数据变化
  watch: {
    // "formDataB.formConfig.cardA.list.upload.fileList": {
    //   handler(val) {
    //     console.log("fileList", val);
    //   },
    //   deep: true
    // },
    // "selfTableConfig.data": {
    //   handler(val) {
    //     console.log("selfTableConfig.data", val);
    //   },
    //   deep: true
    // },
    // "selfTableConfig.page": {
    //   handler(val) {
    //     console.log("selfTableConfig.page", val);
    //   },
    //   deep: true
    // },
    // 监听 计算姓名 并且赋值给 this.formDataB.form.allName 达到计算属性
    // 监听 计算姓名 并且赋值给 this.formDataB.form.allName 达到计算属性
    allName: function(allName) {
      // if (allName) {
      this.$set(this.formDataB.form, "allName", allName);
      // }
    }
    // "formDataB.form": {
    //   handler(val) {
    //     console.log("formDataB.form", val);
    //   },
    //   deep: true
    // }
  },
  //方法集合
  methods: {
    setdisabled() {
      console.log("setdisabled", this.formDataB.form.lastName);
      return this.formDataB.form.lastName == "名字";
    },
    clickhandle() {
      console.log(55555555555);
    },
    // 分页
    // getList() {
    //   var self = this;
    //   setTimeout(() => {
    //     self.$set(self.selfTableConfig.page, "pageNum", 1);
    //   }, 2000);
    // console.log("handleCurrentChange", val);
    // },
    // 获取动态组件类型
    getComponentType: getComponentType,
    // 数据回调
    watchCallBackFun(obj) {
      // this.$emit("watchCallBackFun", { ...obj, list: this.outForm });
      if (this[obj.name]) {
        this[obj.name]();
      }
      console.log("数据回调", obj);
    },
    /**重置表单 */
    resetFields() {
      // console.log("重置表单点击");
      this.$refs.xForm.resetFields();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // setInterval(() => {
    //   // xForm
    //   this.formDataB.form.childrenForm.obj.moneyInput = parseInt(
    //     Math.random() * 10000
    //   );
    //   this.formDataB.form.childrenForm.obj.defaultInput = parseInt(
    //     Math.random() * 10000
    //   );
    //   this.$refs.xForm.setComdify();
    this.$set(
      this.formDataB.form,
      "defaultInput",
      parseInt(Math.random() * 100000)
    );
    this.$set(
      this.formDataB.form,
      "moneyInput",
      parseInt(Math.random() * 100000)
    );
    //   this.$set(
    //     this.formDataB.formConfig.cardA.list.defaultInput,
    //     "label",
    //     "输入框" + parseInt(Math.random() * 100)
    //   );
    //   this.$set(
    //     this.selfTableConfig.table,
    //     "selection",
    //     parseInt(Math.random() * 100) % 2 ? "radio" : ""
    //   );
    //   // this.$set(
    //   //   this.selfTableConfig.table.operate.operateArr.button2,
    //   //   "show",
    //   //   Boolean(parseInt(Math.random() * 100) % 2)
    //   // );
    //   // this.formDataB.form["defaultInput"] = "";
    // console.log(555, this.formDataB.form.moneyInput);
    // }, 2000);
  },
  beforeCreate() {
    // console.time("form加载耗时");
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    // console.timeEnd("form加载耗时");
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类 */
/deep/.footerClass {
  color: red;
}

.box {
  background: #ccc;
}
</style>
