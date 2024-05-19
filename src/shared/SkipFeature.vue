<template>
  <div class="SkipFeature">
    <RouterLink to="/items" @click="setSkip">跳过</RouterLink>
  </div>
</template>

<script lang="ts" setup>
const setSkip = () => {
  localStorage.setItem("skip", "yes");
};
</script>

<style lang="scss" scoped></style>
