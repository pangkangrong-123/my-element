<!--  -->
<template>
  <div>
    <el-row
      v-if="headerDate.backgroundImgUrl"
      :style="
        'background: url(' +
          headerDate.backgroundImgUrl +
          ') no-repeat center 0px;background-size: 100% 120px'
      "
      class="mt20 top_box clear"
    >
      <span class="title">{{ headerDate.name }}</span>
      <span v-for="(btn, key) in headerDate.btnList" :key="key">
        <el-row v-if="btn.show" style="margin-right: 10px" class="right">
          <el-button round @click="handlerClick(btn.clickName)">
            <i v-if="btn.icon" :class="'sub_color ' + btn.icon"></i>
            <i v-else class="sub_color">{{ btn.iconParams }}</i>
            {{ btn.name }}
          </el-button>
        </el-row></span
      >
    </el-row>
    <el-form
      :model="outForm"
      ref="search"
      size="medium"
      label-position="left"
      class="clear"
    >
      <el-row :gutter="5" v-if="vShow(headerDate.toolList.show)">
        <template v-for="(list, key) in headerDate.toolList.list">
          <el-col :key="key" :span="list.span || 8" :offset="list.offset">
            <el-row
              type="flex"
              :gutter="list.gutter || 5"
              :justify="list.justify"
            >
              <template v-for="(tool, ikey) in list.items">
                <el-col
                  v-if="
                    ![
                      'searchButton',
                      'customButton',
                      'upload',
                      'moreConditionsButton'
                    ].includes(tool.type) && !tool.xType
                  "
                  :key="ikey"
                  v-show="vShow(tool.show)"
                  :span="tool.span || 8"
                  :offset="tool.offset"
                >
                  <el-form-item :prop="tool.model || tool.inputModel">
                    <Conditions :tool="tool" :outForm="outForm"></Conditions>
                  </el-form-item>
                </el-col>
                <el-button
                  :key="ikey"
                  v-else-if="tool.type == 'customButton'"
                  v-show="vShow(tool.show)"
                  :size="'mini'"
                  :class="tool.class"
                  style="margin: 0px 10px"
                  @click="handlerClick(tool.clickName, outForm)"
                  >{{ tool.buttonName }}</el-button
                >
                <!-- 这个用xtype的upload应该废弃 -->
                <MyUpload
                  :key="ikey"
                  v-else-if="tool.xType == 'upload'"
                  v-show="vShow(tool.show)"
                  :config="tool"
                ></MyUpload>
                <MyUpload
                  :key="ikey"
                  v-else-if="tool.type == 'upload'"
                  v-show="vShow(tool.show)"
                  :config="tool"
                ></MyUpload>

                <el-button
                  :key="ikey"
                  v-else-if="tool.type == 'searchButton'"
                  :size="'mini'"
                  @click="handlerClick(tool.clickName, outForm)"
                  style="color: #448aff; margin-left: 2.5px"
                  icon="el-icon-search"
                ></el-button>
                <!-- <el-button
                  :key="ikey"
                  v-else-if="tool.type == 'moreConditionsButton'"
                  :size="'mini'"
                  style="margin: 0px 10px"
                  @click="moreConditionsHidden = !moreConditionsHidden"
                  >筛选</el-button
                > -->
              </template>
              <el-button
                v-if="
                  key + 1 == headerDate.toolList.list.length &&
                    headerDate.moreConditions
                "
                :size="'mini'"
                style="margin: 0px 10px"
                @click="moreConditionsHidden = !moreConditionsHidden"
                >筛选</el-button
              >
            </el-row>
          </el-col>
        </template>
      </el-row>
      <el-row class="more-conditions" v-show="moreConditionsHidden">
        <el-col :span="21">
          <div class="conditions">
            <template v-for="(tool, key) in headerDate.moreConditions">
              <div :key="key" v-show="vShow(tool.show)" class="condition">
                <el-form-item :prop="tool.model || tool.inputModel">
                  <Conditions :tool="tool" :outForm="outForm"></Conditions>
                </el-form-item>
              </div>
            </template>
          </div>
        </el-col>
        <el-col :span="3" style="text-align:right;">
          <el-button
            @click="resetForm"
            type="text"
            size="mini"
            class="clear-form"
          >
            清空还原
          </el-button>
          <el-button
            @click="handlerClick('moreConditionsButton', outForm)"
            size="mini"
            type="primary confirm"
          >
            确定
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Conditions from "./conditions.vue";
import MyUpload from "../../xUpload/src/xUpload.vue";
export default {
  name: "myBanner",
  //import引入的组件需要注入到对象中才能使用
  components: {
    MyUpload,
    Conditions
  },
  props: {
    headerDate: {
      type: Object,
      default: () => {}
    }
  },
  provide() {
    return {
      handlerClick: this.handlerClick
    };
  },
  data() {
    //这里存放数据
    return {
      outForm: {},
      moreConditionsHidden: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    outFormList() {
      return JSON.stringify(this.outForm);
    }
  },
  //监控data中的数据变化
  watch: {
    outFormList: {
      handler(newVal, oldVal) {
        var newData = JSON.parse(newVal);
        var oldData = JSON.parse(oldVal);
        // console.log("outForm", newData, oldData);

        if (
          this.headerDate.tableToolFormWatch &&
          this.headerDate.tableToolFormWatch.length
        ) {
          for (var key in this.headerDate.tableToolFormWatch) {
            var watchData = this.headerDate.tableToolFormWatch[key];
            if (newData[watchData] != oldData[watchData]) {
              this.$emit("watchCallback", {
                name: watchData,
                list: newData || {}
              });
            }
          }
        }
      },
      deep: true
    }
  },
  //方法集合
  methods: {
    resetForm() {
      this.$refs.search.resetFields();
    },
    vShow(show = true) {
      return show;
    },
    // 过滤特殊字符
    filterStr(model, str) {
      let putStr = str.replace(/[%`~!@#$^&*()=|{}':;',<>]/gi, "");
      this.outForm[model] = putStr;
    },
    handlerClick: function(name, data = "") {
      this.$emit("watchCallback", { name: name, list: data });
    },
    datePickerValueFormat(valueFormat, type) {
      if (valueFormat) return valueFormat;
      let vf = "";
      switch (type) {
        case "date":
          vf = "yyyy-MM-dd";
          break;
        case "dates":
          vf = "yyyy-MM-dd";
          break;
        case "month":
          vf = "yyyy-MM";
          break;
        case "year":
          vf = "yyyy";
          break;
      }
      return vf;
    },
    datePickerFormat(format, type) {
      if (format) return format;
      let vf = "";
      switch (type) {
        case "date":
          vf = "yyyy-MM-dd";
          break;
        case "dates":
          vf = "yyyy-MM-dd";
          break;
        case "month":
          vf = "yyyy-MM";
          break;
        case "year":
          vf = "yyyy";
          break;
      }
      return vf;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.headerDate && this.headerDate.tableToolForm) {
      this.outForm = this.headerDate.tableToolForm;
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类 */
/deep/.mt20 {
  margin-top: 0px;
}
.top_box {
  height: 120px;
  line-height: 105px;
  padding: 0 60px;
}

.clear:after {
  content: "";
  display: block;
  clear: both;
}

.clear {
  zoom: 1;
}
.title {
  top: 36px;
  left: 42px;
  color: #e7ebfc;
  font-size: 22px;
}
.left {
  float: left;
}

.right {
  float: right;
}
/deep/[class^="el-icon-"] {
  font-weight: 700;
}
/deep/.el-radio-group {
  .el-radio-button__inner {
    margin-right: 20px;
    border: 1px solid rgba(220, 223, 230, 1);
    border-radius: 4px;
  }
  .is-active {
    .el-radio-button__inner {
      box-shadow: none;
    }
  }
}
/deep/.top_box .el-button.is-round {
  padding: 12px 30px;
}
.label {
  font-weight: 700;
  color: #909399;
  line-height: 28px;
  flex-shrink: 1;
  padding-right: 5px;
}
.selecter {
  flex: 1;
}

.el-button {
  color: #448aff;
}

// button 的可用class
.danger {
  // color: #e66968;
  color: #f56c6c;
  &:hover,
  &:focus,
  &:active {
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}

.inputSelect {
  width: 100px;
}
/deep/.el-form-item__content {
  line-height: 0px;
}
.el-form-item {
  margin-bottom: 0px;
}
.more-conditions {
  background: #fff;
  margin-top: 10px;
  padding: 15px 20px;
}
.conditions {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.condition {
  display: inline-block;
  vertical-align: top;
  margin: 5px 2.5px;
}
.clear-form {
  color: #333;
}
.confirm {
  color: #fff;
  margin-left: 20px;
}
</style>
