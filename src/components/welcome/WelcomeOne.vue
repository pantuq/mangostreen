<template>
  <WelcomeLayout>
    <template #icon>
      <img src="../../assets/icons/pig.svg" alt="">
    </template>

    <template #title>
      <h2>会挣钱<br>还会省钱</h2>
    </template>

    <template #action>
      <RouterLink class="fake" to="/start">跳过</RouterLink>
      <RouterLink to="/welcome/2">下一页</RouterLink>
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