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
      <div>
        <Tabs :selected="tabKind" @update-selected='onUpdateSelected'>
          <Tab title="支出">item1</Tab>
          <Tab title="收入">item2</Tab>
        </Tabs>
      </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';
import Tabs from '../../shared/Tabs.vue'
import Tab from '../../shared/Tab.vue'
import {ref} from 'vue'

let tabKind = ref('支出')
// 监听tab切换
const onUpdateSelected = (title: string) => tabKind.value = title
  
</script>

<style scoped>
  
</style>