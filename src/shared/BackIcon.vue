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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const exit = () => {
  const { return_to } = route.query;
  if (return_to) {
    router.push(return_to as string);
  } else {
    router.back();
  }
};
</script>

<style lang="scss" scoped></style>
