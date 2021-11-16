<template>
  <el-row>
    <el-upload
      ref="upLoad"
      id="upload"
      class="upload-demo"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="boforUpload"
      multiple
      :on-progress="uploadProcess"
      :show-file-list="false"
      :on-exceed="handleExceed"
    >
      <el-button plain class="el-upload-btn" size="small">上传</el-button>
    </el-upload>
    <div
      ref="progress"
      class="progress"
      :class="{ 'is-success': isAllSuccess }"
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
  </el-row>
</template>
<script>
import { getFileSize } from './getFileSize'
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fileList: [],
      iconimg: '',
      hasList: true,
      successLength: 0,
      isAllSuccess: false,
      icon: {
        docx: require('../img/doc.png'),
        doc: require('../img/doc.png'),
        pdf: require('../img/pdf.png'),
        jpg: require('../img/img.png'),
        png: require('../img/img.png'),
        xls: require('../img/xls.png'),
        xlsx: require('../img/xls.png'),
        default: require('../img/default.png')
      }
    }
  },
  computed: {
    uploading () {
      return `${this.fileList.length - this.successLength}/${
        this.fileList.length
      }`
    }
  },
  mounted () {
    setTimeout(() => {
      this.initListener()
    }, 20)
  },
  methods: {
    boforUpload (file) {
      var ExcelTypeArr = ['bat', 'asp', 'jsp', 'exe', 'EXE']
      const excelType = file.name.substr(file.name.lastIndexOf('.') + 1)
      for (var key in ExcelTypeArr) {
        if (excelType.toUpperCase() === ExcelTypeArr[key].toUpperCase()) {
          this.$message.warning('危险文件，请勿上传!')
          return false
        }
      }
      // if (this.form.uploadConfig && this.form.uploadConfig.beforeAvatarUpload) {
      //   return this.form.uploadConfig.beforeAvatarUpload(file);
      // }
    },
    minClick () {
    },
    fileSize (fileSize) {
      return getFileSize(fileSize)
    },
    click () {
      this.$refs.upLoad.click()
    },
    initListener () {
      this.$refs.progress.addEventListener(
        'transitionend',
        () => {
          if (this.isAllSuccess) {
            this.hasList = false
          }
          this.isAllSuccess = false
          //
        },
        true
      )
    },
    iconUrl (fileName) {
      const fileIcon = fileName.split('.').pop()

      return this.icon[fileIcon] ?? this.icon.default
      // return fileName;
    },
    uploadProcess (event, file, fileList) {
      this.$emit('uploadProcess', event, file, fileList)
    },
    handleSuccess (response, file, fileList) {
      this.$emit('handleSuccess', response, file, fileList)
    },
    handleRemove (file, fileList) {
      this.$emit('handleRemove', file, fileList)
    },
    handlePreview (file) {
      this.$emit('handlePreview', file)
    },
    handleExceed (files, fileList) {
      this.$emit('handleExceed', files, fileList)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？${fileList}`)
    }
  },
  beforeDestroy () {
    this.$refs.progress.removeEventListener('transitionend', null, true)
  }
}
</script>
<style lang="less" scoped>
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
</style>
