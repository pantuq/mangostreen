<template>
  <div class="center">
    <slot :class="{'horizontal': horClass, 'veritical': verClass}"></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps,PropType } from 'vue';
 const props =  defineProps({
    direaction: {
        type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,
        default: 'horizontal'
    }
  }) 

  const direactionMap = {
    '-': 'horizontal',
    '|': 'vertical',
    'horizontal': 'horizontal',
    'vertical': 'vertical'
  }

  const extraClass = direactionMap[props.direaction]
  const horClass = 'horizontal' === extraClass ? true : false
  const verClass = 'veritical' === extraClass ? true: false
    
</script>

<style lang="scss" scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;

    > .horizontal {
        flex-direction: row;
    }

    > .veritical {
        flex-direction: column;
    }
  }
</style>