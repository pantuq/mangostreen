<template>
  <div>
    <div class="mask" @click="$emit('closeMask')"></div>
   <div class="overlay">
    <section>
      <h2 class="user-status">未登录用户</h2>
      <p class="sign-in">点击这里登录</p>
    </section>
    <nav class="side-navbar">
      <ul>
        <li>
          <svgIcon name="chart" width="32px" height="32px"></svgIcon>
          <span>统计图表</span>
        </li>
        <li>
          <svgIcon name="export" width="32px" height="32px"></svgIcon>
          <span>导出数据</span>
        </li>
        <li>
          <svgIcon name="notice" width="32px" height="32px"></svgIcon>
          <span>记账提醒</span>
        </li>
        <li>
          <svgIcon name="signOut" width="32px" height="32px"></svgIcon>
          <span>退出登录</span>
        </li>
      </ul>
    </nav>
  </div>
  </div>

</template>

<script lang="ts" setup>

</script>

<style lang="scss"  scoped>
.mask {
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0 ,0.5);
  top: 24px;
  left: 0;
  width: 100%;
  height: calc(100% - 24px);
}

.overlay {
  position: fixed;
  z-index: 11;
  background: white;
  top: 24px;
  left: 0;
  width: 14em;
  height: calc(100% - 24px);
   > section {
    background: #5d33be;
    height: 128px;
    padding: 32px 0 44px 16px;
    > .user-status {
      color: white;
      font-weight: 350;
      font-size: 24px;
    }
    > .sign-in {
      color: white;
      font-size: 20px;
    }
   }
   > .side-navbar {
    padding: 18px 0 0 16px;
    font-size: 20px;
   }
}
</style>