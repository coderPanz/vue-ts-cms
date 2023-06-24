<template>
  <div class="app">
    <div class="search">
      <user-search />
    </div>
    <div class="content">
      <user-content />
    </div>
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue';
import userContent from './cpns/user-content.vue';
</script>

<style lang="less" scoped>
.app {
  .content {
    margin-top: 25px;
    border-radius: 8px;
    background-color: #fff;
  }
}
</style>
