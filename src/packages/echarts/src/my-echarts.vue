<template>
  <!-- <div> -->
  <div
    :id="chartConfig.id || 'echartId'"
    :style="{
      width: chartConfig.divWidth || '100%',
      height: chartConfig.divHieght || '500px',
      padding: chartConfig.divPadding || '0px',
      margin: chartConfig.divMargin || '0px'
    }"
  ></div>
  <!-- </div> -->
</template>

<script>
import * as echarts from "echarts";
// import "echarts-liquidfill";
export default {
  name: "Echart",
  props: {
    // echart配置项
    chartConfig: {
      type: Object,
      default: Object
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      boxid: "myChart",
      chart: null,
      option: ""
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    // this.chart.dispose();
    // this.chart = null;
  },
  mounted() {
    this.initChart();
    this.onWindowResize();
  },
  methods: {
    // 初始化echarts
    initChart() {
      var self = this;
      // if (this.chart) {
      //   //                    this.chart.showLoading();
      // } else {
      this.chart = echarts.init(
        document.getElementById(self.chartConfig.id || "echartId")
      );
      this.chart.showLoading();
      this.chart.on("click", function (params) {
        if (self.chartConfig.click) {
          self.$emit("chartClick", {
            name: self.chartConfig.id,
            list: params
          });
        }
      });

      // }

      this.chart.setOption(self.getOption(self.chartConfig));
      // this.chart.setOption(self.chartConfig);
      // this.chart.resize();
      this.chart.hideLoading();
    },
    // 获取option数据
    getOption(optionData = {}) {
      let option = { ...optionData };
      option.color = option.color
        ? option.color
        : [
            "#27D1F6",
            "#F77C3A",
            "#4A9EF2",
            "#9D6BD8",
            "#f2f608",
            "#17f608",
            "#33BCCA",
            "#0830f6"
          ]; // 图表默认颜色
      return option;
    },
    onWindowResize() {
      setTimeout(() => {
        window.onresize = () => {
          this.chart.resize();
        };
      }, 500);
    }
  },
  watch: {
    chartConfig: {
      handler(newVal) {
        console.log("chartConfig", this.chartConfig.id);
        console.log(newVal);
        this.initChart();
        // this.chart.resize();
      },
      deep: true
    },
    activeName: {
      handler(newVal) {
        console.log("activeName", newVal);
        this.chart.resize();
      },
      deep: true
    }
  }
};
</script>

<style></style>
