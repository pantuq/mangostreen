<template>
  <div class="SignInPage">
    <NavBar>
      <template #icon>
        <svgIcon name="exit" color="white" width="26px" height="26px"></svgIcon>
      </template>
      <template #title>
        <span>登录</span>
      </template>
    </NavBar>

    <div class="logo">
      <Center>
        <svgIcon
          name="mangosteen"
          color="white"
          width="84px"
          height="84px"
        ></svgIcon>
      </Center>
      <h2 class="title">山竹记账</h2>
    </div>

    <form class="sign-in-form" @submit="handleSubmit">
      <div class="email">
        <div>邮箱地址</div>
        <input
          class="email-address"
          type="text"
          v-model="formData.email"
          placeholder="请输入邮箱，然后点击发送验证码"
        />
        <div class="error-hint">
          <span>{{ errors.email?.[0] }}</span>
          <span>&nbsp;</span>
        </div>
      </div>
      <div class="sms">
        <div>验证码</div>
        <input
          class="sms-code"
          type="text"
          v-model="formData.code"
          placeholder="请输入六位数字"
        />
        <Button :disabled="isCounting" @click="onClickSendValidateCode">{{
          isCounting ? `${count}秒后可重新点击` : "发送验证码"
        }}</Button>
        <div class="error-hint">
          <span>{{ errors.code?.[0] }}</span>
          <span>&nbsp;</span>
        </div>
      </div>
      <div class="sign-in">
        <Button>登录</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "../shared/NavBar.vue";
import Button from "../shared/Button.vue";
import { computed, reactive, ref } from "vue";
import { validate } from "../shared/Validate";
import Center from "../shared/Center.vue";
import axios from "axios";
import router from "../router";
import { yierRequest2 } from "../service";
// import { http } from '../shared/Http';

const formData = reactive({
  email: "tuq_5986@163.com",
  code: "",
});

const errors = reactive({
  email: [],
  code: [],
});

const hasError = (errors: Record<string, string[]>) => {
  let res = false;
  for (let key in errors) {
    if (errors[key].length > 0) {
      res = true;
      break;
    }
  }
  return res;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  Object.assign(errors, {
    email: [],
    code: [],
  });
  Object.assign(
    errors,
    validate(formData, [
      // 用assign覆盖常量
      { key: "email", type: "required", message: "必填" },
      {
        key: "email",
        type: "pattern",
        regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: "邮箱格式错误",
      },
      { key: "code", type: "required", message: "必填" },
    ])
  );
  if (!hasError(errors)) {
    console.log("no error");
    const response = await yierRequest2.post({
      url: "/api/v1/session",
      params: {
        email: formData.email,
        code: formData.code,
      },
    });
    localStorage.setItem("jwt", response.jwt);
    // const returnTo = route.query.return_to?.toString()
    // console.log(returnTo, 'returnto---')
    // router.push(returnTo ? returnTo : '/')
    router.push("/items/list");
  }
};

const onError = (error: any) => {
  if (error.response.status === 422) {
    Object.assign(errors, error.response.data.errors);
  }
  throw error;
};

const onClickSendValidateCode = async () => {
  const response = await yierRequest2
    .post({
      url: "/api/v1/validation_codes",
      params: {
        email: formData.email,
      },
    })
    .then(() => {
      conutDown();
    })
    .catch(onError);
  console.log(response);
};

const timer = ref();
const count = ref<number>(3);
const isCounting = computed(() => !!timer.value);
const conutDown = () => {
  timer.value = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      clearInterval(timer.value);
      timer.value = undefined;
      count.value = 3;
    }
  }, 1000);
};
</script>

<style lang="scss" scoped>
.SignInPage {
  > .sign-in-form {
    padding: 24px 16px;
    > .email,
    .sms {
      > input {
        border: 1px solid var(--main);
        border-radius: 8px;
        height: 46px;
        margin: 4px 0;
        padding: 16px;
      }
      > div {
        font-size: 20px;
      }
      > .email-address {
        width: 100%;
      }
      > .sms-code {
        width: 9em;
      }
      > Button {
        margin-left: 8px;
        width: calc(100% - 9em);
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      > .error-hint {
        margin-top: 4px;
        > span {
          color: var(--error-color);
        }
        font-size: 12px;
      }
    }
    > .sign-in {
      margin-top: 96px;
      > Button {
        width: 100%;
      }
    }
  }
  > .logo {
    display: flex;
    flex-direction: column;
    margin-top: 42px;
    align-items: center;
    > .title {
      margin-top: 8px;
      font-weight: 800;
      font-size: 40px;
      color: var(--logo-text-color);
    }
  }
}
</style>
