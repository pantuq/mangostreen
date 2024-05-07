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

    <div class="demo3">
      <div class="topItem" v-for="(item,index) in betterData3" :key="index">
        <div class="sign">
          {{ item.tag.sign }}
        </div>
        <div class="bar_wrapper">
          <div class="bar_text">
            <span>{{ item.tag.name }} - {{ item.percent }}</span>
            <span>￥{{ item.amount }}</span>
          </div>
          <div class="bar">
            <div class="bar_inner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
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

const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
const betterData3 = computed(() => {
  const total = data3.reduce((sum, item) => sum + item.amount, 0)
  return data3.map(item => ({
    ...item,
    percent: Math.round(item.amount / total * 100) + '%'
  }))
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


    .demo3 {
      margin-bottom: 128px;
      padding: 8px;
    }
    .topItem {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sign {
        flex-grow: 0;
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--tag-bg);
        border-radius: 50%;
      }
      .bar_wrapper {
        margin-left: 8px;
        flex-grow: 1;
        flex-shrink: 1;
        .bar_text {
          color: var(--text-muted);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bar {
          height: 8px;
          border-radius: 4px;
          background: var(--bar-bg);
          position: relative;
          overflow: hidden;
          margin-top: 4px;
        }
        .bar_inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 42px;
        }
      }
      &:nth-child(1) {
        .bar_inner {
          background: #eba953;
        }
      }
      &:nth-child(2) {
        .bar_inner {
          background: #53a867;
        }
      }
      &:nth-child(3) {
        .bar_inner {
          background: #91cc75;
        }
      }
    }
}
</style>