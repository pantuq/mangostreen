<template>
  <div class="Start">
    <div class="btn_wrapper">
        <Button class="btn"></Button>
    </div>
    <FloatButton></FloatButton>
  </div>
</template>

<script setup>
import Button from '../shared/Button.vue'
import FloatButton from '../shared/FloatButton.vue';
  
</script>

<style lang="scss" scoped>
  .btn {
    width: 100%;
    &_wrapper {
        padding: 16px;
    }
  }
</style>