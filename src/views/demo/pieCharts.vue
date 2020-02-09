<template>
  <div id="myPie"
       :style="{width:'600px',height:'600px'}">
  </div>
</template>

<script>
export default {
  name: "pieCharts",
  date() {},
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie() {
      let echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/pie");
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/title");
      let myPie = echarts.init(document.getElementById("myPie"));
      myPie.setOption({
        // backgroundColor:'#111111',
        title: {
          text: "Bug总数信息",
          left: "center",
        //   top: 20,
          textStyle:{
              color:'#ccc'
          }
        },
        tooltip:{
            trigger: 'item',
            formatter: '{a} <br/> {b} : {c} ({d}%)'
        },
        toolbax: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "Bug总数",
            type: "pie",
            redius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 25, name: "阻断Bug数" },
              { value: 60, name: "主要Bug数" },
              { value: 31, name: "严重Bug数" },
              { value: 22, name: "次要Bug数" },
              { value: 43, name: "警告Bug数" }
            ],
            roseType: "radius", //产生大小不一样效果
            label: {
              color: "rgba(100,100,100,0.6)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(120,120,120,0.7)"
              }
            },
            itemStyle: {
              // color:'#c23531',
              shadowBlue: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            // animationDetail:function(idx){
            //     return Math.random()*200;
            // }
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>