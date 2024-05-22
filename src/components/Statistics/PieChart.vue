<template>
  <div class="PieChart">
    <div class="chart" ref="refDiv2"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import handleAmount from "../../shared/handleAmount";

const props = defineProps({
  data: Array as PropType<{ name: string; value: number }[]>
})

var myChart: echarts.ECharts;

const refDiv2 = ref<HTMLDivElement>();
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(refDiv2.value!);
  // 绘制图表
  const option = {
    tooltip:{
      trigger:'item',
      position: (point: any[], _: any, dom: { offsetWidth: any; }, _rect: any, size: { viewSize: any[]; }) => {
        // 通过计算调整 Tooltip 的位置
        const containerWidth = size.viewSize[0];
        const tooltipWidth = dom.offsetWidth;
        const maxLeft = containerWidth - tooltipWidth;
        let left = point[0];
        if (left > maxLeft) {
          left = maxLeft;
        }
        return [left, point[1]];
      },
      formatter: (x: {name:string, value:number, percent: number})=>{
        const {name,value,percent} = x
        return `${name}: ￥${handleAmount(value)} 占比 ${percent}%`
      },
    },
    grid: [{ left: 0, top: 0, right: 0 ,bottom: 0}],
    series: [
      {
        type: "pie",
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        radius: "75%",
      },
    ],
  };
  myChart.setOption(option);
  
});

watch(() => props.data, () => {
  myChart?.setOption({
    series:[{
      data:props.data
    }]
  })
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
