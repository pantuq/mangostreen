<template>
  <WelcomeLayout>
    <template #icon>
      <img src="../../assets/icons/chart.svg" alt="">
    </template>
    <template #title>
      <h2>数据可视化<br>收支一目了然</h2>
    </template>
    <template #action>
      <RouterLink class="fake" to="/start">跳过</RouterLink>
      <RouterLink to="/welcome/4">下一页</RouterLink>
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