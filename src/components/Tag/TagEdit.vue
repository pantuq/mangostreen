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
    <div class="button-group">
      <Button level="danger" class="removeTags">删除标签</Button>
      <Button level="danger" class="removeItemsAndTags">删除记账和标签</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TagForm from "./TagForm.vue";
import NavBar from "../../shared/NavBar.vue";
import Button from "../../shared/Button.vue";
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
  .button-group {
    padding: 0 16px 16px 16px;
    display: flex;
    justify-content: space-between;
    .removeTags,
    .removeItemsAndTags {
      width: calc(50% - 8px);
      // background-color: var(--error-color);
    }
  }
}
</style>
