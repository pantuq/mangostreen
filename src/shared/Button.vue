<template>
  <button :class="['button', $props.level]">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  level: {
    type: String as PropType<"important" | "normal" | "danger">,
    default: "normal",
  },
});
</script>

<style lang="scss" scoped>
.button {
  border: 1px solid var(--button-bg);
  padding: 8px 16px;
  height: var(--button-height);
  background: var(--button-bg);
  color: var(--button-text);
  font-size: var(--button-font-size);
  border-radius: var(--button-radius);
}
.danger {
  border: 1px solid var(--button-bg-danger);
  background: var(--button-bg-danger);
}
</style>
