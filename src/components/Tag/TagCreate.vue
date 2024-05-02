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
    <form>
      <div>
        <label>
          <span>标签名</span>
        </label>
      </div>

      <div>
        <label>
          <span>符号</span>
        <div>
          <nav>
            <span>表情</span>
            <span>手势</span>
            <span>职业</span>
            <span>衣服</span>
            <span>动物</span>
            <span>自然</span>
            <span>食物</span>
            <span>运动</span>
          </nav>
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ol>
      </div>
      </label>
      </div>
      
      <div>
        <p>记账时长按标签即可进行编辑</p>
      </div>

      <div>
        <button>确定</button>
      </div>
      
    </form>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../shared/NavBar.vue';

  
</script>

<style scoped>
  
</style>