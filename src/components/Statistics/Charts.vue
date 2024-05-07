<template>
  <div class="Charts">
    <div class="select" @click="openSelect">
      <input type="text" placeholder="类型" readonly>
      <div class="list" v-show="showList">
        <ul>
        <li class="option"
        :class="kind === 'expenses' ? 'selected' : ''"
        @click="kind = 'expenses'">
        支出</li>
        <li
        class="option"
        :class="kind === 'income' ? 'selected' : ''"
        @click="kind = 'income'"
        >收入</li>
      </ul>
      </div>
    </div>
    <div class="chart" ref="refDiv"></div>
    <div class="chart" ref="refDiv2"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';


  defineProps({
  startDate: {
    // type: String as PropType<string>,
    required: true
  },
  endDate: {
    // type: String as PropType<string>,
    required: true
  }
})

const showList = ref(false)
const openSelect = () => {
  showList.value = !showList.value
}

const kind = ref('expenses')

const refDiv = ref<HTMLDivElement>()
const refDiv2 = ref<HTMLDivElement>()

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
  .Charts {
    > .select {
      margin-top: 8px;
      input {
        padding: 8px 5px;
        width: 100%;
        outline: none;
        border: 1px solid var(--select-option-bg);
        border-radius: var(--input-radius);
      }
      ul {
        width: 100%;
        padding: 1px 1px;
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: var(--main);
        border-radius: 0 0 5px 5px;
        li {
          margin: 0;
          padding: 5px;
          // list-style: none;
          border-radius: 5px;
        }

        > .selected {
          background: var(--select-option-bg);
          color: white;
        }
      }
    }
    > .chart {
      height: 190px;
      padding: 8px;
    }
  }
</style>