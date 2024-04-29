<template>
  <div class="Tab">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

defineProps({
    title: {
        type: String
    }
})
  
</script>

<style scoped>
  
</style>