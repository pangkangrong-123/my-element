<!--
 * @Author: your name
 * @Date: 2021-07-15 14:22:47
 * @LastEditTime: 2021-09-27 16:42:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xRate.vue
-->
<template>
  <div style="position:relative" class="">
    <el-upload
      class="upload-demo"
      :ref="computedConfig.ref || 'upload'"
      :action="computedConfig.action"
      :style="computedConfig.style"
      :headers="computedConfig.headers"
      :multiple="computedConfig.multiple"
      :data="computedConfig.data"
      :name="computedConfig.name"
      :with-credentials="computedConfig.withCredentials"
      :show-file-list="computedConfig.showFileList"
      :drag="computedConfig.drag"
      :accept="computedConfig.accept"
      :on-preview="computedConfig.handlePreview"
      :on-remove="computedConfig.handleRemove"
      :on-success="
        (response, file, fileList) =>
          handleSuccess(computedConfig.onSuccess, response, file, fileList)
      "
      :on-error="computedConfig.onError"
      :on-progress="
        (event, file, fileList) =>
          uploadProcess(computedConfig.onProgress, event, file, fileList)
      "
      :on-change="computedConfig.onChange"
      :before-upload="file => beforeUpload(computedConfig.beforeUpload, file)"
      :before-remove="computedConfig.beforeRemove"
      :list-type="computedConfig.listType"
      :auto-upload="computedConfig.autoUpload"
      :file-list="computedFilesList"
      :http-request="computedConfig.httpRequest"
      :disabled="computeBoolen(computedConfig.disabled)"
      :limit="computedConfig.limit"
      :on-exceed="computedConfig.onExceed"
    >
      <el-button
        :size="computedConfig.size"
        :type="computedConfig.type"
        :plain="computedConfig.plain"
        :round="computedConfig.round"
        :circle="computedConfig.circle"
        :loading="computedConfig.loading"
        :icon="computedConfig.icon"
        >{{ computedUploadButtonName }}</el-button
      >
      <div v-if="computedConfig.tip" slot="tip" class="el-upload__tip">
        {{ computedConfig.tip }}
      </div>
    </el-upload>
    <div
      v-if="
        typeof xButtonConfig == 'object' && computeBoolen(xButtonConfig.show)
      "
      class="handleBox"
    >
      <MyButton :config="xButtonConfig"></MyButton>
    </div>
    <!-- {{ computedConfig.uploadProgressShow }}--
    {{ hasList }} -->
    <div
      ref="progress"
      class="progress"
      :class="{ 'is-success': isAllSuccess }"
      v-if="computedConfig.uploadProgressShow"
      v-show="hasList"
    >
      <div class="clear">
        <div class="uploading left">正在上传{{ uploading }}</div>
        <div class="right">
          <i ref="minIcon" @click="minClick" class="el-icon-minus"></i>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="progress-list">
        <div class="progress-item" v-for="file in fileList" :key="file.uid">
          <img :src="iconUrl(file.name)" width="32" height="31" />

          <div class="progress-container">
            <div class="progress-message clear">
              <div class="file-name left">{{ file.name }}</div>
              <div class="file-size right">
                {{ fileSize(file.size * (file.percentage / 100)) }}/{{
                  fileSize(file.size)
                }}
              </div>
            </div>
            <el-progress
              :show-text="false"
              :percentage="file.percentage"
            ></el-progress>
          </div>
          <div class="status">
            <i v-if="file.status === 'success'" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// type: year/month/date/dates/week/datetime/datetimerange/daterange
// import mixinComponent from "../js/xMixin.js";
// import { merge, getFileSize, toggleClass } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import MyButton from "../../xButton/src/xButton.vue";
import {
  merge,
  getFileSize,
  toggleClass
} from "../../utils/xElementJs/defaultFunction.js";

