<template>
  <div class="ItemSummary">
    <!-- 总结 -->
    <ul class="total" @click="showStatistics">
      <li>
        <span>收入</span>
        <span>{{ handleAmount(totalExpenses) }}</span>
      </li>
      <li>
        <span>支出</span>
        <span>{{ handleAmount(totalIncome) }}</span>
      </li>
      <li>
        <span>净收入</span>
        <span>{{ handleAmount(totalIncome - totalExpenses) }}</span>
      </li>
    </ul>
    <!-- item -->
    <ol class="list">
      <li v-for="item in items" :key="item.id">
        <div class="sign">
          <span>{{ item?.tags?.[0].sign }}</span>
        </div>
        <div class="text">
          <div class="tagAndAmount">
            <div class="tag">{{ item?.tags?.[0].name }}</div>
            <span class="amount">{{ item.kind === 'expenses' ? '-' : '' }}{{ handleAmount(item.amount) }}</span>
          </div>
          <div class="time">{{ transformString(item.happened_at) }}</div>
        </div>
      </li>
    </ol>
    <!-- 加载数据 -->
    <div class="aboutMore">
      <div class="more" v-if="hasMore()">
        <button @click="fetchMore">点击加载更多</button>
      </div>
      <div class="nomore" v-else>
        <p>暂无更多数据</p>
      </div>
    </div>
    <!-- 浮动按钮，添加item和tag -->
    <FloatButton></FloatButton>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, ref } from "vue";
import FloatButton from "../../shared/FloatButton.vue";
import router from "../../router";
import yierRequest1, { yierRequest2 } from "../../service";
import { transformString }from "../../shared/Time";
import handleAmount from "../../shared/handleAmount";

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

const fetchItem = async() => {
  if (!props.startDate || !props.endDate) {
    return
  }
  await yierRequest1.get({
      url: '/api/v1/items',
      params: {
        page: page.value,
        happened_after: props.startDate,
        happened_before: props.endDate
      }
    }).then((res) => {
      console.log(res);
      
      items.value = res.resources
      itemCount.value = res.pager.count
      perPage.value = res.pager.per_page
      // items.value.push(res.resource)
    }).catch((err) => {
      console.log(err)
    })
}
onMounted(fetchItem)

const hasMore = () => {
  return page.value * perPage.value < itemCount.value
}

const fetchMore = async() => {
  if(hasMore()){
    console.log('正在加载更多项');
    page.value += 1
    await yierRequest2.get({
      url: "/api/v1/items",
      params: {
        page: page.value,
        happened_after: props.startDate,
        happened_before: props.endDate
      }
    }).then((res) => {
      // 把加载的数据添加到items中
      items.value.push(...res.resources)
    }).catch((err) => {
      console.log(err)
    })
  }else{
    console.log('没有更多数据了');
  }
}

// 获取支出和收入总金额
const fetchTotal = async() => {
  if(!props.startDate || !props.endDate) {
    return
  }
  await yierRequest1.get({
    url: '/api/v1/items/summary',
    params: {
      happened_after: props.startDate,
      happened_before: props.endDate,
      kind: 'expenses',
      group_by: 'happened_at'
    }
  }).then((res) => {
    totalExpenses.value = res.total
  })

  await yierRequest1.get({
    url: '/api/v1/items/summary',
    params: {
      happened_after: props.startDate,
      happened_before: props.endDate,
      kind: 'income',
      group_by: 'happened_at'
    }
  }).then((res) => {
    totalIncome.value = res.total
  })
}
onMounted(fetchTotal)
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
.aboutMore {
  padding-top: 32px;
  text-align: center;
  .more {
    width: 80%;
    height: 40px;
    background-color: var(--main);
    border-radius: 20px;
    color: var(--button-text-color)
  }
  .nomore {
    color: #999;
  }
}
</style>
