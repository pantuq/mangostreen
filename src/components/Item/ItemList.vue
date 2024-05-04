<template>
  <div class="ItemList">
    <NavBar>
      <template #icon>
        <svgIcon name="menu" color="white" width="26px" height="26px"/>
      </template>
      <template #title>
        <span>山竹记账</span>
      </template>
    </NavBar>
    <Tabs :selected="tabKind" @update-selected='onUpdateSelected'>
      <Tab title="本月">
        <ItemSummary :startDate="timeList[0].start.FormData()" :endDate="timeList[0].end.FormData()" />
      </Tab>
      <Tab title="上月">
        <ItemSummary :startDate="timeList[1].start.FormData()" :endDate="timeList[1].end.FormData()" />
      </Tab>
      <Tab title="今年">
        <ItemSummary :startDate="timeList[2].start.FormData()" :endDate="timeList[2].end.FormData()" />
      </Tab>
      <Tab title="自定义时间">
        <ItemSummary :startDate="customTime.start.FormData()" :endDate="customTime.end.FormData()" />
      </Tab>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';
import Tabs from '../../shared/Tabs.vue';
import Tab from '../../shared/Tab.vue';
import { reactive, ref } from 'vue';
import ItemSummary from './ItemSummary.vue';
import { Time } from '../../shared/Time';

const tabKind = ref('本月')
const onUpdateSelected = (title: string) => tabKind.value = title

const time = new Time(new Date())
const customTime = reactive({
  start: new Time(),
  end: new Time()
})
const timeList = [
  {
    start: time.firstDayOfMonth(),
    end: time.lastDayOfMonth()
  },
  {
    start: time.add(-1, 'month')?.firstDayOfMonth(),
    end: time.add(-1, 'month')?.lastDayOfMonth()
  },
  {
    start: time.firstDayOfYear(),
    end: time.lastDayOfYear()
  },
]
</script>

<style scoped>
  
</style>