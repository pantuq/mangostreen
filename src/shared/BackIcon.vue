<template>
  <div class="BackIcon">
    <svgIcon
      name="exit"
      color="white"
      width="26px"
      height="26px"
      @click="exit"
    ></svgIcon>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const exit = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
