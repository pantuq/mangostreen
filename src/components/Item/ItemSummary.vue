<template>
  <div class="ItemSummary">
    <ul class="total" @click="showStatistics">
      <li>
        <span>收入</span>
        <span>128</span>
      </li>
      <li>
        <span>支出</span>
        <span>99</span>
      </li>
      <li>
        <span>净收入</span>
        <span>39</span>
      </li>
    </ul>

    <ol class="list">
      <li v-for="item in items" :key="item.id">
        <div class="sign">
          <span></span>
        </div>
        <div class="text">
          <div class="tagAndAmount">
            <div class="tag">旅行</div>
            <div class="amount">￥1234</div>
          </div>
          <div class="time">2019-01-01</div>
        </div>
      </li>
    </ol>

    <div class="more">
      <button>点击加载更多</button>
    </div>
    <div class="nomore">
      <p>暂无更多数据</p>
    </div>
    <FloatButton></FloatButton>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, ref } from "vue";
import FloatButton from "../../shared/FloatButton.vue";
import router from "../../router";
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

const items = ref<Item[]>([]);
let totalExpenses = ref<number>(0)
let totalIncome = ref<number>(0)

// 分页
const page = ref(1)
// 每页的容量
const perPage = ref(25)
// 总条数
const itemCount = ref(0)

const showStatistics = () => {
  router.push('/statistics')
}

const fetchItem1=async () => {
  if (!props.startDate || !props.endDate) {
    return
  }
  await yierRequest1
    .get({
      url: '/api/v1/items',
      params: {
        page: page.value,
        happened_after: props.startDate,
        happened_before: props.endDate
      }
    })
    .then((res) => {
      console.log(res);
      
      items.value = res.resources
      itemCount.value = res.pager.count
      perPage.value = res.pager.per_page
      // items.value.push(res.resource)
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(fetchItem1)

</script>

<style lang="scss" scoped>
.ItemSummary {
}
.total {
  background: var(--total-bg);
  display: flex;
  justify-content: space-between;
  color: var(--total-text);
  margin: 16px;
  border-radius: var(--button-radius);
  padding: 0 16px;
  > li {
    padding: 16px;
    display: flex;
    flex-direction: column;
    text-align: center;
    &:first-child {
      color: var(--total-income);
    }
    &:nth-child(2) {
      color: var(--total-expenses);
    }
  }
}
.list {
  > li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid var(--button-border-color);
    padding: 12px 16px;
  }
  .sign {
    flex-grow: 0;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--tag-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
  }
  .text {
    margin-right: 4px;
    margin-left: 4px;
    flex-grow: 1;
    flex-shrink: 1;
    .tagAndAmount {
      display: flex;
      justify-content: space-between;
      .tag {
        color: var(--list-tag-text);
      }
      .amount {
        color: var(--list-amount-text);
      }
    }
    .time {
      color: var(--list-time-text);
      margin-top: 4px;
    }
  }
}
.more {
  padding-top: 32px;
  text-align: center;
}
</style>
