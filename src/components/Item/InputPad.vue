<template>
  <div class="inputPad_Wrapper">
    <div class="dateAndAmount">
      <span class="date">
        <svgIcon name="date" color="white" width="24" height="24"></svgIcon>
        <span @click="showPopup">{{ FormData() }}</span>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '50%' }">
          <van-date-picker v-model="nowDate" title="选择年月" @confirm="onConfirm()" @cancel="onCancel" />
        </van-popup>
      </span>
      <span class="amount">{{amount}}</span>
    </div>
    <div class="button_Wrapper">
      <button v-for="(item,index) in buttonMap" :key="index" @click="item.onClick">{{item.text}}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Time } from '../../shared/Time';
import { ref } from 'vue';

const buttonMap = [
  {text: '1',onClick: () => {appendAmount(1)}},
  {text: '2',onClick: () => {appendAmount(2)}},
  {text: '3',onClick: () => {appendAmount(3)}},
  {text: '4',onClick: () => {appendAmount(4)}},
  {text: '5',onClick: () => {appendAmount(5)}},
  {text: '6',onClick: () => {appendAmount(6)}},
  {text: '7',onClick: () => {appendAmount(6)}},
  {text: '8',onClick: () => {appendAmount(8)}},
  {text: '9',onClick: () => {appendAmount(9)}},
  {text: '.',onClick: () => {appendAmount('.')}},
  {text: '0',onClick: () => {appendAmount(0)}},
  {text: '清空',onClick: () => {amount.value = ''}},
  {text: '提交',onClick: () => {}},

]

const now = new Date()
const nowDate = ref(new Time(now).FormData())
const FormData = () => {
  return nowDate.value.join("-")
}


const show = ref(false);
const showPopup = () => {
  show.value = true;
};
const onConfirm = () => {
  show.value = false;
};
const onCancel = () => {
  show.value = false;
};

const amount = ref('0')
const appendAmount = (value: string|number) => {
  const nString = value.toString()
  const dotIndex = amount.value.indexOf('.')
  if(amount.value.length >= 16){
    return
  }
  if(dotIndex >= 0 && amount.value.length - dotIndex > 2){
    return
  }
  if(nString === "."){
    // 如果已经有小数点了，那么就不能再出现小数点了
    if(dotIndex >= 0){
      return
    }
  }else if(nString === '0'){
    if(dotIndex === -1){
      // 如果没有小数点，且已经有过0，那么不能再次出现0
      if(amount.value === '0'){
        return
      }
    }
  }else{
    if(amount.value === '0'){
      amount.value = ''
    }
  }
  amount.value += value.toString()
}
  
</script>

<style lang="scss" scoped>
.inputPad_Wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-family: monospace;
    border-top: 1px solid var(--button-border-color);
    > .dateAndAmount {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: var(--overlay-bg);
      > .date {
        display: flex;
        font-size: 12px;
        align-items: center;
        color: var(--date-color);
        > span {
          margin-left: 8px;
        }
      }
      > .amount {
        font-size: 20px;
        color: var(--amount-color);
      }
    }
    > .button_Wrapper {
      display: grid;
      grid-template-areas: 
      "n1 n2 n3 delete"
      "n4 n5 n6 delete"
      "n7 n8 n9 submit"
      "n0 n0 nd submit";
      grid-auto-rows: 48px;
      grid-auto-columns: 1fr;
      // background: var(--overlay-bg);
      border-top: 1px solid var(--button-border-color);
      > button {
        border: none;
        border-right: 1px solid var(--button-border-color);
        border-bottom: 1px solid var(--button-border-color);
        background: transparent;
        &:nth-child(1){
          grid-area: n1;
        }
        &:nth-child(2){
          grid-area: n2;
        }
        &:nth-child(3){
          grid-area: n3;
        }
        &:nth-child(4){
          grid-area: n4;
        }
        &:nth-child(5){
          grid-area: n5;
        }
        &:nth-child(6){
          grid-area: n6;
        }
        &:nth-child(7){
          grid-area: n7;
        }
        &:nth-child(8){
          grid-area: n8;
        }
        &:nth-child(9){
          grid-area: n9;
        }
        &:nth-child(10){
          grid-area: nd;
        }
        &:nth-child(11){
          grid-area: n0;
        }
        &:nth-child(12){
          grid-area: delete;
        }
        &:nth-child(13){
          grid-area: submit;
          background: var(--button-submit-bg);
          color: var(--button-text-color);
        }
      }
    }
}
  
</style>