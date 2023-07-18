<template>
  <div class="app">
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentConfig="contentConfig"
        @create-btn-click="createBtnClick"
        @update-btn-click="updateBtnClick"
      />
    </div>
    <div class="popUp">
      <page-pop-up
        ref="pagePopUpRef"
        @re-get-data-list="reGetDataList"
        :popUpConfig="popUpConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { contentConfig, popUpConfig } from '@/views/main/admin/menu/config/config'
import { pageContentHooks, pagePopUpHooks } from '@/hooks/index'

// 对setup具有相同的逻辑进行hooks抽取
// 1. page-content组件抽取的解构
const { pageContentRef, resetDataList, queryDataList, reGetDataList } = pageContentHooks()
// 2. page-popup组件的抽取解构
const { pagePopUpRef, createBtnClick, updateBtnClick } = pagePopUpHooks()

</script>

<style lang="less" scoped>
.app {
  font-size: 14px;
}
</style>
