<template>
  <div class="Welcome">
    <header>
      <svg style="width: 100px; height: 100px">
             
        <!-- 'xlink：href执行用哪一个图标,属性值务必icon-图标名字·' -->
             
        <!-- use标签fi11属性可以设置图标的颜色 -->
             
        <use xlink:href="#icon-logo" fill="red"></use>
           
      </svg>
    </header>
    <div class="Wrapper">
      <main ref="main">
        <RouterView name="main" v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
      <footer>
        <RouterView name="footer"></RouterView>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.Welcome {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #333;
  background: linear-gradient(to bottom, #5d33be 0%, #8f4cd7 100%);
  > header {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 66px;
  }
  > .Wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    > main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      position: relative;

      > .slide-fade-enter-active,
      > .slide-fade-leave-active {
        transition: all 1s ease-out;
        position: absolute;
        top: 0;
        left: 0;
        width: 92%;
        height: 97.3%;
      }

      > .slide-fade-enter-from {
        transform: translateX(100vw);
      }

      > .slide-fade-leave-to {
        transform: translateX(-100vw);
      }
    }
  }
}
</style>
