<template>
  <div class="LineChart">
    <div class="chart" id="line"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, watch } from 'vue';
import handleAmount from '../../shared/handleAmount';
import { onMounted } from "vue";
import * as echarts from "echarts";
import { Time } from '../../shared/Time';

const props = defineProps({
  data: {
    type: Array as PropType<[string, number][]>,
    require: true
  }
})


let myChart: echarts.ECharts | undefined = undefined
const defaultOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data
      return `${new Time(new Date(x)).Formt('YYYY年MM月DD日')} ￥${handleAmount(y)}`
    }
  },
  grid: [{ left: 16, top: 0, right: 16, bottom: 20 }],
  xAxis: {
    type: 'time',
    boundaryGap: ['2%', '0%'],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).Formt('MM-DD')
    },
    axisTick: {
      interval: 'auto',
      alignWithLabel: true
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLabel: {
      show: false
    }
  }
}
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  // chart = echarts.init(myChart)
  myChart = echarts.init(document.getElementById('line')!)
  myChart.setOption(defaultOption)
  
  // 绘制图表
  myChart?.setOption({
    ...defaultOption,
    series:[{
      data:props.data,
      type:'line'
    }]
  })
})
// 为什么之前那样写就不可以
// 只有在重新编辑代码刷新之后的一次才可以显示？
 
watch(() => props.data, () => {
  myChart?.setOption({
      series: [
        {
          data: props.data
        }
      ]
    })
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
