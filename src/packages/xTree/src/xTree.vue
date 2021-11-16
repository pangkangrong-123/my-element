<!--
 * @Author: your name
 * @Date: 2021-07-15 15:13:53
 * @LastEditTime: 2021-08-07 23:41:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fe-component-lib\src\components\src\xTree.vue
-->
<template>
  <el-tree
    ref="tree"
    :data="getDic"
    :node-key="computedConfig.nodeKey"
    :style="computedConfig.style"
    :show-checkbox="computedConfig.showCheckbox"
    :default-expand-all="computeBoolen(computedConfig.defaultExpandAll, false)"
    :expand-on-click-node="computedConfig.expandOnClickNode"
    :props="computedConfig.props"
    :highlight-current="computedConfig.highlightCurrent"
    :filter-node-method="
      (value, data) => filterNode(computedConfig.filterNode, value, data)
    "
    class="select-tree"
    @check="
      (clickNode, status) =>
        computeFunction(computedConfig.check, clickNode, status)
    "
    @node-click="data => computeFunction(computedConfig.nodeClick, data)"
  >
    <!-- <template slot-scope="{ data }" class="tree-node">
      <span style="margin-left: 10px;font-size: 14px;">{{
        data[getTreeProps.label]
      }}</span>
    </template> -->
  </el-tree>

  <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
</template>

<script>
// {
//   disabled: false,
//   multiple: true,
//   dic: {
//     data: [],
//     value: "value",
//     label: "label",
//     children: "children",
//     defaultExpandAll: false,
//   }
// }
// import mixinComponent from '../../common/xMixin'
// import mixinComponent from "../js/xMixin.js";
// import { merge } from "../js/defaultFunction";
import mixinComponent from "../../utils/xElementJs/xMixin.js";
import { merge } from "../../utils/xElementJs/defaultFunction.js";
export default {
  name: "myTree",
  mixins: [mixinComponent()],
  data() {
    return {
      treeData: []
    };
  },
  computed: {
    getDic() {
      const dic = this.config.dic;
      if (dic instanceof Array) {
        return dic;
      } else if (dic.data instanceof Array) {
        return dic.data;
      } else if (typeof dic === "function") {
        return dic(this.formData);
      } else if (dic.data && typeof dic.data === "function") {
        return dic.data(this.formData);
      }
      return undefined;
    },
    computedConfig() {
      //简化配置模式
      if (process.env.VUE_APP_COMPONENT_CONFIG_MODE) {
        return this.config;
      }
      // 合并配置模式
      const c = this.golbalConfig.tree();
      merge(c, this.config);
      return c;
    }
  },
  watch: {
    // remove tag时同步tree
    formData: {
      handler: function(val) {
        const data = this.config.multiple ? val : [val];
        if (val !== null && val !== undefined && val !== "" && data.length) {
          this.$nextTick().then(() => {
            this.$refs.tree.setCheckedKeys(data);
          });
        }
      },
      immediate: true
    },
    // 初始化时父级的tree可能没有数据，所以要watch
    config: {
      handler: function(val) {
        if (val) {
          const dic = this.config.dic;
          if (dic instanceof Array) {
            this.treeData = dic;
          } else if (dic instanceof Object) {
            this.treeData = dic.data;
          } else if (typeof dic === "function") {
            this.treeData = dic(this.formData);
          } else if (dic.data && typeof dic.data === "function") {
            this.treeData = dic.data(this.formData);
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取tree本体
    getRefTree() {
      return this.$refs.tree;
    },
    filter(val) {
      this.$refs.tree.filter(val);
    },
    // 过滤节点方法
    filterNode(fn, value, data) {
      if (fn) {
        return fn(value, data);
      }
      if (!value) return true;
      // if (!value) return true;
      // return data.label.indexOf(value) !== -1;
    }
  },
  created() {}
};
</script>
<style lang="less">
// .select-tree .el-tree-node.is-current > .el-tree-node__content {
//   background-color: #f5f7fa;
//   font-weight: 700;
//   color: #409eff;
// }
</style>
