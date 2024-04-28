<template>
  <div class="ItemCreate">
    <NavBar>
        <template #icon>
          <svgIcon name="exit" color="white" width="26px" height="26px" @click="onClickMenu"></svgIcon>
        </template>
        <template #title>
          <span>记一笔</span>
        </template>
      </NavBar>
      <div>
        <Tabs selected="{reKind.value}" onUpdateSelected={onUpdateSelected}>
          <Tabs name="支出"></Tabs>
          <Tabs name="收入"></Tabs>
        </Tabs>
      </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';
import Tabs from '../../shared/Tabs.vue'
import {ref} from 'vue'

const reKind = ref('支出')
const onUpdateSelected = (name: String) => reKind.value = name
  
</script>

<style scoped>
  
</style>