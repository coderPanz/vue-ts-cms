<template>
  <div class="app">
    <div class="search">
      <page-search
        @reset-data="resetDataList"
        @query-data="queryDataList"
        :searchConfig="searchConfig"
      />
    </div>
    <div class="content">
      <page-content ref="pageContentRef" :contentConfig="contentConfig">
        <template #status="scope">
          <el-button size="small" plain :type="scope.row.status ? 'primary' : 'danger'">
            {{ scope.row.status ? '启用': '禁用' }}
          </el-button>
        </template>
      </page-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IformData } from '@/types/index'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import { searchConfig, contentConfig } from '@/views/main/admin/user/config/config'

// 1. 重置 --- 获取content组件实例调用相关方法, 重置user列表
const pageContentRef = ref<InstanceType<typeof pageContent>>()
function resetDataList() {
  pageContentRef.value?.getPageList()
}

// 2. 查询 ---- 从子组件中获取查询条件并调用请求函数查询数据
function queryDataList(formData: IformData) {
  pageContentRef.value?.getPageList(formData)
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
