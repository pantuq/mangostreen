<template>
  <div class="Tags">
    <div class="tag">
        <div class="sign">
            <svgIcon class="createTag" name="addTag" color="white" width="26px" height="26px"></svgIcon>
        </div>
        <div class="name">
        新增
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  
</script>

<style lang="scss" scoped>
  .Tags {
    .tag {
    position: relative;
    width: 20vw;
    height: calc(20vw * 1.14);
    display: flex;
    flex-direction: column;
    align-items: center;
    .sign {
        width: 12vw;
        height: 12vw;
        background: var(--tag-bg);
        border: 1px solid var(--tag-bg);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .name {
        font-size: 12px;
        margin-top: 4px;
    }
    &.selected {
        .sign {
        border-color: var(--main);
        }
    }
    }
  }
</style>