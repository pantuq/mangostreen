<template>
  <div class="TagCreate">
    <form class="form" @submit="onSubmit">
      <!-- input -->
      <div class="formRow">
        <label class="formLabel">
          <span class="formItem-name">标签名</span>
          <div class="formItem-value">
            <input
              v-model="formData.name"
              class="formItem input error"
              type="text"
              placeholder="请输入2-4个汉字"
            />
          </div>
          <div class="formItem-errorHint">
            <span>{{ errors["name"] ? errors["name"][0] : " " }}</span>
            <span>&nbsp;</span>
          </div>
        </label>
      </div>
      <!-- emoji -->
      <div class="formRow">
        <label class="formLabel">
          <span class="fromItem-name">符号:{{ formData.sign }}</span>
          <div class="formItem-value">
            <EmojiSelect
              v-model="formData.sign"
              class="formItem emojiList error"
            ></EmojiSelect>
          </div>
          <div class="formItem-errorHint">
            <span>{{ errors["sign"] ? errors["sign"][0] : " " }}</span>
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
import Button from "../../shared/Button.vue";
import { onMounted, reactive } from "vue";
import EmojiSelect from "../../shared/EmojiSelect.vue";
import { validate, Rules } from "../../shared/Validate";
import yierRequest1, { yierRequest2 } from "../../service";
import { useRoute } from "vue-router";
import router from "../../router";

const props = defineProps({
  id: Number,
});
onMounted(async () => {
  if (props.id) {
    await yierRequest1
      .get({
        url: `/api/v1/tags/${props.id}`,
      })
      .then((res) => {
        formData.id = res.resource.id;
        formData.name = res.resource.name;
        formData.sign = res.resource.sign;
      });
  }
});

const route = useRoute();
// const tagKind = route.query.kind || 'expenses'
const formData = reactive<Partial<Tag>>({
  id: undefined,
  name: "",
  sign: "",
  kind: route.query.kind as "income" | "expenses" | undefined,
});
// const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
const errors = reactive({
  name: [],
  sign: [],
});

function hasErrors(errors: { [x: string]: string | any[] }) {
  for (const key in errors) {
    if (errors[key]?.length) {
      return true;
    }
  }
  return false;
}

const onSubmit = async (e: Event) => {
  e.preventDefault();
  const rules: Rules<typeof formData> = [
    { key: "name", type: "required", message: "必填" },
    {
      key: "name",
      type: "pattern",
      regex: /^.{2,4}$/,
      message: "只能填 2 到 4 个字符",
    },
    { key: "sign", type: "required", message: "必选" },
  ];
  // 校验前先清空
  Object.assign(errors, {
    name: undefined,
    sign: undefined,
  });
  Object.assign(errors, validate(formData, rules));
  if (!hasErrors(errors)) {
    if (formData.id) {
      // id有值，为标签更改操作
      await yierRequest2
        .patch({
          url: `/api/v1/tags/${formData.id}`,
          data: formData,
        })
        .then(() => {
          router.back();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // id无值 标签新建操作
      await yierRequest2
        .post({
          url: "/api/v1/tags",
          data: {
            kind: formData.kind,
            name: formData.name,
            sign: formData.sign,
          },
        })
        .then(() => {
          router.push("/items/create");
        })
        .catch((err) => {
          console.log(err);
          console.log(formData);
        });
    }
  } else {
    console.log("you err");
    console.log(errors);
  }
};
</script>

<style lang="scss" scoped>
.tips {
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
  &.button {
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
