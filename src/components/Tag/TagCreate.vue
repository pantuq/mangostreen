<template>
  <div class="TagCreate">
    <NavBar class="NavBar">
      <template #icon>
        <svgIcon name="exit" color="white" width="26px" height="26px" />
      </template>
      <template #title>
        <span>新建标签</span>
      </template>
    </NavBar>
    <TagForm></TagForm>
  </div>
</template>

<script lang="ts" setup>
import TagForm from "./TagForm.vue";
import NavBar from "../../shared/NavBar.vue";
</script>

<style lang="scss" scoped>
.TagCreate {
  position: relative;
  .NavBar {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
