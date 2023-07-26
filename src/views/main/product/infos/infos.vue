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
        <template #productInfos="scope">
          <img :src="scope.row.img" alt="">
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
adminStore.getDataListAction('productType')

// 对select类型的数据进行处理(下拉显示数据列表)
const popUpConfigReq =  computed(() => {
  popUpConfig.formConfigData.forEach(item => {
    if(item.type === 'select') {
      item.options = adminStore.productTypeList
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
