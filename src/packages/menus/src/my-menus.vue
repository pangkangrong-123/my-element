<template>
  <div class="my-menus">
    <template v-if="isSlot">
      <slot name="slotMenu"></slot>
    </template>
    <template v-else>
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse || true"
        :router="router"
        :default-active="defaultActive || $route.path"
        v-if="menuList.length"
        :style="{
          width: myMenusWidth + 'px !important'
        }"
      >
        <template v-for="(item, i) in menuList">
          <template
            v-if="
              item.isShow &&
              ((item.menuDTOlist && item.menuDTOlist.length > 0) ||
                (item[defaultProps.subMenuName] &&
                  item[defaultProps.subMenuName].length > 0))
            "
          >
            <el-submenu
              :index="item.path || ''"
              :key="i"
              @click.native.prevent="handleMenuSub(item)"
              class="my-submenu"
            >
              <template slot="title">
                <div class="my-menus-item">
                  <i :class="['iconfont', item.icon]"></i>
                  <div class="my-menus-item-name">{{ item.menuName }}</div>
                </div>
              </template>
              <template
                v-for="(child, cIndex) in item.menuDTOlist ||
                item[defaultProps.subMenuName]"
              >
                <childs-menus
                  class="child-menus-box"
                  v-if="child.isShow"
                  v-on="$listeners"
                  :key="cIndex"
                  :items="child"
                  :defaultProps="defaultProps"
                ></childs-menus>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              v-if="item.isShow"
              :index="item.path || ''"
              :key="i"
              @click.native.prevent="handleMenuItem(item)"
            >
              <div class="my-menus-item">
                <i :class="['iconfont', item.icon]"></i>
                <div class="my-menus-item-name">{{ item.menuName }}</div>
              </div>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </template>
  </div>
</template>

<script>
import ChildsMenus from "./ChildMenus.vue";
export default {
  name: "MyMenus",
  components: {
    ChildsMenus
  },
  props: {
    menuList: Array,
    isCollapse: Boolean,
    defaultActive: String,
    router: Boolean,
    isSlot: Boolean,
    myMenusWidth: {
      type: Number,
      default: 64
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { subMenuName: "menuDTOlist" };
      }
    }
  },
  created() {},
  mounted() {
    // console.log("this.$route.path", this.defaultActive, this.router);
  },
  methods: {
    handleMenuItem(item) {
      // console.log("el-menu", item, item.path);
      this.$emit("handleMenuItem", item);
    },
    handleMenuSub(item) {
      this.$emit("handleMenuSub", item);
    }
  }
};
</script>

<style lang="less" scoped>
.my-menus {
  float: left;
  padding-bottom: 100px;
  .el-menu-vertical-demo {
    float: left;
    height: 100%;
    border: 0;
    overflow-x: hidden;
  }
  /deep/.el-menu-item-group__title {
    padding: 0 0 0 20px;
  }
  .el-menu-item,
  .el-submenu {
    padding: 0 !important;
    text-align: center;
    line-height: 1;
    height: 78px;
    /deep/.el-submenu__title {
      line-height: 1;
      height: 78px;
      padding: 0 !important;
    }
    .my-menus-item {
      position: relative;
      top: 50%; /*偏移*/
      transform: translateY(-50%);
      i {
        font-size: 24px;
        width: 100%;
        color: #081f5b;
      }
      .my-menus-item-name {
        margin-top: 8px;
        font-size: 12px;
        white-space: break-spaces;
        line-height: 1.2;
        color: #96989c;
      }
    }
  }
  /deep/.el-menu-item.is-active,
  /deep/.el-menu-item.is-active {
    .my-menus-item {
      i {
        color: rgb(64, 158, 255) !important;
      }
      .my-menus-item-name {
        color: rgb(64, 158, 255) !important;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    //滑块部分
    border-radius: 5px;
    background-color: rgba(227, 227, 227, 0);
  }
  ::-webkit-scrollbar-track {
    //轨道部分
    background: rgba(237, 237, 237, 0.3);
    opacity: 0;
  }
}
</style>