export default {
  name: "myUpload",
  mixins: [mixinComponent()],
  components: { MyButton },
  data() {
    return {
      // value: this.value
      fileList: [],
      iconimg: "./img/doc.png",
      hasList: false,
      successLength: 0,
      isAllSuccess: false,
      icon: {
        doc: require("./img/doc.png"),
        docx: require("./img/doc.png"),
        pdf: require("./img/pdf.png"),
        jpg: require("./img/img.png"),
        png: require("./img/img.png"),
        xls: require("./img/xls.png"),
        xlsx: require("./img/xls.png"),
        default: require("./img/default.png")
      }
    };
  },
  computed: {
    computedConfig() {
      // console.log(merge);
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.upload();
      merge(c, this.config);
      return c;
    },
    uploading() {
      return `${this.fileList.length - this.successLength}/${
        this.fileList.length
      }`;
    },
    computedUploadButtonName() {
      if (typeof this.computedConfig.uploadButtonName == "string") {
        return this.computedConfig.uploadButtonName;
      } else if (typeof this.computedConfig.uploadButtonName == "function") {
        return this.computedConfig.uploadButtonName(this.handleData);
      }
      return "上传文件";
    },
    xButtonConfig() {
      // 合并配置模式
      return this.config.xButtonRight;
    },
    computedFilesList() {
      let fileList = [];
      if (this.computedConfig.fileList instanceof Array) {
        fileList = this.computedConfig.fileList;
      } else if (typeof this.computedConfig.fileList == "function") {
        fileList = this.computedConfig.fileList();
      }
      //配置的文件名字
      let filesName = this.computedConfig.filesName;
      if (filesName) {
        fileList.forEach(file => {
          if (!file.name && file[filesName]) {
            //附件没有name 则把文件名赋值给name
            file.name = file[filesName];
          }
        });
      }

      // console.log("fileList0000", fileList);
      return fileList;
    }
  },
  methods: {
    // 取消请求
    abort(file) {
      // this.computedConfig.ref || 'upload'
      if (file) {
        this.$refs[this.computedConfig.ref || "upload"].abort(file);
      } else {
        this.$refs[this.computedConfig.ref || "upload"].abort();
      }
    },
    clearFiles() {
      this.$refs[this.computedConfig.ref || "upload"].clearFiles();
    },
    // 上传之前触发检查文件类型
    beforeUpload(fn, file) {
      var ExcelTypeArr = ["bat", "asp", "jsp", "exe", "EXE"];
      const excelType = file.name.substr(file.name.lastIndexOf(".") + 1);
      for (var key in ExcelTypeArr) {
        if (excelType.toUpperCase() === ExcelTypeArr[key].toUpperCase()) {
          this.$message.warning("危险文件，请勿上传!");
          return false;
        }
      }
      if (fn) {
        return fn(file);
      }
      // if (this.form.uploadConfig && this.form.uploadConfig.beforeAvatarUpload) {
      //   return this.form.uploadConfig.beforeAvatarUpload(file);
      // }
    },
    //删除上传文件进度框文件
    minClick() {
      toggleClass(this.$refs.progress, "min-progress");
    },
    click() {
      this.$refs.upLoad.click();
    },
    initListener() {
      if (this.$refs.progress) {
        this.$refs.progress.addEventListener(
          "transitionend",
          () => {
            if (this.isAllSuccess) {
              this.hasList = false;
            }
            this.isAllSuccess = false;
            //
          },
          true
        );
      }
    },
    iconUrl(fileName) {
      const fileIcon = fileName.split(".").pop();

      return this.icon[fileIcon] ?? this.icon.default;
      // return fileName;
    },
    uploadProcess(fn, event, file, fileList) {
      console.log("uploadProcess", event);
      this.successFileLength = fileList.length;
      this.hasList = fileList.length > 0;
      if (this.isAllSuccess) {
        // this.$nextTick(() => {
        toggleClass(this.$refs.progress, "is-success");
        // });
      }
      this.fileList = fileList;
      if (fn) {
        fn(event, file, fileList);
      }
    },
    handleSuccess(fn, res, file, fileList) {
      this.successLength += 1;
      this.isAllSuccess = this.successLength === this.fileList.length;
      if (fn) {
        fn(res, file, fileList);
      }
      // const opts = {
      //   res,
      //   file
      // };
      // if (res.code === 200) {
      //   this.$emit("upLoadSuccess", opts);
      // } else if (res.code === 501) {
      //   this.$message.warning(res.msg);
      // } else {
      //   this.$message.warning("上传文件格式错误，上传失败");
      // }
    },
    // 获取上传文件大小
    fileSize(fileSize) {
      return getFileSize(fileSize);
    }
  },
  beforeDestroy() {
    if (this.$refs.progress) {
      this.$refs.progress.removeEventListener("transitionend", null, true);
    }
  },
  created() {
    this.initListener();
  },
  watch: {
    hasList: function(val) {
      if (val) {
        this.initListener();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.handleBox {
  position: absolute;
  top: 0px;
  right: 0px;
}
.progress.min-progress {
  height: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.progress {
  padding: 20px;
  transition: all 0.3s ease;
  position: fixed;
  box-sizing: border-box;
  bottom: 10px;
  right: 20px;
  font-size: 12px;
  background: #fff;
  z-index: 200;
  .el-icon-minus {
    margin-right: 10px;
  }
  .progress-list {
    // width: 20%;
    .progress-item {
      margin-top: 10px;
      display: flex;
      padding: 4px;
      box-sizing: border-box;
      background: #f7f7f7;
      .progress-container {
        padding-top: 4px;
        margin-left: 10px;
        /deep/.el-progress-bar__outer {
          height: 5px;
        }
        .progress-message {
          // width: 300px;
          margin-bottom: 6px;
          .file-name {
            max-width: 60px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            margin-right: 20px;
          }
          .file-size {
            max-width: 60px;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
      .status {
        margin-left: 6px;
        margin-top: 8px;
        .el-icon-check {
          color: #64c42d;
        }
      }
    }
  }
}
.el-upload-btn {
  height: 32px;
  width: 80px;
  font-size: 14px;
}
.is-success {
  opacity: 0;
  transition: all 1s ease 5s;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.zindex10 {
  z-index: 10;
}
.clear {
  zoom: 1;
}
</style>
