<template>
  <div class="ComingSoon">
    <NavBar>
      <template #icon>
        <BackIcon></BackIcon>
      </template>
      <template #title>
        <span>山竹记账</span>
      </template>
    </NavBar>
    <div class="icon_wrapper">
      <Center class="icon">
        <svg style="width: 128px">
               
          <use xlink:href="#icon-pig" fill="red"></use>
             
        </svg>
      </Center>
      <p class="text">敬请期待</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BackIcon from "./BackIcon.vue";
import Center from "./Center.vue";
import NavBar from "./NavBar.vue";
</script>

<style lang="scss" scoped>
.ComingSoon {
  > .icon_wrapper {
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
}
</style>
