<template>
  <div class="StartFormItem">
    <span class="title">{{ props.title }}</span>
    <div class="date-wrapper">
    <span class="current-date" @click="showPopup">{{ FormData() }}</span>
    <van-popup position="bottom" v-model:show="show" :style="{ height: '40%' }">
        <van-date-picker 
        v-model="nowDate" 
        title="选择年月" 
        @confirm="onConfirm" 
        @cancel="onCancel" 
        />
    </van-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Time } from "../../shared/Time";
import { onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        require: true
    }
})

const emit = defineEmits(['startDateChange'])

const now = new Date()
const nowDate = ref(new Time(now).FormData())
const FormData = () => {
  // 格式化时间
  return nowDate.value.join("-")
}

onMounted(() => {
  // 在组件挂载时，就发送事件
  emit('startDateChange', nowDate.value)
})

const show = ref(false);
const showPopup = () => {
  show.value = true;
  emit('startDateChange', nowDate.value)
  // 展示时间选择器
  // 更新时间
};
const onConfirm = () => {
  show.value = false;
  emit('startDateChange', nowDate.value)
  // 确定时间
  // 更新时间
};
const onCancel = () => {
  show.value = false;
  // 点击取消更新 显示当天时间
  nowDate.value = new Time(now).FormData()
};
</script>

<style lang="scss" scoped>
.StartFormItem {
    > .title {
    display: block;
    text-align: center;
    font-size: 20px;
    }
    > .date-wrapper {
        > span {
        display: block;
        padding: 12px 16px;
        margin: 8px;
        font-size: 16px;
        border: 1px solid gray;
        border-radius: 8px;
        color: gray;
        cursor: pointer;
        text-align: center;
        }
    }
}
</style>