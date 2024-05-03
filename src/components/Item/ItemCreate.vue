<template>
  <div class="ItemCreate">
    <NavBar>
        <template #icon>
          <svgIcon name="exit" color="white" width="26px" height="26px"></svgIcon>
        </template>
        <template #title>
          <span>记一笔</span>
        </template>
      </NavBar>
      <div class="content">
        <Tabs class="tabs" :selected="tabKind" @update-selected='onUpdateSelected'>
          <Tab title="支出" class="tags_wrapper">
            <div class="tag">
              <div class="sign">
                <svgIcon class="createTag" name="addTag" color="white" width="26px" height="26px"></svgIcon>
              </div>
              <div class="name">
                新增
              </div>
            </div>
            <div class="tag selected" v-for="item in expensesTags">
              <div class="sign">
                {{ item.sign }}
              </div>
              <div class="name">
                {{ item.name }}
              </div>
            </div>
          </Tab>
          <Tab title="收入" class="tags_wrapper">
            <div class="tag">
              <div class="sign">
                <svgIcon class="createTag" name="addTag" color="white" width="26px" height="26px"></svgIcon>
              </div>
              <div class="name">
                新增
              </div>
            </div>
            <div class="tag selected" v-for="item in incomeTags">
              <div class="sign">
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
        <InputPad></InputPad>
      </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';
import Tabs from '../../shared/Tabs.vue'
import Tab from '../../shared/Tab.vue'
import {ref} from 'vue'
import InputPad from './InputPad.vue';

let tabKind = ref('支出')
// 监听tab切换
const onUpdateSelected = (title: string) => tabKind.value = title
  
const expensesTags = ref([
  { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
  { id: 2, name: '打车', sign: '￥', category: 'expenses' },
  { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
  { id: 4, name: '打车', sign: '￥', category: 'expenses' },
  { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
  { id: 6, name: '打车', sign: '￥', category: 'expenses' },
  { id: 7, name: '聚餐', sign: '￥', category: 'expenses' },
])

const incomeTags = ref([
  { id: 4, name: '工资', sign: '￥', category: 'income' },
  { id: 5, name: '彩票', sign: '￥', category: 'income' },
  { id: 6, name: '滴滴', sign: '￥', category: 'income' },
  { id: 11, name: '彩票', sign: '￥', category: 'income' },
  { id: 18, name: '滴滴', sign: '￥', category: 'income' },
  { id: 17, name: '彩票', sign: '￥', category: 'income' },
  { id: 19, name: '滴滴', sign: '￥', category: 'income' },
  { id: 4, name: '工资', sign: '￥', category: 'income' },
  { id: 5, name: '彩票', sign: '￥', category: 'income' },
  { id: 6, name: '滴滴', sign: '￥', category: 'income' },
  { id: 11, name: '彩票', sign: '￥', category: 'income' },
  { id: 18, name: '滴滴', sign: '￥', category: 'income' },
  { id: 17, name: '彩票', sign: '￥', category: 'income' },
  { id: 19, name: '滴滴', sign: '￥', category: 'income' },
  { id: 4, name: '工资', sign: '￥', category: 'income' },
  { id: 5, name: '彩票', sign: '￥', category: 'income' },
  { id: 6, name: '滴滴', sign: '￥', category: 'income' },
  { id: 11, name: '彩票', sign: '￥', category: 'income' },
  { id: 18, name: '滴滴', sign: '￥', category: 'income' },
  { id: 17, name: '彩票', sign: '￥', category: 'income' },
  { id: 19, name: '滴滴', sign: '￥', category: 'income' },
  { id: 4, name: '工资', sign: '￥', category: 'income' },
  { id: 5, name: '彩票', sign: '￥', category: 'income' },
  { id: 6, name: '滴滴', sign: '￥', category: 'income' },
  { id: 11, name: '彩票', sign: '￥', category: 'income' },
  { id: 18, name: '滴滴', sign: '￥', category: 'income' },
  { id: 17, name: '彩票', sign: '￥', category: 'income' },
  { id: 19, name: '滴滴', sign: '￥', category: 'income' },
  { id: 4, name: '工资', sign: '￥', category: 'income' },
  { id: 5, name: '彩票', sign: '￥', category: 'income' },
  { id: 6, name: '滴滴', sign: '￥', category: 'income' },
  { id: 11, name: '彩票', sign: '￥', category: 'income' },
  { id: 18, name: '滴滴', sign: '￥', category: 'income' },
  { id: 17, name: '彩票', sign: '￥', category: 'income' },
  { id: 19, name: '滴滴', sign: '￥', category: 'income' },
])
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
  &.selected {
    .sign {
      border-color: var(--main);
    }
  }
}
</style>