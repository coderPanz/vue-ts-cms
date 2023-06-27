<template>
  <div class="app">
    <div class="search">
      <user-search @reset-data="resetDataList" @query-data="queryDataList"/>
    </div>
    <div class="content">
      <user-content ref="userContentRef"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue';
import userContent from './cpns/user-content.vue';
import { ref } from 'vue';
import type { IformData } from '@/types/index'

// 1. 重置 --- 获取content组件实例调用相关方法, 重置user列表
const userContentRef = ref<InstanceType<typeof userContent>>()
function resetDataList() {
  userContentRef.value?.getPageList()
}

// 2. 查询 ---- 从子组件中获取查询条件并调用请求函数查询数据
function queryDataList(formData: IformData) {
  userContentRef.value?.getPageList(formData)
}

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
