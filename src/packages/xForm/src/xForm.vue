<!--
 * @Author: your name
 * @Date: 2021-07-12 14:16:07
 * @LastEditTime: 2021-11-16 10:26:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\common\xForm\xForm.vue
-->
<!--  -->
<template>
  <div class="myforms">
    <!-- <slot></slot> -->
    <MyFormHeader
      :header-config="formDataConfig.headerConfig"
      @watchCallBackFun="watchCallBackFun"
    ></MyFormHeader>
    <div
      :class="{
        fix_title:
          formDataConfig.headerConfig != undefined &&
          formDataConfig.headerConfig.show
            ? true
            : false
      }"
    >
      <!-- :rules="formDataConfig.rules"  移除-->
      <el-form
        :ref="formDataConfig.ref || 'form'"
        :model="formDataConfig.form"
        :class="{
          form_item_r: true,
          date_picker: true
        }"
        label-position="left"
        :inline="formDataConfig.inline"
        :label-width="formDataConfig.labelWidth || '100px'"
        :label-suffix="formDataConfig.labelSuffix"
        :hide-required-asterisk="formDataConfig.hideRequiredAsterisk"
        :show-message="formDataConfig.showMessage"
        :inline-message="formDataConfig.inlineMessage"
        :status-icon="formDataConfig.statusIcon"
        :validate-on-rule-change="formDataConfig.validateOnRuleChange"
        :size="formDataConfig.size"
        :disabled="computeBoolen(formDataConfig.disabled)"
        @validate="
          (a, b, c) => computeFunction(formDataConfig.validate, a, b, c)
        "
      >
        <template v-for="(form, key) in formDataConfig.formConfig">
          <el-card
            v-if="computeBoolen(form.show, true)"
            :style="form.style"
            :key="key"
            :class="{
              'box-card': true,
              contract_info_card: true,
              clean: true,
              noPaddingLeftRight: form.noPaddingLeftRight,
              noBorder: form.noBorder,
              ...form.class
            }"
            :body-style="form.bodyStyle"
            :shadow="form.cardShadow ? form.cardShadow : 'always'"
          >
            <!-- collapse -->
            <template v-if="form.collapse">
              <el-collapse class="accordion" accordion>
                <el-collapse-item>
                  <template slot="title">
                    <div
                      style="position: relative"
                      v-if="form.titleConfig && form.titleConfig.show"
                      slot="header"
                    >
                      <span
                        v-if="form.titleConfig.leftBorderShow"
                        style="top: 16px"
                        class="blue_border"
                      ></span>
                      <h3
                        :style="
                          form.titleConfig.leftBorderShow
                            ? 'margin:0px 0px 0 18px;badding:0px;'
                            : 'margin:0px;badding:0px;'
                        "
                        class="header_class"
                      >
                        {{ form.titleConfig.text }}
                      </h3>
                      <span class="sub_title">{{
                        form.titleConfig.subtext
                      }}</span>
                      <div
                        v-if="
                          formDataConfig.formItemDisabled == undefined
                            ? true
                            : !computeBoolen(formDataConfig.formItemDisabled)
                        "
                        class="upload_class"
                      ></div>
                    </div>
                  </template>
                  <div style="padding-top: 20px; border-top: 1px solid #ebebeb">
                    <el-row>
                      <el-col :span="24">
                        <slot :name="form.slot"></slot>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </template>
            <template v-else>
              <!-- titleConfig -->
              <div
                :style="{ ...form.titleConfig.style, position: 'relative' }"
                v-if="
                  form.titleConfig &&
                    !form.titleConfig.slot &&
                    form.titleConfig.show
                "
                slot="header"
              >
                <span
                  v-if="form.titleConfig.leftBorderShow"
                  class="blue_border"
                ></span>
                <h3
                  :style="
                    form.titleConfig.leftBorderShow
                      ? 'margin:0px 0px 0 18px;badding:0px;'
                      : 'margin:0px;badding:0px;'
                  "
                  class="header_class"
                >
                  {{ form.titleConfig.text }}
                </h3>
                <span class="sub_title">{{ form.titleConfig.subtext }}</span>
                <div
                  v-if="
                    form.headerRightConfig &&
                      computeBoolen(form.headerRightConfig.show, true)
                  "
                  class="upload_class"
                >
                  <el-form :inline="true" class="demo-form-inline">
                    <template
                      v-for="(formItem, formkey) in form.headerRightConfig.list"
                    >
                      <el-form-item
                        v-if="computeBoolen(formItem.show, true)"
                        :key="formkey"
                        :label="formItem.label"
                      >
                        <component
                          :key="formkey"
                          :is="getComponentType(formItem)"
                          v-model="formDataConfig.form[formItem.model]"
                          :propData="formDataConfig.form[formItem.model]"
                          :config="formItem"
                          @watchCallBackFunItem="watchCallBackFun"
                        >
                        </component>
                      </el-form-item>
                    </template>
                  </el-form>
                </div>
              </div>
              <!-- titleConfig.slot -->
              <template
                v-if="
                  form.titleConfig &&
                    form.titleConfig.slot &&
                    form.titleConfig.show
                "
              >
                <slot :name="form.titleConfig.slot"></slot>
              </template>
              <!-- formDataConfig -->
              <el-row v-if="form.list" :gutter="formDataConfig.gutter || 80">
                <span v-for="(formItem, formKey) in form.list" :key="formKey">
                  <el-col
                    style="padding-left: 20px; padding-right: 20px"
                    v-if="
                      formItem.show &&
                        formItem.type == 'divider' &&
                        !formItem.soltFlag
                    "
                  >
                    <el-divider v-if="formItem.type == 'divider'"></el-divider>
                  </el-col>
                  <el-col
                    v-show="formItem.type != 'divider'"
                    v-if="
                      formItem.itemShow == undefined
                        ? formItem.show
                        : formItem.itemShow
                    "
                    :style="'position: relative;'"
                    :span="formItem.span || 8"
                    :offset="formItem.offset"
                    :push="formItem.push"
                    :pull="formItem.pull"
                    :class="{
                      hideClass: formItem.itemShow,
                      onlyUnderLine: computeBoolen(form.enableSelfDisabled)
                        ? formItem.line
                        : formDataConfig.formItemDisabled == undefined
                        ? formItem.line
                        : computeBoolen(formDataConfig.formItemDisabled),
                      garyClass:
                        !computeBoolen(formDataConfig.formItemDisabled) &&
                        formItem.gary
                    }"
                  >
                    <!-- form-item -->
                    <el-form-item
                      v-if="computeBoolen(formItem.show, true)"
                      :class="{
                        reset: formItem.labelLineFeed,
                        labelDisabled: computeBoolen(
                          formDataConfig.formItemDisabled
                        )
                          ? false
                          : formItem.labelDisabled == undefined
                          ? false
                          : formItem.labelDisabled && formItem.disabled
                      }"
                      :label="formItem.label"
                      :label-width="formItem.labelWidth"
                      :prop="
                        form.model != undefined &&
                        form.modelChildren != undefined
                          ? `${form.model}.${form.modelChildren}.${formItem.model}`
                          : form.model != undefined &&
                            form.modelChildren == undefined
                          ? `${form.model}.${formItem.model}`
                          : formItem.model
                      "
                      :rules="formItem.rules"
                    >
                      <span v-if="formItem.type == 'title'">{{
                        formItem.name
                      }}</span>
                      <slot
                        v-if="getComponentType(formItem) === 'slot'"
                        :name="formItem.name"
                      />

                      <!-- 二级form 数组-->
                      <component
                        v-if="
                          form.model != undefined &&
                            form.modelChildren != undefined
                        "
                        :is="getComponentType(formItem)"
                        :key="formItem.model"
                        v-model="
                          formDataConfig.form[form.model][form.modelChildren][
                            formItem.model
                          ]
                        "
                        :propData="
                          formDataConfig.form[form.model][form.modelChildren][
                            formItem.model
                          ]
                        "
                        :config="
                          formateFormItemDisabled(
                            formItem,
                            form,
                            formDataConfig,
                            computeBoolen
                          )
                        "
                        @watchCallBackFunItem="watchCallBackFun"
                      >
                        <template
                          v-if="
                            formItem.prepend || formItem.append || formItem.slot
                          "
                          #[(formItem.prepend||formItem.append||formItem.slot)]="scope"
                        >
                          <slot
                            :name="
                              formItem.prepend ||
                                formItem.append ||
                                formItem.slot
                            "
                            v-bind="scope"
                          />
                        </template>
                      </component>
                      <!-- 二级form -->
                      <component
                        v-else-if="
                          form.model != undefined &&
                            form.modelChildren == undefined
                        "
                        :is="getComponentType(formItem)"
                        :key="formItem.model"
                        v-model="
                          formDataConfig.form[form.model][formItem.model]
                        "
                        :propData="
                          formDataConfig.form[form.model][formItem.model]
                        "
                        :config="
                          formateFormItemDisabled(
                            formItem,
                            form,
                            formDataConfig,
                            computeBoolen
                          )
                        "
                        @watchCallBackFunItem="watchCallBackFun"
                      >
                        <template
                          v-if="
                            formItem.prepend || formItem.append || formItem.slot
                          "
                          #[(formItem.prepend||formItem.append||formItem.slot)]="scope"
                        >
                          <slot
                            :name="
                              formItem.prepend ||
                                formItem.append ||
                                formItem.slot
                            "
                            v-bind="scope"
                          />
                        </template>
                      </component>
                      <!-- 一级form -->
                      <component
                        v-else
                        :is="getComponentType(formItem)"
                        :key="formItem.model"
                        v-model="formDataConfig.form[formItem.model]"
                        :propData="formDataConfig.form[formItem.model]"
                        :config="
                          formateFormItemDisabled(
                            formItem,
                            form,
                            formDataConfig,
                            computeBoolen
                          )
                        "
                        @watchCallBackFunItem="watchCallBackFun"
                      >
                        <template
                          v-if="
                            formItem.prepend || formItem.append || formItem.slot
                          "
                          #[(formItem.prepend||formItem.append||formItem.slot)]="scope"
                        >
                          <slot
                            :name="
                              formItem.prepend ||
                                formItem.append ||
                                formItem.slot
                            "
                            v-bind="scope"
                          />
                        </template>
                        <!-- slot 传递 -->
                        <!-- <template slot="prepend">Http://</template> -->
                        <!-- <template
                          slot="prepend"
                          v-if="typeof formItem.prepend == 'string'"
                        >
                          <slot :name="formItem.prepend"></slot>
                        </template>
                        <template
                          slot="append"
                          v-if="typeof formItem.append == 'string'"
                        >
                          <slot :name="formItem.append"></slot>
                        </template> -->
                      </component>

                      <el-alert
                        v-if="formItem.type == 'alert'"
                        :closable="false"
                        :title="formItem.title"
                        :type="formItem.styleType"
                        show-icon
                      >
                      </el-alert>
                    </el-form-item>
                    <!-- formItem.border -->
                    <span
                      v-if="formItem.border"
                      :style="formItem.borderStyle || ''"
                      class="line_border"
                    ></span>
                  </el-col>
                  <!-- formItem.soltFlag -->
                  <el-col v-if="formItem.soltFlag || false" :span="24">
                    <template v-if="formItem.outSide">
                      <slot :name="formItem.soltName"></slot>
                    </template>
                    <el-form-item v-else>
                      <slot :name="formItem.soltName"></slot>
                    </el-form-item>
                  </el-col>
                </span>
              </el-row>
              <!-- form.slot -->
              <el-row v-else>
                <el-col :span="24">
                  <slot :name="form.slot"></slot>
                </el-col>
              </el-row>
            </template>
          </el-card>
        </template>
      </el-form>
    </div>
    <MyFormFooter
      :foot-config="formDataConfig.formFootConfig"
      @watchCallBackFun="watchCallBackFun"
    ></MyFormFooter>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import {
  getComponentType,
  delcommafy,
  comdify
} from "../../utils/xElementJs/defaultFunction";
const MyInput = () => import("../../xInput/src/xInput.vue");
const MySelect = () => import("../../xSelect/src/xSelect.vue");
const MyDatePicker = () => import("../../xDatePicker/src/xDatePicker.vue");
const MyAutocomplete = () =>
  import("../../xAutocomplete/src/xAutocomplete.vue");
