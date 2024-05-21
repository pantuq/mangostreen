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
      <Button @click="DeleteTag()" level="danger" class="removeTags"
        >删除标签</Button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import TagForm from "./TagForm.vue";
import NavBar from "../../shared/NavBar.vue";
import Button from "../../shared/Button.vue";
import BackIcon from "../../shared/BackIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { yierRequest2 } from "../../service";
import { showConfirmDialog, showToast } from "vant";

const route = useRoute();
const router = useRouter();
const numberId = Number(route.params.id);

const DeleteTag = (option?: { withRecords: boolean }) => {
  showConfirmDialog({
    title: "确认删除",
    message: "删除后无法恢复，确认删除？",
    width: "80%",
    confirmButtonColor: "var(--main)",
  })
  .then(async () => {
    await yierRequest2
      .delete({
        url: `api/v1/tags/${numberId}`,
      })
      .then(() => {
        showToast({ message: "删除成功", duration: 300 });
        router.back();
      })
      .catch((err) => {
        showToast({ message: "删除失败", duration: 300 });
        console.log(err);
      });
  })
  .catch(() => {});
};
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
    .removeTags {
      width: calc(100%);
    }
  }
}
</style>
