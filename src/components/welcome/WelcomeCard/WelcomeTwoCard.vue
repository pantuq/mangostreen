<template>
  <div class="card">
    <svg style="width: 128px;">
      <use xlink:href="#icon-clock" fill="red"></use>
    </svg>
    <h2>每日提醒<br>不会遗漏每一笔账单</h2>
  </div>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  .card{
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
</style>