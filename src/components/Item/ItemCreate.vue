<template>
  <div class="ItemCreate">
    <NavBar>
      <template #icon>
        <svgIcon
          name="exit"
          color="white"
          width="26px"
          height="26px"
          @click="exit"
        ></svgIcon>
      </template>
      <template #title>
        <span>记一笔</span>
      </template>
    </NavBar>

    <div class="content">
      <Tabs
        class="tabs"
        :selected="tabKind"
        @update-selected="onUpdateSelected"
      >
        <Tab title="支出" class="tags_wrapper">
          <Tags @click="addTag"></Tags>

          <div
            class="tag"
            v-for="(item, index) in expensesTags"
            :key="index"
            @click="tagSelect(item.id, item.kind)"
          >
            <div class="sign" :class="selectedId === item.id ? 'selected' : ''">
              {{ item.sign }}
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </Tab>

        <Tab title="收入" class="tags_wrapper">
          <Tags @click="addTag"></Tags>

          <div
            class="tag"
            v-for="(item, index) in incomeTags"
            :key="index"
            @click="tagSelect(item.id, item.kind)"
          >
            <div class="sign" :class="selectedId === item.id ? 'selected' : ''">
              {{ item.sign }}
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>

    <div class="inputPad_wrapper">
      <InputPad @send-date-and-time="onSendDateAndTime"></InputPad>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "../../shared/NavBar.vue";
import Tabs from "../../shared/Tabs.vue";
import Tab from "../../shared/Tab.vue";
import { computed, onMounted, reactive, ref } from "vue";
import InputPad from "./InputPad.vue";
import Tags from "./Tags.vue";
import yierRequest1, { yierRequest2 } from "../../service";
import { useRoute, useRouter } from "vue-router";
import { number } from "echarts";

let tabKind = ref("支出");
// 监听tab切换
const onUpdateSelected = (title: string) => (tabKind.value = title);

const route = useRoute();
const router = useRouter();

const expensesTags = ref<Tag[]>([]);
const incomeTags = ref<Tag[]>([]);
const accountingData = reactive<accountingData>({
  kind: "expenses",
  amount: 0,
  happened_at: "",
  tag_ids: [],
});
const newTagKind = computed(() => {
  return tabKind.value === "支出" ? "expenses" : "income";
});
const exit = () => {
  router.push("/items/list");
};

onMounted(async () => {
  await yierRequest1
    .get({
      url: "/api/v1/tags",
      params: {
        kind: "expenses",
      },
    })
    .then(
      (res) => {
        expensesTags.value = res.resources;
      },
      (err) => {
        console.log(err, "tag expenses list err");
      }
    );

  await yierRequest1
    .get({
      url: "/api/v1/tags",
      params: {
        kind: "income",
      },
    })
    .then(
      (res) => {
        incomeTags.value = res.resources;
      },
      (err) => {
        console.log(err, "tag income list err");
      }
    );
});

const addTag = () => {
  const return_to = route.path;
  if (return_to) {
    router.push(
      "/tags/create?" + "kind=" + newTagKind.value + "&&return_to=" + return_to
    );
  } else {
    router.push("/tags/create");
  }
};

const selectedId = ref<number>();
const tagSelect = (id: number, kind: string) => {
  selectedId.value = id;
  accountingData.tag_ids[0] = id;
  accountingData.kind = kind;
  console.log(accountingData, "accountingData");
};

async function onSendDateAndTime(date: string, amount: number) {
  accountingData.amount = amount;
  accountingData.happened_at = date;
  await yierRequest2
    .post({
      url: "/api/v1/items",
      data: {
        kind: accountingData.kind,
        happened_at: accountingData.happened_at,
        amount: accountingData.amount,
        tag_ids: accountingData.tag_ids,
      },
    })
    .then(() => {
      router.push("/items");
    })
    .catch((err) => {
      console.log(err, "create error");
      console.log(accountingData);
    });
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 330px);
}
.tabs {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto; /* 滚动条不显示 */
}
.tabs::-webkit-scrollbar {
  display: none;
}
.inputPad_wrapper {
  flex-grow: 0;
  flex-shrink: 0;
}
.tags_wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
}
.createTag {
  fill: var(--main);
}
.tag {
  position: relative;
  width: 20vw;
  height: calc(20vw * 1.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign {
    width: 12vw;
    height: 12vw;
    background: var(--tag-bg);
    border: 1px solid var(--tag-bg);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
    font-size: 12px;
    margin-top: 4px;
  }
  .selected {
    border-color: var(--main);
  }
}
</style>