const MyCascader = () => import("../../xCascader/src/xCascader.vue");
const MyCheckbox = () => import("../../xCheckbox/src/xCheckbox.vue");
const MyColorPicker = () => import("../../xColorPicker/src/xColorPicker.vue");
const MyInputNumber = () => import("../../xInputNumber/src/xInputNumber.vue");
const MyRadio = () => import("../../xRadio/src/xRadio.vue");
const MyRate = () => import("../../xRate/src/xRate.vue");
const MySlider = () => import("../../xSlider/src/xSlider.vue");
const MySwitch = () => import("../../xSwitch/src/xSwitch.vue");
const MyTimePicker = () => import("../../xTimePicker/src/xTimePicker.vue");
const MyTimeSelect = () => import("../../xTimeSelect/src/xTimeSelect.vue");
const MyTransfer = () => import("../../xTransfer/src/xTransfer.vue");
const MyTree = () => import("../../xTree/src/xTree.vue");
const MySelectTree = () => import("../../xSelectTree/src/xSelectTree.vue");
const MyProgress = () => import("../../xProgress/src/xProgress.vue");
const MyUpload = () => import("../../xUpload/src/xUpload.vue");
const MyButton = () => import("../../xButton/src/xButton.vue");
const MyTabs = () => import("../../xTabs/src/xTabs.vue");
import MyFormHeader from "./module/xFormHeader";
import MyFormFooter from "./module/xFormFooter";
import MyTag from "../../xTag/src/xTag.vue";
// const MyTag = () => import("../../xTag/src/xTag.vue");
export default {
  name: "myForm",
  props: {
    formDataConfig: {
      type: Object,
      default: Object
    }
  },
  //import引入的组件需要注入到对象中才能使用
  mixins: [mixinComponent()],
  components: {
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
    MyTabs,
    // MyTables,
    MyFormHeader,
    MyFormFooter,
    MyTag
  },
  data() {
    //这里存放数据
    // const self = this;
    return {
      // 自动转化千分符状态
      // autoSetComdify: true
      // outForm: this.formDataConfig.form || {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    // 保存form表单中配置有金额的字段名字 返回一个对象
    /**获取所有配置有valueType='money' 的model值 例如{moneya:true,moneyb:true}以对象的形式保存防止重复添加bug*/
    stringToNumProp() {
      // 保存需要金额转成数字的字段
      let propArr = {};
      let formConfig = this.formDataConfig.formConfig;
      for (var key in formConfig) {
        // console.log("key", key);
        for (var keyItem in formConfig[key].list) {
          let item = formConfig[key].list[keyItem];

          //输入框 配置了 valueType: "money"
          if (
            item.xType &&
            item.valueType &&
            item.xType == "input" &&
            item.valueType == "money"
          ) {
            // console.log("item", formConfig[key].model, item);
            if (formConfig[key].model) {
              //key 保存为外层的model;value保存为内层的model
              let modelName = formConfig[key].model;
              if (formConfig[key].modelChildren) {
                // 有三级配置
                modelName += `_${formConfig[key].modelChildren}`;
              }
              if (propArr[modelName] instanceof Array) {
                propArr[modelName].push(item.model);
              } else {
                propArr[modelName] = [item.model];
              }

              // console.log("formConfig[key]", formConfig[key]);
            } else {
              // 保存为内层的model
              propArr[item.model] = true;
            }
          }
        }
      }
      // console.log("propArr", propArr);
      return propArr;
    }
  },
  //监控data中的数据变化
  watch: {
    // outForm: {
    //   handler(val) {
    //     console.log("outForm", val);
    //   },
    //   deep: true
    // }
  },
  //方法集合
  methods: {
    // 手动触发 数字转千分符金额
    setComdify() {
      Object.keys(this.stringToNumProp).forEach(item => {
        // 自定将配置有金额的输入框 有数据的变成千分符 !isNaN(this.formDataConfig.form[item][this.stringToNumProp[item]])
        if (this.stringToNumProp[item] instanceof Array) {
          this.stringToNumProp[item].forEach(i => {
            let strArr = item.split("_");
            let modelName = strArr[0];
            let modelChildrenName = null;
            // 有三级配置情况下
            if (item.split("_").length == 2) {
              modelChildrenName = strArr[1];
            }
            // console.log("item", item);
            // 对应的form 是数字情况下
            // 三级配置
            if (modelChildrenName != null) {
              if (
                this.formDataConfig.form[modelName] &&
                this.formDataConfig.form[modelName][modelChildrenName] &&
                !isNaN(
                  this.formDataConfig.form[modelName][modelChildrenName][i]
                )
              ) {
                this.$set(
                  this.formDataConfig.form[modelName][modelChildrenName],
                  i,
                  comdify(
                    this.formDataConfig.form[modelName][modelChildrenName][i]
                  )
                );
                // console.log(this.formDataConfig.form[item][i], "555");
              }
            } else {
              // 二级配置情况下
              if (
                this.formDataConfig.form[modelName] &&
                this.formDataConfig.form[modelName][i]
              ) {
                this.$set(
                  this.formDataConfig.form[modelName],
                  i,
                  comdify(this.formDataConfig.form[modelName][i])
                );
                // console.log(this.formDataConfig.form[item][i], "555");
              }
            }
          });
        } else if (
          typeof this.stringToNumProp[item] == "boolean" &&
          !isNaN(this.formDataConfig.form[item])
        ) {
          // 一级form
          this.$set(
            this.formDataConfig.form,
            item,
            comdify(this.formDataConfig.form[item])
          );
          // console.log("stringToNumProp", this.formDataConfig.form[item]);
        }
      });
    },
    // 重置表单
    resetFields() {
      this.$refs[this.formDataConfig.ref || "form"].resetFields();
    },
    // 清除校验
    clearValidate() {
      this.$refs[this.formDataConfig.ref || "form"].clearValidate();
    },
    // 校验
    /**
     *@fun 自定义方法 不传  就返回一个Promise回调例如： callback().then().catch()
     
     */
    validate(fun) {
      const validPromise = new Promise((resolve, reject) => {
        this.$refs[this.formDataConfig.ref || "form"].validate((valid, obj) => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
          if (fun) {
            fun(valid, obj);
          }
        });
      });
      if (fun === undefined) {
        return validPromise;
      }
    },
    // 获取动态组件类型
    getComponentType: getComponentType,
    // 计算boolean
    // computeBool: "",
    /**
     * @formItem 表单配置item
     * @formCard 表单卡片配置数据
     * @formDataConfig 表单总配置数据（每一个都是由卡片）
     *
     * 设计思路：表单元素的disabled由 formItem的默认disabled配置和formDataConfig全局的formItemDisabled属性控制
     *formItemDisabled全局控制每个form表单元素的disabled
     *若想单独开启某一个form表单元素disabled  则开启formCard的selfDisabled即可不受全局的formItemDisabled控制
     */
    formateFormItemDisabled: (
      formItem,
      formCard,
      formDataConfig,
      computeBoolen
    ) => {
      // var self = this;

      // if (computeBoolen) {
      //   console.log("computeBoolen0000", computeBoolen(true));
      // } else {
      //   console.log("没有computeBoolen");
      // }

      if (formItem && formItem.disabled == undefined) {
        formItem["disabled"] = false;
      }
      if (formCard && formDataConfig) {
        // console.log("computeBoolen()", computeBoolen(null, "undefined"));
        // if (formItem.disabled == undefined) {
        //   formItem["disabled"] = false;
        // } else {
        formItem["disabled"] = computeBoolen(formCard.enableSelfDisabled)
          ? formItem.disabled
          : formDataConfig.formItemDisabled == undefined
          ? formItem.disabled
          : formDataConfig.formItemDisabled;
        // }
      }

      return formItem;
    },
    // 数据回调
    /**
     *@obj
     *每一个回调都有唯一的name：方法名称和 list：整个form表单的数据
     */
    watchCallBackFun(obj) {
      // this.formateOutFormMoneyProp();
      // console.log("watchCallBackFun", obj);
      setTimeout(() => {
        this.$emit("watchCallBackFun", {
          ...obj,
          list: this.formateOutFormMoneyToNum()
        });
      }, 0);

      // console.log("数据回调00000", {
      //   ...obj,
      //   list: this.formateOutFormMoneyToNum(this.outForm)
      // });
    },
    //将outForm金额的字段转化成数字
    // 返回一把所以配置有valueType='money'的金额格式化成数字的个新outForm
    /** */
    formateOutFormMoneyToNum() {
      var self = this;
      var outForm = JSON.parse(JSON.stringify(this.formDataConfig.form));

      Object.keys(self.stringToNumProp).forEach(item => {
        // 二三级form
        if (self.stringToNumProp[item] instanceof Array) {
          self.stringToNumProp[item].forEach(i => {
            let strArr = item.split("_");
            let modelName = strArr[0];
            let modelChildrenName = null;
            // 有三级配置情况下
            if (item.split("_").length == 2) {
              modelChildrenName = strArr[1];
            }
            // 三级配置
            if (
              modelChildrenName != null &&
              outForm[modelName] &&
              outForm[modelName][modelChildrenName]
            ) {
              console.log(i, outForm[modelName][modelChildrenName][i]);
              // 转成数字
              outForm[modelName][modelChildrenName][i] = delcommafy(
                outForm[modelName][modelChildrenName][i]
              );
            } else {
              // 二级
              if (outForm[modelName] && isNaN(outForm[modelName][i])) {
                outForm[modelName][i] = delcommafy(outForm[modelName][i]);
              }
            }
          });
        } else if (
          typeof self.stringToNumProp[item] == "boolean" &&
          typeof this.formDataConfig.form[item] == "string"
        ) {
          //  一级form
          //     // 将含有千分符变为数字
          outForm[item] = delcommafy(this.formDataConfig.form[item]);
        }
      });
      return outForm;
      // console.log("outForm", outForm);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.setComdify();
    // console.log("created");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log("mounted");
    // console.log("stringToNumProp", this.stringToNumProp);
    // console.log("getComponentType:", getComponentType(this.configData));
  },
  beforeCreate() {
    // console.log("beforeCreate");
  }, //生命周期 - 创建之前
  beforeMount() {
    // console.log("beforeMount");
  }, //生命周期 - 挂载之前
  beforeUpdate() {
    // console.log("beforeUpdate11");
    // 自动转化千分符
    // 有键盘事件的情况下 禁止转化千分符
    // var self = this;
    // document.onkeydown = function() {
    //   self.autoSetComdify = false;
    //   console.log("但是噶", self.autoSetComdify);
    // return;
    //事件对象兼容
    // };
    // self.$nextTick(() => {
    //   if (self.autoSetComdify) {
    //     this.setComdify();
    //   }
    // });
    // console.log("beforeUpdate22", self.autoSetComdify);
  }, //生命周期 - 更新之前
  updated() {
    // this.autoSetComdify = true;
    // console.log("updated====================================>");
  }, //生命周期 - 更新之后
  beforeDestroy() {
    // console.log("beforeDestroy");
  }, //生命周期 - 销毁之前
  destroyed() {
    // console.log("destroyed");
  }, //生命周期 - 销毁完成
  activated() {
    // console.log("activated");
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.crad_header {
  text-align: left;
  position: relative;
  overflow: hidden;
  padding-left: 15px;
  font-weight: 800;
}
.header_class {
  display: inline-block;
  font-weight: 800;
  font-size: 17px;
  margin-left: 8px;
}
.card_box_header::before {
  content: "";
  width: 4px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: #0072ff;
}
/deep/.el-card__header {
  border-bottom: 1px solid #ebebeb;
}
.line_border {
  display: inline-block;
  height: 5px;
  width: 15px;
  background: #b0b0b0;
  position: absolute;
  top: 30%;
  right: -18px;
}
/deep/.box-card {
  margin-bottom: 10px;
  position: relative;
  padding: 0px 20px;
}
.blue_border {
  display: inline-block;
  height: 21px;
  width: 4px;
  background: #0072ff;
  position: absolute;
  // top: 2px;
  // top: 19px;
}
.sub_title {
  display: inline-block;
  margin-left: 20px;
  font-size: 13px;
  color: #b3b3b3;
  position: relative;
  top: 2px;
}
/deep/.el-alert {
  padding: 0 20px;
}
/deep/.el-form-item__content {
  // height: 40px;
  //   overflow: hidden;
  .el-input-group {
    vertical-align: middle;
  }
}
/deep/.el-card__header {
  padding: 30px 20px 18px 0px;
}
/deep/.reset .el-form-item__label {
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 20px;
  height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
/deep/.el-input.is-disabled .el-input__inner {
  // background-color: #fff;
  color: #606266;
  // font-weight: 700;
}
/deep/.onlyUnderLine {
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-radius: 0px;
    border: transparent;
    border-bottom: 1px solid #dcdfe6;
    color: #606266;
    .el-input__prefix {
      display: none;
    }
  }

  .el-input__inner {
    border-radius: 0px;
    border: transparent;
    border-bottom: 1px solid #dcdfe6;
  }

  .el-select {
    .is-disabled {
      .el-input__suffix {
        display: none;
      }
      .el-input__prefix {
        display: none;
      }
    }
  }
  // .el-date-editor.el-input,
  // .el-date-editor.el-input__inner {
  //   .el-input__prefix {
  //     // display: none;
  //   }
  // }
}
/deep/.el-divider--horizontal {
  margin: 0px 0 15px 0;
}
/deep/.el-divider {
  background-color: #ebebeb;
}
.header_title {
  text-align: center;
  // line-height: 34px;
  font-weight: 900;
  // font-size: 17px;
  // position: relative;
}
.right-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
/deep/.upload_class {
  display: inline-block;
  text-align: right;
  position: absolute;
  right: -20px;
  top: -5px;
  // z-index: 2;
  .el-button--primary {
    color: #409eff;
    font-weight: 700;
    background-color: #fff;
    border-color: #409eff;
  }
  // .el-button--primary:hover {
  //   color: #fff;
  //   font-weight: 700;
  //   background-color: #a0cfff;
  //   border-color: #a0cfff;
  // }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .el-button--primary.is-disabled {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
  .el-button--small {
    padding: 9px 23px;
  }
  .el-upload-list {
    // margin: 10px 20px;
    // padding: 10px 20px;
    list-style: none;
    background: #fff;
    // border: 1px solid #dcdfe6;
  }
}
/deep/.upload_collapse {
  background: #fff;
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 19;
  padding: 20px 30px 20px 20px;
  width: 350px;
  .el-button--text {
    color: #303133;
  }
  .el-collapse-item__header {
    position: relative;
    font-size: 15px;
  }
  .el-collapse-item__arrow {
    font-weight: 700;
  }
  .el-button {
    font-weight: 700;
    font-size: 15px;
    z-index: 19;
  }
  .el-button:hover {
    color: #0072ff;
  }
  .el-collapse-item__header.is-active {
    border-bottom-color: "#EBEEF5";
  }
}

.closs_icon {
  position: absolute;
  right: -15px;
  top: 5px;
}
/deep/.fix_header_title {
  line-height: 30px;
  //
  // [class^="el-icon-"] {
  // font-weight: 700;
  // font-size: 1.3rem;
  //   }
  .el-button--small {
    font-size: 14px;
  }
  // position: fixed;
  // z-index: 20;
  // width: 80%;
  // background: #f4f4f4;
  // position: fixed;
  // top: 77px;
  // width: 80%;
  // z-index: 20;
  // background: #f4f4f4;
  // }
  // margin: 10px auto 4px;
  margin: 15px auto;
}
// /deep/.fix_title {
// position: relative;
// top: 45px;
// padding-top: 45px;
// }
/deep/.fix_foot {
  // position: fixed;
  // bottom: 0px;
  // z-index: 20;
  // width: 80%;
  margin: 30px auto 50px;
  text-align: center;
  background: #f4f4f4;
  .el-button--small,
  .el-button--small.is-round {
    padding: 9px 30px;
  }
  .el-button + .el-button {
    margin-left: 30px;
  }
}
.backgroundNone {
  background: none;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  // border-color: #E4E7ED;
  color: #606266;
  // cursor: not-allowed;
}
/deep/.el-radio-group {
  // border: unset;
  // border-radius: unset;
  .el-radio-button__inner {
    margin-right: 20px;
    // padding: 0 15px;
    // height: 30px;
    // line-height: 30px;
    // background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(220, 223, 230, 1);
    border-radius: 4px;
  }
  .is-active {
    .el-radio-button__inner {
      // background: rgba(83, 147, 255, 1);
      // color: #fff;
      // border: 1px solid rgba(83, 147, 255, 1);
      box-shadow: none;
    }
  }
}
.radio-group {
  position: relative;
  top: -5px;
}
/deep/.el-textarea .el-input__count {
  right: 19px;
  height: 20px;
  line-height: 20px;
  bottom: 1px;
}
/deep/.hideClass {
  height: 55px;
}
.toolIcon {
  cursor: pointer;
}
/deep/.el-form-item.is-error .el-input__inner {
  border-color: #f56c6c;
}
/deep/.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #0072ff;
}
/deep/.labelDisabled {
  .el-form-item__label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-input__prefix,
  .el-input__suffix {
    color: #c0c4cc59;
  }
  .el-input.is-disabled .el-input__inner {
    border-bottom: 1px solid #c0c4cc59;
  }
}
/deep/.noPaddingLeftRight {
  .el-card__body {
    padding: 20px 0px;
  }
}
/deep/ .noBorder {
  border: 0;
}
/deep/.garyClass {
  .el-form-item__label {
    color: #c0c4cc;
  }
  .el-input.is-disabled .el-input__inner {
    color: #c0c4cc;
  }
}
// 重置必填红星样式
/deep/.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
/deep/.el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "";
  color: #f56c6c;
  margin-right: 0;
}
// 重置必填红星样式
/deep/.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:after,
/deep/.el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:after {
  content: "*";
  color: #f56c6c;
  margin-left: 4px;
  position: relative;
  top: 2px;
}
/deep/.el-form-item__error {
  top: 88%;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  background-color: #f5f7fa;
  color: #606266;
}
/deep/.onlyUnderLine .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  color: #606266;
  border: none;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 0px;
}
</style>
