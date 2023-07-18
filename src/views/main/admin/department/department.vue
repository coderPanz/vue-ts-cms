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
      <page-content ref="pageContentRef" :contentConfig="contentConfig" @create-btn-click="createBtnClick" @update-btn-click="updateBtnClick"/>
    </div>
    <div class="popUp">
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
import { searchConfig, contentConfig, popUpConfig } from '@/views/main/admin/department/config/config'
import { ref, computed } from 'vue';
import useAdminStore from '@/store/main/admin'
import type { IformData } from '@/types/index'

const adminStore = useAdminStore()

// 一. page-content组件的操作
// 1. 重置 --- 获取content组件实例调用相关方法, 重置user列表
const pageContentRef = ref<InstanceType<typeof pageContent>>()
function resetDataList() {
  pageContentRef.value?.getPageList()
}

// 2. 查询 ---- 从子组件中获取查询条件并调用请求函数查询数据
function queryDataList(formData: IformData) {
  pageContentRef.value?.getPageList(formData)
}

// 二. page-popup组件的操作

// 1. 把popUp的配置传入其组件內部时需要把配置文件中的optins初始值空数组填充所需的内容
const popUpConfigReq = computed(() => {
  popUpConfig.formConfigData.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = adminStore.departmentList
    }
  })
  return popUpConfig
})

// 2. 若新建用户成功则重新获取用户列表
function reGetDataList() {
  pageContentRef.value?.getPageList()
}

// 3. 点击新建用户按钮弹出新建用户弹窗
const pagePopUpRef = ref<InstanceType<typeof pagePopUp>>()
function createBtnClick(isShow: boolean, bool: boolean) {
  pagePopUpRef.value?.isShowExpose(isShow, bool)
}

// 4. 点击编辑用户按钮弹出编辑用户弹窗
function updateBtnClick(isShow: boolean, bool: boolean, id: string) {
  pagePopUpRef.value?.isShowExpose(isShow, bool, id)
}

</script>

<style lang="less" scoped>
</style>
