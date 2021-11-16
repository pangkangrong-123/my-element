<template>
  <el-row class="header-box bgwhite">
    <el-row class="clear header-h50">
      <!-- 一级菜单 -->
      <el-col class="colmainClassBoxPar" v-if="headerData.topMenu" :span="1">
        <i
          v-if="headerData.popoverShow"
          :style="headerData.topMenusIconStyle"
          :class="headerData.topMenusIcon"
          class="colmain iconfont caidantubiao"
        ></i>
        <TopMenu
          v-else
          :topMenu="headerData.topMenu"
          :topMenusIconStyle="headerData.topMenusIconStyle"
          :topMenusIcon="headerData.topMenusIcon"
          @handleLink="handleLink"
        ></TopMenu>
      </el-col>
      <el-col class="logo-name-box" :span="16">
        <span
          v-if="headerData.logoUrl"
          @click="headerCallback(headerData.logoEventName)"
          class="head-logo pointer"
        >
          <img :src="headerData.logoUrl" alt="" />
        </span>
        <el-row
          v-if="
            headerData.logoDivider == undefined
              ? headerData.logoUrl
                ? true
                : false
              : headerData.logoDivider
          "
          class="line10 divider-line"
        >
          <el-divider direction="vertical"></el-divider>
        </el-row>
        <span
          class="fwb cname-box pointer"
          @click="headerCallback(headerData.logoEventName)"
          >{{ headerData.logoName }}</span
        >
      </el-col>
      <el-col :span="8" class="header-right-box">
        <span v-for="(item, index) in headerData.iconList" :key="index">
          <el-badge v-if="item.showBadge" is-dot>
            <i
              class="iconfont fz16"
              :class="item.iconClass"
              :style="item.iconStyle"
              @click="headerCallback(item)"
            ></i>
          </el-badge>
          <i
            v-else
            class="iconfont fz16"
            :class="item.iconClass"
            :style="item.iconStyle"
            @click="headerCallback(item)"
          ></i>
        </span>
        <!-- 登出 -->
        <el-popover trigger="hover" width="105" class="head-renxiang">
          <div>
            <el-row>
              <el-row
                v-for="(item, index) in headerData.logOut.popoverList"
                :key="index"
                class="info-box"
                :class="{ pointer: item.pointer }"
                @click.native.prevent="headerCallback(item)"
              >
                <el-divider v-if="item.showDivider"></el-divider>
                <div v-else>
                  <p class="info-box-left">
                    <i class="iconfont" :class="item.iconClass"></i>
                  </p>
                  <p class="info-box-right">{{ item.name }}</p>
                </div>
              </el-row>
            </el-row>
          </div>
          <el-button type="text" slot="reference" class="renxiang-tubiao">
            <i>
              <img
                class="head-renxiang-img reset-head-renxiang-img"
                :src="headerData.logOut.imgUrl"
                alt=""
            /></i>
            <span
              style="line-height: 22px; color: #343434; margin-left: 10px"
              >{{ headerData.logOut.userName }}</span
            >
          </el-button>
        </el-popover>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import TopMenu from "./TopMenu";
export default {
  name: "myHeader",
  components: {
    TopMenu
  },
  props: {
    headerData: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    headerCallback(params) {
      if (params && params.eventName) {
        this.$emit("headerCallback", params);
      } else {
        this.$emit("headerCallback", { eventName: params });
      }
    },
    // 点击-跳转系统菜单
    handleLink(item) {
      this.headerCallback(item);
    }
  }
};
</script>

<style lang="less" scoped>
/* 背景颜色-白 */
.bgwhite {
  background-color: #fff;
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
.header-box {
  padding: 0 20px 0 12px !important;
  box-shadow: 0 3px 5px #eeeeee;
  z-index: 10;
  overflow: hidden;
  .header-h50 {
    height: 50px !important;
    line-height: 50px;
  }
  .head-logo {
    display: inline-block;
    width: 202px;
    height: 18px;
    position: relative;
    top: -4px;
    img {
      font-size: 0;
      display: block;
    }
  }
  .header-right-box {
    text-align: right;
    span {
      margin-left: 20px;
    }
  }
}

.info-box {
  text-align: left;
  line-height: 2;
  .info-box-left {
    float: left;
    width: 10px;
    margin: 0;
  }
  .info-box-right {
    padding-left: 22px;
    overflow: hidden;
    margin: 0;
  }
}
.head-renxiang {
  margin-right: 10px;
  height: 20px;
  /deep/ .renxiang-tubiao {
    vertical-align: bottom;
    position: relative;
    top: -4px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .head-renxiang-img {
    width: 20px;
    font-size: 0;
    display: block;
  }
  .reset-head-renxiang-img {
    width: 20px;
    display: inline-block;
    position: relative;
    // top: -1px;
  }
}
/deep/ .el-badge__content.is-fixed {
  top: 13px;
}
/deep/ .el-badge {
  top: -3px;
}
.logo-name-box {
  position: relative;
  left: 52px;
}
.divider-line {
  display: inline-block;
  position: relative;
  top: 2px;
  .el-divider {
    height: 22px;
  }
}
.cname-box {
  position: relative;
  top: 2px;
}
.ib {
  display: inline-block;
  position: relative;
  top: -3px;
}
.ib .el-divider--vertical {
  width: 2px;
  height: 2em;
}
/deep/ .el-divider--vertical {
  height: 2.5em;
}
.fwb {
  font-weight: bold;
  font-size: 1rem;
}
.fz16 {
  font-size: 22px !important;
  font-weight: 700;
}
.iconfont {
  font-size: 16px;
  margin-right: 2px;
}
.pointer:hover {
  cursor: pointer;
}
.el-divider--horizontal {
  margin: 10px 0;
}
.caidantubiao {
  font-size: 30px;
  position: absolute;
  top: 1px;
  left: 4px;
}
</style>
