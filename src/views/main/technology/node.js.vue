<template>
  <div class="app">
      <iframe
        src="https://nodejs.org/en"
        frameborder="1"
        class="nodejs"
        ref="iframeRef"
      ></iframe>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  .nodejs {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}
</style>
