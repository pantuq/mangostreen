<template>
  <div class="Charts">
    <div class="select" @click="openSelect">
      <input type="text" placeholder="类型" readonly />
      <div class="list" v-show="showList">
        <ul>
          <li
            class="option"
            :class="kind === 'expenses' ? 'selected' : ''"
            @click="kind = 'expenses'"
          >
            支出
          </li>
          <li
            class="option"
            :class="kind === 'income' ? 'selected' : ''"
            @click="kind = 'income'"
          >
            收入
          </li>
        </ul>
      </div>
    </div>

    <LineChart :data="betterLine"></LineChart>
    <PieChart :data="betterPie"></PieChart>
    <BarChart :data="betterBar"></BarChart>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, onMounted, ref, watch } from "vue";
import LineChart from "./LineChart.vue";
import PieChart from "./PieChart.vue";
import BarChart from "./BarChart.vue";
import { Time } from "../../shared/Time";
import yierRequest1 from "../../service";

const props = defineProps({
  startDate: {
    type: String as PropType<string>,
    required: true,
  },
  endDate: {
    type: String as PropType<string>,
    required: true,
  },
});

const DAY = 24 * 60 * 60 * 1000;
const showList = ref(false);
const openSelect = () => {
  showList.value = !showList.value;
};

const kind = ref("expenses");

// 折线图
const line = ref<Line>([])
const betterLine = computed<[string,number][]>(() => {
  if(!props.startDate || !props.endDate){
    return []
  }
  const array = []
  // 获取时间戳时间差
  const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
  const days = diff / DAY + 1
  let dataIndex = 0
  // 对没有记账的日期进行补零
  for(let i = 0; i < days; i++){
    const time = new Time(props.startDate).add(i, "day").Formt()
    if(line.value[dataIndex] && new Time(line.value[dataIndex].happened_at).Formt() === time){
      array.push([time,line.value[dataIndex].amount])
      console.log(1111);
      // console.log(line.value[dataIndex]);
      dataIndex += 1
    }else{
      array.push([time, 0])
      console.log(2222);
    }
  }
  return array as [string,number][]
})

const fetchData1 = async() => {
  await yierRequest1.get({
    url:"/api/v1/items/summary",
    params:{
      happened_after: props.startDate,
      happened_before: props.endDate,
      kind: kind.value,
      group_by: "happened_at"
    }
  }).then(res => {
    line.value = res.groups
    })
}
onMounted(fetchData1)
watch(kind,fetchData1)

// 饼图
const pie = ref<Pie>([])
const pieTotal = ref<number>(0)
const betterPie = computed<{name: string; value: number }[]>(() => {
  // pie.value.map((item) => ({
  //   name: item.tag.name,
  //   value: item.amount
  // }))
  return pie.value.map((item) => ({
    name: item.tag.name,
    value: item.amount
  }))
})

const fetchData2 = async() => {
  await yierRequest1.get({
    url:"/api/v1/items/summary",
    params:{
      happened_after: props.startDate,
      happened_before: props.endDate,
      kind: kind.value,
      group_by: "tag_id"
    }
  }).then(res => {
    pie.value = res.groups
    pieTotal.value = res.total
  })
}
onMounted(fetchData2)
watch(kind,fetchData2)

// 条形图
const betterBar = computed<{tag: Tag, amount: number, percent: string}[]>(() => {
  const total = pie.value.reduce((sum, item) => sum + item.amount, 0)
  return pie.value.map((item) => {
    return {
      tag: item.tag,
      amount: item.amount,
      percent: ((item.amount / total) * 100).toFixed(2) + "%"
    }
  })
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
}
</style>
