<template>
  <div class="app">
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentConfig="contentConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from '@/views/main/admin/menu/config/config'


</script>

<style lang="less" scoped>
</style>
