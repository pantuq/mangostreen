<template>
  <div class="ItemList">
    <NavBar>
      <template #icon>
        <svgIcon
          name="menu"
          color="white"
          width="26px"
          height="26px"
          @click="onClickMenu"
        />
      </template>
      <template #title>
        <span>山竹记账</span>
      </template>
    </NavBar>
    <Tabs :selected="tabKind" @update-selected="onUpdateSelected">
      <Tab title="本月">
        <ItemSummary
          :startDate="timeList[0].start.Formt()"
          :endDate="timeList[0].end.Formt()"
        />
      </Tab>
      <Tab title="上月">
        <ItemSummary
          :startDate="timeList[1].start.Formt()"
          :endDate="timeList[1].end.Formt()"
        />
      </Tab>
      <Tab title="今年">
        <ItemSummary
          :startDate="timeList[2].start.Formt()"
          :endDate="timeList[2].end.Formt()"
        />
      </Tab>
      <Tab title="自定义时间">
        <ItemSummary
          :startDate="customTime.start"
          :endDate="customTime.end"
        />
      </Tab>
    </Tabs>
    <van-overlay :show="overlayVisible" class="overlay" @click="hideOverlay">
      <div class="overlay_inner">
        <header>请选择时间</header>
        <main>
          <form @submit="onSubmitCustomTime">
            <div @click="protectContent">
              <StartFormItem
                title="开始时间"
                @start-date-change="onStartDateChange"
              ></StartFormItem>
              <EndFormItem
                title="结束时间"
                @end-date-change="onEndDateChange"
              ></EndFormItem>
            </div>
            <div class="button-wrapper">
              <button @click="hideOverlay" type="submit">确定</button>
              <button @click="hideOverlay">取消</button>
            </div>
          </form>
        </main>
      </div>
    </van-overlay>
    <OverLay v-show="menuVisible" @close-mask="hideMenu" />
    <FloatButton @click="startAccounting"></FloatButton>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "../../shared/NavBar.vue";
import Tabs from "../../shared/Tabs.vue";
import Tab from "../../shared/Tab.vue";
import { reactive, ref } from "vue";
import ItemSummary from "./ItemSummary.vue";
import { Time } from "../../shared/Time";
import OverLay from "../../shared/OverLay.vue";
import StartFormItem from "./StartFormItem.vue";
import EndFormItem from "./EndFormItem.vue";
import { yierRequest2 } from "../../service";
import router from "../../router";
import FloatButton from "../../shared/FloatButton.vue";

const tabKind = ref("本月");
const overlayVisible = ref(false);
const onUpdateSelected = (title: string) => {
  tabKind.value = title;
  // 在切换tab时，判断是否是自定义时间，如果是，则显示overlay
  showOverlay();
};

const items = ref<Item[]>([])

const onSubmitCustomTime = async(e: Event) => {
  await yierRequest2.get({
    url:"/api/v1/items",
    params:{
      page: 0,
      happende_after: customTime.start,
      happende_before: customTime.end
    }
  }).then(res=>{
    items.value = res.resources
  }).catch((err) => {
    console.log(err)
  })
  e.preventDefault();
};

const protectContent = (e: Event) => {
  // 冒泡阻止
  e.stopPropagation();
};

const time = new Time(new Date());
const customTime = reactive({
  start: new Time().Formt(),
  end: new Time().Formt(),
});
const timeList = [
  {
    start: time.firstDayOfMonth(),
    end: time.lastDayOfMonth(),
  },
  {
    start: time.add(-1, "month")?.firstDayOfMonth(),
    end: time.add(-1, "month")?.lastDayOfMonth(),
  },
  {
    start: time.firstDayOfYear(),
    end: time.lastDayOfYear(),
  },
];

const showOverlay = () => {
  if (tabKind.value === "自定义时间") {
    overlayVisible.value = true;
  } else {
    overlayVisible.value = false;
  }
};
const hideOverlay = () => {
  overlayVisible.value = false;
  // 日期选择结束，隐藏overlay
};

const onStartDateChange = (startDate: any) => {
  customTime.start = startDate.join("-");
};
const onEndDateChange = (endDate: any) => {
  console.log("endDate", endDate);
  customTime.end = endDate.join("-");
};

const menuVisible = ref(false);
const onClickMenu = () => {
  menuVisible.value = !menuVisible.value;
};
const hideMenu = () => {
  menuVisible.value = false;
};

const startAccounting = () => {
  router.push('/items/create')
}
</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  background: var(--overlay-mask-bg);
  &_inner {
    background: var(--bg);
    width: 80vw;
    > header {
      background: var(--main);
      padding: 12px 16px;
      color: var(--dialog-header-text);
    }
    > main {
      > form {
        > .button-wrapper {
          display: flex;
          justify-content: flex-end;
          margin: 8px;
          > button {
            margin: 8px;
            border: none;
            background: transparent;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
