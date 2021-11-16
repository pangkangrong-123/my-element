<template>
  <div style="display: flex">
    <div v-if="tool.label" v-show="vShow(tool.show)" class="label">
      {{ tool.label }}
    </div>

    <div class="selecter">
      <span v-if="tool.type == 'text'" class="label"> {{ tool.name }}</span>
      <el-input
        v-if="tool.type == 'input'"
        clearable
        @input="(val) => filterStr(tool.model, val)"
        v-model="outForm[tool.model]"
        :disabled="tool.disabled"
        :size="'mini'"
        :placeholder="tool.placeholder"
        type="text"
      ></el-input>
      <el-radio-group
        v-if="tool.type == 'radio-group'"
        v-model="outForm[tool.model]"
        @change="handlerClick(tool.clickName, outForm)"
        :size="'mini'"
      >
        <el-radio-button
          v-for="(item, itemKey) in tool.list"
          :disabled="tool.disabled"
          :key="itemKey"
          :label="item[tool.labelOrName.label]"
          >{{ item[tool.labelOrName.name] }}</el-radio-button
        >
      </el-radio-group>
      <el-input
        v-if="tool.type == 'inputSelect'"
        :size="'mini'"
        :disabled="tool.inputDisabled"
        :placeholder="tool.inputPlaceholder"
        @input="(val) => filterStr(tool.inputModel, val)"
        v-model="outForm[tool.inputModel]"
        @keyup.enter.native="handlerClick(tool.clickName, outForm)"
        :class="tool.inputClass"
        :style="tool.inputStyle"
      >
        <el-select
          :size="'mini'"
          :disabled="tool.selectDisabled"
          :filterable="tool.filterable"
          :style="tool.selectStyle"
          class="inputSelect"
          v-model="outForm[tool.selectModel]"
          slot="prepend"
          :placeholder="tool.selectPlaceholder"
        >
          <el-option
            v-for="(itemB, itemBKey) in tool.list"
            :disabled="itemB.disabled"
            :key="itemBKey"
            :label="itemB[tool.labelOrName.label]"
            :value="itemB[tool.labelOrName.name]"
          ></el-option>
        </el-select>
        <el-button
          v-if="tool.showClick"
          :disabled="tool.disabled"
          @click="handlerClick(tool.clickName, outForm)"
          style="color: #448aff"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-input
        v-if="tool.type == 'inputSearch'"
        clearable
        :size="'mini'"
        :disabled="tool.inputDisabled"
        :placeholder="tool.inputPlaceholder"
        @input="(val) => filterStr(tool.inputModel, val)"
        v-model="outForm[tool.inputModel]"
        @keyup.enter.native="handlerClick(tool.clickName, outForm)"
        :class="tool.inputClass"
        :style="tool.inputStyle"
      >
        <el-button
          v-if="tool.showClick"
          :disabled="tool.disabled"
          @click="handlerClick(tool.clickName, outForm)"
          style="color: #448aff"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-select
        style="width: 100%"
        v-if="tool.type == 'select'"
        :size="'mini'"
        v-model="outForm[tool.inputModel]"
        clearable
        :filterable="tool.filterable"
        :placeholder="tool.placeholder"
      >
        <el-option
          v-for="(option, okey) in tool.list"
          :key="okey"
          :label="option[tool.labelOrName.label || 'label']"
          :value="option[tool.labelOrName.name || 'value']"
        >
        </el-option>
      </el-select>
      <el-date-picker
        style="width: 100%"
        :size="'mini'"
        :picker-options="tool.pickerOptions ? tool.pickerOptions(outForm) : {}"
        v-if="tool.type == 'daterange'"
        v-model="outForm[tool.model]"
        :value-format="tool.valueFormat || 'yyyy-MM-dd'"
        :format="tool.format || 'yyyy-MM-dd'"
        type="daterange"
        range-separator=""
        :start-placeholder="tool.startPlaceholder || '开始日期'"
        :end-placeholder="tool.endPlaceholder || '结束日期'"
      >
      </el-date-picker>
      <el-date-picker
        style="width: 100%"
        :size="'mini'"
        v-if="['date', 'month', 'year', 'dates'].includes(tool.type)"
        v-model="outForm[tool.model]"
        :picker-options="tool.pickerOptions ? tool.pickerOptions(outForm) : {}"
        :value-format="datePickerValueFormat(tool.valueFormat, tool.type)"
        :format="datePickerFormat(tool.format, tool.type)"
        :type="tool.type"
        :placeholder="tool.placeholder"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: "Conditions",
  props: {
    tool: Object,
    outForm: Object
  },
  inject: ["handlerClick"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // handlerClick: function(name, data = "") {
    //   this.$emit("watchCallback", { name: name, list: data });
    // },
    vShow(show = true) {
      return show;
    },
    // 过滤特殊字符
    filterStr(model, str) {
      let putStr = str.replace(/[%`~!@#$^&*()=|{}':;',<>]/gi, "");
      this.outForm[model] = putStr;
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
  }
};
</script>
<style lang="less" scoped>
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
</style>
