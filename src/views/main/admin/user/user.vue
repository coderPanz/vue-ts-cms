<template>
  <div class="app">
    <div class="search">
      <user-search />
    </div>
    <div class="content">
      <div class="header">头部</div>
      <div class="table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue';
</script>

<style lang="less" scoped>
.app {
  font-size: 14px;
}
</style>
