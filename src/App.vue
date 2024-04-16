<template>
  <div>
    {{ count }}
  </div>
  <router-link to="/">Home</router-link>
  <RouterLink to="/About">About</RouterLink>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';

let count = ref(0)
</script>

<style>
</style>