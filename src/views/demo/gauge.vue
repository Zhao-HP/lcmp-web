<template>
  <div>
    <div id='myChart'
         :style="{width:'600px',height:'600px'}">

    </div>
  </div>
</template>

<script>
export default {
  name: "echartsDemo",
  data() {},
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/gauge");
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/title");
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        backgroundColor: "#111111",
        tooltip: {
          formatter: "{a} <br/> {b} :{c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "单测覆盖率",
            type: "gauge",
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                color: [[0.1, "red"], [0.85, "#1e90ff"], [1, "green"]],
                width: 3,
                shadowColor: "#fff",
                shadowBlue: 10
              }
            },
            axisTick: {
              length: 15,
              lineStyle: {
                color: "white"
              }
            },
            splitLine: {
              length: 30
            },
            axisLabel: {
              backgroundColor: "auto",
              borderRadius: 2,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: "#222",
              color: "white",
              padding: 5
            },
            title: {
              fontWeight: "bolder",
              fontSize: 30,
              fontStyle: "italic"
            },
            detail: {
              formatter: "{value}%",
              // fontWeight:'bolder',
              borderRadius: 3,
              backgroundColor: "#555"
            },
            data: [{ value: 20, name: "覆盖率" }]
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>