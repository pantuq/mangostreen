<template>
  <div class="Charts">
    <div class="select" @click="openSelect">
      <input type="text" placeholder="类型" readonly>
      <div class="list" v-show="showList">
        <ul>
        <li class="option"
        :class="kind === 'expenses' ? 'selected' : ''"
        @click="kind = 'expenses'">
        支出</li>
        <li
        class="option"
        :class="kind === 'income' ? 'selected' : ''"
        @click="kind = 'income'"
        >收入</li>
      </ul>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';



  defineProps({
  startDate: {
    // type: String as PropType<string>,
    required: true
  },
  endDate: {
    // type: String as PropType<string>,
    required: true
  }
})

const showList = ref(false)
const openSelect = () => {
  showList.value = !showList.value
}

const kind = ref('expenses')



</script>

<style lang="scss" scoped>
  .Charts {
    > .select {
      margin-top: 8px;
      input {
        padding: 8px 5px;
        width: 100%;
        outline: none;
        border: 1px solid var(--select-option-bg);
        border-radius: var(--input-radius);
      }
      ul {
        width: 100%;
        padding: 1px 1px;
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: var(--main);
        border-radius: 0 0 5px 5px;
        li {
          margin: 0;
          padding: 5px;
          // list-style: none;
          border-radius: 5px;
        }

        > .selected {
          background: var(--select-option-bg);
          color: white;
        }
      }
    }
  }
</style>