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
    <form class="form" @submit="onSubmit">
      <!-- input -->
      <div class="formRow">
        <label class="formLabel">
          <span class="formItem-name">标签名</span>
          <div class="formItem-value">
            <input v-model="formData.name" class="formItem input error" type="text" placeholder="请输入2-4个汉字" >
          </div>
          <div class="formItem-errorHint">
            <span>{{ errors['name'] ? errors['name'][0] : ' ' }}</span>
            <span>&nbsp;</span>
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
        <span>{{ errors['sign'] ? errors['sign'][0] : ' ' }}</span>
        <span>&nbsp;</span>
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
import { validate,Rules } from '../../shared/Validate';


const formData = reactive({
  name: '',
  sign: '',
});

// const errors = reactive<{[key in keyof FormData]?: string[] }>({});
const errors = reactive({
  name: [],
  sign: []
})

const onSubmit = (e: Event) => {
  e.preventDefault();
  // 防止页面在点击事件之后表单提交

  // console.log(formData);
  // 该对象太复杂，需要用到Vue的Api来获取原始对象
  // console.log(toRaw(formData));

  const rules: Rules<typeof formData> = [
    { key: 'name', type:"required", message: '必填' },
    { key: 'name', type: 'pattern', regex: /^.{2,4}$/, message: '长度在 2 到 4 个字符' },
    { key: 'sign', type: 'required', message: '必填' }
  ]
  // 声明验证规则
  Object.assign(errors,{
    name: [],
    sign: []
  })
  Object.assign(errors, validate(formData, rules));
  
  // errors = {
  //   name: ['错误1', '错误2'],
  //   sign: ['错误1', '错误2']
  // } 错误类型
  
};
  
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