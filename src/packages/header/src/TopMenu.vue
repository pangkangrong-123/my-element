<template>
  <el-popover width="350" trigger="hover" v-if="topMenu">
    <el-row class="top-menu-list">
      <el-row class="top-menu-list-row tc">
        <template v-for="item in topMenu">
          <el-col
            :span="8"
            class="top-menu-item"
            v-if="item.isShow != 0"
            :key="item.id"
            @click.native.prevent="handleLink(item)"
          >
            <el-row class="top-menu-icon">
              <img class="ctl" :src="item.iconUrl" />
            </el-row>
            <span>{{ item.menuName }}</span>
          </el-col>
        </template>
      </el-row>
    </el-row>
    <i
      slot="reference"
      :style="topMenusIconStyle"
      :class="topMenusIcon"
      class="colmain iconfont colmainClass"
    ></i>
  </el-popover>
</template>

<script>
export default {
  name: "TopMenu",
  props: ["topMenu", "topMenusIcon", "topMenusIconStyle"],
  data() {
    return {};
  },
  methods: {
    // 路由跳转
    handleLink(item) {
      item.eventName = "handleLink";
      this.$emit("handleLink", item);
    }
  }
};
</script>

<style lang="less" scoped>
.top-menu-list {
  padding: 28px;
  .top-menu-list-row {
    .el-col {
      margin-top: 25px;
      span {
        margin-top: 10px;
        display: block;
      }
    }
    .el-col:nth-child(1),
    .el-col:nth-child(2),
    .el-col:nth-child(3) {
      margin-top: 0;
    }
    .el-col:nth-child(3n + 2) {
      margin-left: 36px;
      margin-right: 36px;
    }
    .top-menu-item {
      padding: 10px 0;
      width: 70px;
      cursor: pointer;
    }
    .top-menu-item:hover {
      border-radius: 4px;
      background: #eeeff4;
    }
    .top-menu-icon {
      background-color: #fff;
      border-radius: 4px;
      width: 50px;
      height: 50px;
      text-align: center;
      margin: 0 auto;
      box-shadow: -2px 0 3px #f2f2f2, 2px 0 3px #f2f2f2;
      img {
        display: block;
        width: 24px;
        height: 24px;
      }
    }
  }
  .top-menu-list-row:first-child {
    margin-top: 0;
  }
}
.colmainClass {
  font-size: 30px;
  position: absolute;
  top: 1px;
  left: 4px;
}
.colmainClassBoxPar:hover {
  .colmainClass {
    color: #409eff;
  }
}
/* // 上下左右居中 */
.ctl {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 居中对齐 */
.tc {
  text-align: center;
}
</style>
