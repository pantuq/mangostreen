<template>
  <div class="inputPad_Wrapper">
    <span class="date">
      <svgIcon name="date" color="white"></svgIcon>
      <span>2024-01-01</span>
    </span>
    <span class="amount">金额</span>
    <div class="button_Wrapper">
      <button v-for="(item,index) in buttonMap" :key="index" @click="item.onClick">{{item.text}}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

const buttonMap = [
  {text: '1',onClick: () => {}},
  {text: '2',onClick: () => {}},
  {text: '3',onClick: () => {}},
  {text: '清空',onClick: () => {}},
  {text: '4',onClick: () => {}},
  {text: '5',onClick: () => {}},
  {text: '6',onClick: () => {}},
  {text: '+',onClick: () => {}},
  {text: '7',onClick: () => {}},
  {text: '8',onClick: () => {}},
  {text: '9',onClick: () => {}},
  {text: '-',onClick: () => {}},
  {text: '.',onClick: () => {}},
  {text: '0',onClick: () => {}},
  {text: '删除',onClick: () => {}},
  {text: '提交',onClick: () => {}},

]
  
</script>

<style lang="scss" scoped>
.inputPad_Wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    > .button_Wrapper {
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid var(--button-border-color);
      > button {
        border: none;
        border-right: 1px solid var(--button-border-color);
        border-bottom: 1px solid var(--button-border-color);
        width: 25%;
        height: 48px;
        background: transparent;
        &:nth-child(4n){
          border-right: none;
        }
      }
    }
}
  
</style>