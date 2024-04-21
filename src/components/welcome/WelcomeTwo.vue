<template>
  <WelcomeLayout>
    <template #icon>
      <img src="../../assets/icons/clock.svg" alt="">
    </template>
    <template #title>
      <h2>每日提醒<br>不遗漏每一笔账单</h2>
    </template>
    <template #action>
      <RouterLink class="fake" to="/start">跳过</RouterLink>
      <RouterLink to="/welcome/3">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </template>
  </WelcomeLayout>
</template>

<script setup>
import WelcomeLayout from './WelcomeLayout.vue'
</script>

<style scoped>
  @import url(./WelcomeLayout.scss);
</style>