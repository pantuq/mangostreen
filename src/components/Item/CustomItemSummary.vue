<template>
<div class="CustomItemSummary">
    <div v-if="items.length > 0" class="Summary">
        <ul class="total">
            <li class="spendding">
                <span>支出</span>
                <span>{{ handleAmount(totalExpenses) }}</span>
            </li>
            <li class="income">
                <span>收入</span>
                <span>{{ handleAmount(totalIncome) }}</span>
            </li>
            <li class="net-income">
                <span>净收入</span>
                <span>{{ handleAmount(totalIncome - totalExpenses) }}</span>
            </li>
        </ul>

        <div class="from-to">
        <div>{{ props.startDate }} 0点  =>  {{ props.endDate }} 0点</div>
        </div>
        <ol class="list">
        <li v-for="item in items" :key="item.id">
            <div class="sign">
            <span>{{ item.tags?.[0].sign }}</span>
            </div>
            <div class="text">
            <div class="tagAndAmount">
                <span class="tag">{{ item.tags?.[0].name }}</span>
                <span class="amount">￥{{ handleAmount(item.amount) }}</span>
            </div>
            <div class="time">{{ transformString(item.happened_at) }}</div>
            </div>
        </li>
        </ol>
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

    <div v-else class="start">
      <div class="pig_wrapper">
      <Center class="pig">
        <svg style="width: 128px">
               
          <use xlink:href="#icon-pig" fill="red"></use>
             
        </svg>
      </Center>
    </div>

    <RouterLink to="/items/create">
      <div class="btn_wrapper">
        <Button class="btn">开始记账</Button>
      </div>
    </RouterLink>
    </div>
    
</div>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref, watch } from "vue";
import FloatButton from "../../shared/FloatButton.vue";
import router from "../../router";
import yierRequest1, { yierRequest2 } from "../../service";
import { transformString } from "../../shared/Time";
import handleAmount from "../../shared/handleAmount";
import { showConfirmDialog, showToast } from "vant";
import Center from "../../shared/Center.vue";
import Button from "../../shared/Button.vue";
const props = defineProps({
startDate: {
    type: String as PropType<string>,
    require: true
},
endDate: {
    type: String as PropType<string>,
    require: true
}
// items:{
//   type:Array,
//   require:true
// }
})

// console.log(props.items, 'custom')
const items = ref<Item[]>([])
const page = ref(1)
let totalExpenses = ref<number>(0)
let totalIncome = ref<number>(0)


onMounted(async () => {
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
    items.value = res.resources
    itemCount.value = res.pager.count
    perPage.value = res.pager.per_page
    })
    .catch((err) => {
    console.log(err)
    })
})

watch(props,async()=>{
page.value=1
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
    items.value = res.resources
    })
    .catch((err) => {
    console.log(err)
    })

    yierRequest1
    .get({
    url: '/api/v1/items/summary',
    params: {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: 'expenses',
        group_by: 'happened_at'
    }
    })
    .then((res) => {
    totalExpenses.value = res.total
    })

yierRequest1
    .get({
    url: '/api/v1/items/summary',
    params: {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: 'income',
        group_by: 'happened_at'
    }
    })
    .then((res) => {
    totalIncome.value = res.total
    })
})

onMounted(() => {
// 获取支出总额
if (!props.startDate || !props.endDate) {
    return
}
yierRequest1
    .get({
    url: '/api/v1/items/summary',
    params: {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: 'expenses',
        group_by: 'happened_at'
    }
    })
    .then((res) => {
    totalExpenses.value = res.total
    })

yierRequest1
    .get({
    url: '/api/v1/items/summary',
    params: {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: 'income',
        group_by: 'happened_at'
    }
    })
    .then((res) => {
    totalIncome.value = res.total
    })
})

// 分页逻辑
const perPage = ref(25)
const itemCount = ref(0)
const hasMore = () => {
if (perPage.value * page.value < itemCount.value) {
    // 还有更多数据
    return true
} else {
    return false
}
}
const fetchMore = async () => {
// 还有更多数据可以点击加载更多显示更多账单数据
if (hasMore()) {
    console.log('加载更多ing')
    page.value += 1
    await yierRequest1.get({
    url: '/api/v1/items',
    params: {
        page: page.value,
        happened_after: props.startDate,
        happened_before: props.endDate
    }
    }).then((res)=>{
    // 把加载出来的数据拼接在原有数据上
    // console.log(res.resources,'new res')
    items.value.push(...res.resources)
    }).catch((err)=>{
    console.log(err)
    })
}else{
    console.log('没有更多了')
}
}
</script>

<style lang="scss" scoped>

.CustomItemSummary {
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
  .from-to {
    color: #999;
    text-align: center;
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
    padding: 32px;
    text-align: center;
    .more {
      width: 80%;
      height: 40px;
      background-color: var(--main);
      border-radius: 20px;
      color: var(--button-text-color);
    }
    .nomore {
      color: #999;
    }
  }
  .start {
    .btn {
      width: 100%;
      &_wrapper {
        padding: 16px;
      }
    }

    .pig {
      &_wrapper {
        padding: 120px 0;
      }
    }
  }
}
</style>