<template>
  <div class="card">
    <img src="../../../assets/icons/chart.svg" alt="">
    <h2>数据可视化<br>收支一目了然</h2>
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