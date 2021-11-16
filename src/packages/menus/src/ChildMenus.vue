<!--
 * @Descripttion: 
 * @version: 
 * @Author: auth
 * @Date: 2020-12-28 16:09:21
 * @LastEditors: auth
 * @LastEditTime: 2021-07-21 16:28:29
-->
<template v-if="items">
  <div>
    <el-submenu
      :index="items.path || ''"
      @click.native.prevent="handleMenuSub(items)"
      v-if="
        items.isShow &&
        ((items.menuDTOlist && items.menuDTOlist.length > 0) ||
          (items[defaultProps.subMenuName] &&
            items[defaultProps.subMenuName].length > 0))
      "
    >
      <template slot="title">
        <!-- <i :class="['iconfont', items.icon]"></i>
        <span>{{ items.menuName }}</span> -->
        <div>
          <i :class="['iconfont', items.icon]"></i>
          <span slot="title" class="my-menus-item-name">{{
            items.menuName
          }}</span>
        </div>
      </template>
      <template>
        <el-menu-item-group
          v-for="(childItem, ci) in items.menuDTOlist ||
          items[defaultProps.subMenuName]"
          :key="ci"
        >
          <child-menus :items="childItem" v-on="$listeners"> </child-menus>
        </el-menu-item-group>
      </template>
    </el-submenu>
    <el-menu-item
      v-else-if="items.isShow"
      :index="items.path || ''"
      class="my-menus-item"
      @click.native.prevent="handleMenuItem(items)"
    >
      <div>
        <i :class="['iconfont', items.icon]"></i>
        <span slot="title" class="my-menus-item-name">{{
          items.menuName
        }}</span>
      </div>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "ChildMenus",
  props: {
    items: Object,
    defaultProps: {
      type: Object,
      default: () => {
        return { subMenuName: "menuDTOlist" };
      }
    }
  },
  created() {
    // console.log("items", this.items.menuName);
  },
  methods: {
    handleMenuItem(item) {
      console.log("handleMenuItem-item", item, item.path);
      this.$emit("handleMenuItem", item);
    },
    handleMenuSub(item) {
      this.$emit("handleMenuSub", item);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-menu--popup-right-start {
  padding: 0;
}
/deep/.el-menu-item-group__title {
  padding: 0 0 0 20px;
}
/deep/.el-menu--popup-right-start {
  padding: 0 !important;
}
.el-menu-item,
.el-submenu {
  /deep/.el-submenu__title,
  /deep/.el-menu-item-group {
    i {
      color: #081f5b;
    }
    .my-menus-item-name {
      font-size: 12px;
      padding-left: 10px;
      color: #96989c;
    }
  }
}
/deep/.el-menu-item.is-active,
/deep/.el-menu-item-group.is-active {
  i {
    color: rgb(64, 158, 255) !important;
  }
  .my-menus-item-name {
    color: rgb(64, 158, 255) !important;
  }
}
</style>
