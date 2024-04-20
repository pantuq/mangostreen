<template>
  <div class="One">
    <div class="card">
      <img src="../../assets/icons/pig.svg" alt="">
      <h2>会挣钱<br>还要会省钱</h2>
    </div>
    <div class="action">
      <RouterLink class="fake" to="/start">跳过</RouterLink>
      <RouterLink to="/welcome/2">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </div>
  </div>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  .One {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    > .card{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background: var(--welcome-card-bg);
      border-radius: 8px;
      padding: 16px;
      margin:16px 16px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      
      > h2 {
      margin-top: 40px;
    }
    }
    > .action {
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
  }
</style>