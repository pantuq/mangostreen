<template>
    <div class="Wrapper">
      <div class="card">
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </div>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  @import url(./WelcomeLayout.scss);
  </style>
  