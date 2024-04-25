<template>
  <div>
    <div @click="$emit('closeMask')" class="mask"></div>
  <div class="overlay">
    <section>
      <h2>未登录用户</h2>
      <p>点击这里登录</p>
    </section>
    <nav>
      <ul>
        <li>
          <svgIcon name="chart" width="24px" height="24px"></svgIcon>
          <span>统计图表</span>
        </li>
        <li>
          <svgIcon name="export" width="24px" height="24px"></svgIcon>
          <span>统计图表</span>
        </li>
        <li>
          <svgIcon name="notice" width="24px" height="24px"></svgIcon>
          <span>统计图表</span>
        </li>
        <li>
          <svgIcon name="exit" width="24px" height="24px"></svgIcon>
          <span>统计图表</span>
        </li>
      </ul>
    </nav>
  </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  .mask {
    position: fixed;
    z-index: var(--z-index-overlay);
    background: var(--overlay-mask-bg);
    top: var(--top-safe-area-height);
    left: 0;
    width: 100%;
    height: calc(100% - var(--top-safe-area-height));
  }

  .overlay {
    position: fixed;
    z-index: calc(var(--z-index-overlay) + 1);
    top: var(--top-safe-area-height);
    background: var(--overlay-bg);
    left: 0;
    width: 14em;
    height: calc(100% - var(--top-safe-area-height));
  }
</style>