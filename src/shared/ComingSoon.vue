<template>
  <div class="ComingSoon">
    <div class="icon_wrapper">
        <Center class="icon">
            <svg style="width: 128px">
                     
                <use xlink:href="#icon-pig" fill="red"></use>
                   
            </svg>
        </Center>
    </div>
    <p class="text">敬请期待</p>
  </div>
</template>

<script lang="ts" setup>
import Center from './Center.vue';

  
</script>

<style lang="scss" scoped>
  .ComingSoon {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(50%) 0;
    .icon {
      width: 128px;
      height: 128px;
      &__wrapper {
          padding: 120px 0;
      }
    }

    .text {
        padding: 20px;
        text-align: center;
        font-size: 32px;
    }
  }
</style>