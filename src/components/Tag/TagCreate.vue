<template>
  <div class="TagCreate">
    <NavBar class="NavBar">
      <template #icon>
        <BackIcon></BackIcon>
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
import BackIcon from "../../shared/BackIcon.vue";
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
