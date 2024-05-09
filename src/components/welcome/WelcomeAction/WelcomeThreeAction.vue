<template>
  <div class="action">
    <SkipFeature class="fake"></SkipFeature>
    <RouterLink to="/welcome/4">下一页</RouterLink>
    <SkipFeature></SkipFeature>
  </div>
</template>

<script setup>
  import SkipFeature from '../../../shared/SkipFeature.vue';
</script>

<style lang="scss" scoped>
  .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px;
      font-size: 32px;
      padding: 24px 0;
      color: var(--welcome-text);
      > .fake{
        visibility: hidden;
      }
    }
</style>