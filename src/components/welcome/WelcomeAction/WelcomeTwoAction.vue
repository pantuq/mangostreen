<template>
  <div class="action">
    <RouterLink class="fake" to="/start">跳过</RouterLink>
    <RouterLink to="/welcome/3">下一页</RouterLink>
    <RouterLink to="/start">跳过</RouterLink>
  </div>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px;
      font-size: 32px;
      padding: 24px 0;
      color: var(--welcome-text);
      > .fake{
        visibility: hidden;
      }
    }
</style>