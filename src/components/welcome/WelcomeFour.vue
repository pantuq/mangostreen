<template>
  <WelcomeLayout>
    <template #icon>
      <img src="../../assets/icons/cloud.svg" alt="">
    </template>
    <template #title>
      <h2>云备份<br>再也不怕数据丢失</h2>
    </template>
    <template #action>
      <RouterLink class="fake" to="/start">跳过</RouterLink>
      <RouterLink to="/start">完成</RouterLink>
      <RouterLink class="fake" to="/start">跳过</RouterLink>
    </template>
  </WelcomeLayout>
</template>

<script setup>
import WelcomeLayout from './WelcomeLayout.vue'
</script>

<style scoped>
 @import url(./WelcomeLayout.scss);
</style>