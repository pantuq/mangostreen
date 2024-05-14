<template>
  <div class="navbar">
    <div class="icon_wrapper">
      <slot class="navicon" name="icon"></slot>
    </div>

    <div class="title_wrapper">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.navbar {
  background: linear-gradient(
    to bottom,
    var(--navbar-bg-start) 0%,
    var(--navbar-bg-end) 100%
  );
  color: var(--navbar-text);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 12px 16px;
  line-height: 0.8;
  > .title_wrapper {
    font-size: 24px;
    margin-left: 12px;
  }
  > .icon_wrapper {
    vertical-align: sub;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
