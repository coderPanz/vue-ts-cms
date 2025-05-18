<!--
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-15 19:50:55
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/views/main/product/infos/infos.vue
 * 
-->
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
      <page-content
        ref="pageContentRef"
        :contentConfig="contentConfig"
        @create-btn-click="createBtnClick"
        @update-btn-click="updateBtnClick"
      >
        <template #status="scope">
          <el-button size="small" plain :type="scope.row.status ? 'primary' : 'danger'">
            {{ scope.row.status ? '上架' : '下架' }}
          </el-button>
        </template>
      </page-content>
    </div>
    <div class="popup">
      <page-pop-up
        ref="pagePopUpRef"
        @re-get-data-list="reGetDataList"
        :popUpConfig="popUpConfigReq"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { searchConfig, contentConfig, popUpConfig } from '@/views/main/product/infos/config/config'
import useAdminStore from '@/store/main/admin'
import { pageContentHooks, pagePopUpHooks } from '@/hooks/index'
import { computed } from 'vue'

const adminStore = useAdminStore()
adminStore.getDataListAction('productTypeList')

// 对select类型的数据进行处理(下拉显示数据列表)
const popUpConfigReq = computed(() => {
  popUpConfig.formConfigData.forEach((item: any) => {
    if (item.type === 'select' && item.prop === 'type') {
      // 只有status为1的数据才会被添加到options中
      item.options = adminStore.productTypeList.filter((type) => type.status === 1)
    }
  })
  return popUpConfig
})

// 对setup具有相同的逻辑进行hooks抽取
// 1. page-content组件抽取的解构
const { pageContentRef, resetDataList, queryDataList, reGetDataList } = pageContentHooks()
// 2. page-popup组件的抽取解构
const { pagePopUpRef, createBtnClick, updateBtnClick } = pagePopUpHooks()
</script>

<style lang="less" scoped></style>
