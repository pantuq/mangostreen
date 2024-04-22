<template>
  <div class="Welcome">
    <header>
      <img src="../assets/icons/logo.svg" alt="">
    </header>
    <div class="Wrapper">
      <main>
        <RouterView name="main" v-slot="{Component}">
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

<script setup>
  
</script>

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
          transition: all 3s ease-out;
          position: absolute;
          top: 0;
          left: 0;
          width: 358px;
          height: 559px;
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