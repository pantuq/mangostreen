<template>
  <div class="TagCreate">
    <NavBar class="NavBar">
      <template #icon>
        <BackIcon></BackIcon>
      </template>
      <template #title>
        <span>编辑标签</span>
      </template>
    </NavBar>

    <TagForm :id="numberId"></TagForm>
    
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
import { useRoute } from "vue-router";

const route = useRoute();
const numberId = Number(route.params.id);
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
