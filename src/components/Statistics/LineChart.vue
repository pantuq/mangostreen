<template>
  <div class="LineChart">
    <div class="chart" ref="refDiv"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const refDiv = ref<HTMLDivElement>()
  
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(refDiv.value!);
  // 绘制图表
  const option = {
    grid: [
      { left: 0, top: 20, right: 0,  }
    ],
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  };
  myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
  .LineChart {
    > .chart {
      height: 190px;
      padding: 8px;
    }
  }
</style>