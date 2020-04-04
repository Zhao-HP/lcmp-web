<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  ></div>
</template>

<script>
  import echarts from "echarts";

  require("echarts/theme/macarons"); // echarts theme

  export default {
    name: "dask-info",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: "chart"
      },
      width: {

        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "100%"
      },
      chartData: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        chart: null,
        option: {}
      };
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    watch: {
      chartData: {
        handler(newVal) {
          this.option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: {
              text: "API测试用例总数",
              // subtext: "API测试用例总数",
              x: "center",
              y: "center",
              textStyle: {
                color: "#333",
                fontSize: 15,
                fontWeight: "normal"
              },
              subtextStyle: {
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
                fontWeight: "normal"
              }
            },
            series: [
              {
                name: newVal.name,
                type: "pie",
                radius: ["50%", "70%"],
                center: ["50%", "50%"],
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                lableLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: newVal.data
              }
            ]
          };
          this.chart.setOption(this.option);
        },
        deep: true
      }
    },
    mounted() {
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        title: {
          text: "API测试用例总数",
          // subtext: "API测试用例总数",
          x: "center",
          y: "center",
          textStyle: {
            color: "#333",
            fontSize: 15,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "rgba(255,255,255,.45)",
            fontSize: 14,
            fontWeight: "normal"
          }
        },
        series: [
          {
            name: this.chartData.name ? this.chartData.name : 'null',
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.chartData.data ? this.chartData.data : [{ name: "null", value: 0 }]
          }
        ]
      };
      this.initChart();
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, "macarons");
        this.chart.setOption(this.option);
      }
    }
  };
</script>
