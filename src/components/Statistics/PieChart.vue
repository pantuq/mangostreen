<template>
  <div class="PieChart">
    <div class="chart" ref="refDiv2"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

  
const refDiv2 = ref<HTMLDivElement>()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(refDiv2.value!);
  // 绘制图表
  const option = {
    grid: [
      { left: 0, top: 20, right: 0,  }
    ],
    series: [{
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ],
      radius: '50%'
    }]
};
  myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
  .PieChart {
    > .chart {
        height: 190px;
        padding: 8px;
    }
  }
</style>