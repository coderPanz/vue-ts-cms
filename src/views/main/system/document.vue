<!--
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-08 20:48:46
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/views/main/system/document.vue
 * 
-->
<template>
  <div class="app">
    <iframe :src="iframeSrc" frameborder="1" class="shop"></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { localIns } from '@/utils/cache/cache'
import { getMainPage } from '@/server/main/setMainPage'

const iframeSrc = ref('')

onMounted(async () => {
  try {
    const res = await getMainPage()
    if (res.data?.data?.icon) {
      iframeSrc.value = res.data.data.icon
    }
  } catch (error) {
    console.error('获取主页信息失败:', error)
  }
})
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  .shop {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}
</style>
