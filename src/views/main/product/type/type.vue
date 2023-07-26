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
      <page-content ref="pageContentRef" :contentConfig="contentConfig" @create-btn-click="createBtnClick" @update-btn-click="updateBtnClick" />
    </div>
    <div class="popup">
      <page-pop-up
        ref="pagePopUpRef"
        @re-get-data-list="reGetDataList"
        :popUpConfig="popUpConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { searchConfig, contentConfig, popUpConfig } from '@/views/main/product/type/config/config'
import useAdminStore from '@/store/main/admin'
import { pageContentHooks, pagePopUpHooks } from '@/hooks/index'

const adminStore = useAdminStore()
adminStore.getDataListAction('productType')

// 对setup具有相同的逻辑进行hooks抽取
// 1. page-content组件抽取的解构
const { pageContentRef, resetDataList, queryDataList, reGetDataList } = pageContentHooks()
// 2. page-popup组件的抽取解构
const { pagePopUpRef, createBtnClick, updateBtnClick } = pagePopUpHooks()

</script>

<style lang="less" scoped>
</style>
