<template>
  <div class="Start">
      <NavBar>
        <template #icon>
          <svgIcon name="menu" color="white" width="26px" height="26px" @click="onClickMenu"></svgIcon>
        </template>
        <template #title>
          <span>山竹记账</span>
        </template>
      </NavBar>

    
      <div class="pig_wrapper">
      <Center class="pig">
        <svg style="width: 128px;">
          <use xlink:href="#icon-pig" fill="red"></use>
        </svg>
      </Center>
    </div>
    
    <RouterLink to="/items/create">
      <div class="btn_wrapper">
        <Button class="btn"></Button>
    </div>
    </RouterLink>
    
    <FloatButton></FloatButton>

    <OverLay v-show="overlayVisible" @close-mask="overlayClose"></OverLay>
  </div>
</template>

<script lang="ts" setup>
import Button from '../shared/Button.vue'
import FloatButton from '../shared/FloatButton.vue';
import Center from '../shared/Center.vue'
import NavBar from '../shared/NavBar.vue';
import OverLay from '../shared/OverLay.vue';
import { ref } from 'vue';


const overlayVisible = ref(false)

const onClickMenu = () => {
  overlayVisible.value = !overlayVisible.value
}

const overlayClose = () => {
  overlayVisible.value = false
}
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
      padding: 120px 0;
    }
  }
</style>