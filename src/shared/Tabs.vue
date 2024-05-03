<template>
  <div class="Tabs">
    <nav>
      <div 
      v-for="(item,index) in titles" 
      @click="select(item)"
      :class="selected === item ? 'selected' : ''"
      :key="index">{{ item }}</div>
    </nav>
    
    <!-- 动态渲染组件，is绑定哪个组件被渲染 -->
    <component :is="current" :key="current" />
    <!-- for一定要绑定key -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue';
  import Tab from './Tab.vue';

  const emits = defineEmits(['update-selected']);

  // 向父组件itemCreate传递数据title('支出','收入')，表示选中哪个tab
  const props = defineProps({
    selected: {
      type: String,
      default: () => {
        return '';
      }
    }
  })

  // 获取静态插槽的内容
  const defaults = useSlots().default?.();
  // 对插槽的类型进行校验
  defaults?.forEach(item => {
    if(item.type !== Tab){
      throw new Error('Tabs组件的子组件必须是Tab组件');
    }
  })

  // 获取插槽的title
  const titles = defaults?.map(item => item?.props?.title);

  // find返回第一个符合条件的元素,
  const current = computed(() => {
    // 通过props.selected找到对应的title，返回对应的组件
    return defaults?.find(item => item?.props?.title === props.selected)
  })

  // 点击tab，触发父组件的update-selected自定义事件
  const select = (title: string) => {
    emits('update-selected', title)
    // 传递出去的是一个方法
  }

</script>

<style lang="scss" scoped>
.Tabs {
  > nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: var(--overlay-user-status-text-color);
    > div {
      flex-grow: 1;
      flex-shrink: 0;
      padding: 12px 0;
      background: var(--navbar-bg-end);
      &.selected {
        position: relative;
        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--tabs-indicator-color);
          transition: all 0.3s;
        }
      }
    }
  }
}

  
</style>