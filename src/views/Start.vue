<template>
  <div class="Start">
    <nav>menu</nav>

    <div class="pig_wrapper">
      <Center class="pig">
        <svg style="width: 128px;">
          <use xlink:href="#icon-pig" fill="red"></use>
        </svg>
      </Center>
    </div>

    <div class="btn_wrapper">
        <Button class="btn"></Button>
    </div>
    <FloatButton></FloatButton>
  </div>
</template>

<script setup>
import Button from '../shared/Button.vue'
import FloatButton from '../shared/FloatButton.vue';
import Center from '../shared/Center.vue'
</script>

<style lang="scss" scoped>
  .btn {
    width: 100%;
    &_wrapper {
        padding: 16px;
    }
  }

  .pig {
    &_wrapper {
      padding: 160px 0;
    }
  }
</style>