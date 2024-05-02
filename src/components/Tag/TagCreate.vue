<template>
  <div class="TagCreate">
    <NavBar>
      <template #icon>
        <svgIcon name="exit" color="white" width="26px" height="26px"/>
      </template>
      <template #title>
        <span>新建标签</span>
      </template>
    </NavBar>
    <form class="form">
      <!-- input -->
      <div class="formRow">
        <label class="formLabel">
          <span class="formItem-name">标签名</span>
          <div class="formItem-value">
            <input v-model="formData.name" class="formItem input error" type="text" placeholder="请输入2-4个汉字" >
          </div>
          <div class="formItem-errorHint">
            <span>必填</span>
          </div>
        </label>
      </div>
      <!-- emoji -->
      <div class="formRow">
        <label class="formLabel">
          <span class="fromItem-name">符号:{{ formData.sign }}</span>
        <div class="formItem-value">
          <EmojiSelect v-model="formData.sign" class="formItem emojiList error"></EmojiSelect>
      </div>
      <div class="formItem-errorHint">
        <span>必填</span>
      </div>
      </label>
      </div>
      <!-- tips -->
      <div class="tips">
        <p>记账时长按标签即可进行编辑</p>
      </div>
    <!-- button -->
      <div class="formRow">
        <div class="formItem-value">
          <Button class="formItem button">确认</Button>
        </div>
      </div>
      
      
    </form>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';
import Button from '../../shared/Button.vue'
import { reactive } from 'vue';
import EmojiSelect from '../../shared/EmojiSelect.vue'

const formData = reactive({
  name: '',
  sign: '',
});
  
</script>

<style lang="scss" scoped>
.tips{
  text-align: center;
  padding: 16px 0;
}
.form {
  padding: 16px;
}
.formRow {
  margin-top: 8px;
}
.formLabel {
}
.formItem {
  min-height: var(--input-min-height);
  max-width: 100%;
  &.button{
    width: 100%;
  }
  &.input {
    flex-grow: 1;
    border: 1px solid var(--input-border-color);
    border-radius: var(--input-radius);
    font-size: 18px;
    font-family: inherit;
    padding-left: 16px;
    padding-right: 16px;
    box-shadow: inset 0 0 3px var(--input-shadow);
    &.error {
      border-color: var(--error-color);
    }
  }
  
  &-name {
  }
  &-value {
    display: flex;
    margin-top: 4px;
  }
  &-errorHint {
    margin-top: 4px;
    color: var(--error-color);
    font-size: 12px;
  }
}

  
</style>