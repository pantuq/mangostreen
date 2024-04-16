<template>
  <div class="Welcome">
    <header>
      logo
      <h1>山竹记账</h1>
    </header>
    <main>
        <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  .Welcome {
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #333;
    > header {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    > main {
        flex-grow: 1;
    }
  }

</style>