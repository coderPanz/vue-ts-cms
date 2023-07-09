<template>
  <div class="app">
    <page-search :searchConfig="searchConfig"/>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue';
import searchConfig from './config/config'
</script>

<style lang="less" scoped>
.app {
  font-size: 14px;
}
</style>
