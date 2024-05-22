<template>
  <div class="BarChart">
    <div class="demo3">
      <div class="topItem" v-for="(item, index) in props.data" :key="index">
        <div class="sign">
          {{ item.tag.sign }}
        </div>
        <div class="bar_wrapper">
          <div class="bar_text">
            <span>{{ item.tag.name }} - {{ item.percent }}</span>
            <span>￥{{ handleAmount(item.amount) }}</span>
          </div>
          <div class="bar">
            <div class="bar_inner" :style="{ width: item.percent }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import handleAmount from '../../shared/handleAmount';


const props = defineProps({
  data: {
    type: Array as PropType<{tag: Tag; amount: number; percent: string;}[]>,
    require: true
  }
})
// import { reactive, computed } from "vue";


// const data3 = reactive([
//   { tag: { id: 1, name: "房租", sign: "x" }, amount: 3000 },
//   { tag: { id: 2, name: "吃饭", sign: "x" }, amount: 1000 },
//   { tag: { id: 3, name: "娱乐", sign: "x" }, amount: 900 },
// ]);
// const betterData3 = computed(() => {
//   // 获得百分比
//   const total = data3.reduce((sum, item) => sum + item.amount, 0);
//   return data3.map((item) => ({
//     ...item,
//     percent: Math.round((item.amount / total) * 100) + "%",
//   }));
// });
</script>

<style lang="scss" scoped>
.BarChart {
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
        background: #8f4cd7;
      }
    }
    // &:nth-child(1) {
    //   .bar_inner {
    //     background: #eba953;
    //   }
    // }
    // &:nth-child(2) {
    //   .bar_inner {
    //     background: #53a867;
    //   }
    // }
    // &:nth-child(3) {
    //   .bar_inner {
    //     background: #91cc75;
    //   }
    // }
  }
}
</style>
