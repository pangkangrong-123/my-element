<template>
  <el-dialog
    class="my-dialog"
    v-bind="
      setPropAttributes(
        {
          width: dialogWidth,
          visible: dialogVisible,
          beforeClose: handleIconClose,
          closeOnClickModal: false
        },
        propAttributes
      )
    "
  >
    <div class="my-dialog-title">
      <div class="title-l">{{ dialogTitle }}</div>
      <div class="title-r">
        <slot name="modal-search"> </slot>
      </div>
    </div>
    <div class="my-dialog-con">
      <slot name="modal-body"></slot>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
      :style="{ 'text-align': footerBtnPosition || 'center' }"
      v-show="isDialogFooter"
    >
      <slot name="modal-footer">
        <el-button
          round
          size="small"
          type="primary"
          @click="handleConfirm"
          class="btn-hover"
          v-show="submitBtnVisible"
          :style="confirmCss || { background: '#081f5b' }"
          :loading="submitBtnLoading"
        >
          {{ submitBtnText }}
        </el-button>
        <el-button
          round
          size="small"
          v-show="cancelBtnVisible"
          @click="handleClose"
          >{{ cancelBtnText }}</el-button
        >
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "myDialog",
  props: {
    dialogWidth: {
      type: String,
      default: "65%"
    },
    dialogTitle: {
      type: String,
      default: "提示"
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    confirmCss: {
      type: Object,
      default: () => {}
    },
    footerBtnPosition: {
      type: String,
      default: ""
    },
    isDialogFooter: {
      type: Boolean,
      default: true
    },
    submitBtnText: {
      type: String,
      default: "确 定"
    },
    cancelBtnText: {
      type: String,
      default: "取 消"
    },
    submitBtnVisible: {
      type: Boolean,
      default: true
    },
    cancelBtnVisible: {
      type: Boolean,
      default: true
    },
    submitBtnLoading: {
      type: Boolean,
      default: false
    },
    propAttributes: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleIconClose() {
      this.$emit("update:dialogVisible", false);
      this.$emit("handleClose");
    },
    handleClose() {
      this.handleIconClose();
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    },
    //合并属性集合
    setPropAttributes(Attributes1, Attributes2) {
      let objData = Object.assign(Attributes1, Attributes2);
      return objData;
    }
  }
};
</script>

<style lang="less" scoped>
.my-dialog {
  overflow: hidden;
  .my-dialog-title {
    overflow: hidden;
    line-height: 32px;
    .title-l {
      float: left;
      font-size: 16px;
      font-weight: bold;
    }
    .title-l::before {
      content: "";
      display: inline-block;
      width: 4px;
      background-color: #0072ff;
      height: 16px;
      margin-right: 12px;
      position: relative;
      top: 2px;
    }
    .title-r {
      float: right;
    }
  }
  .linet10 {
    border-bottom: 1px solid #e0e0e0;
    margin-top: 10px;
  }
  /deep/ .el-dialog__body {
    padding: 10px 50px;
  }
  .my-dialog-con {
    margin: 10px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
    text-align: left;
    max-height: 60vh;
    overflow-x: hidden;
  }
  .dialog-footer {
    .el-button {
      padding: 0 40px;
      line-height: 36px;
      font-size: 14px;
    }
  }
  .btn-hover:hover {
    opacity: 0.8;
  }
}
// /deep/.el-dialog__footer {
//   // padding: 10px 20px 20px;
//   text-align: center;
//   // box-sizing: border-box;
// }
</style>
