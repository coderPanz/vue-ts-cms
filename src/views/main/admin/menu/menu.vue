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
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from '@/views/main/admin/menu/config/config'
import { pageContentHooks, pagePopUpHooks } from '@/hooks/index'
import { ref } from 'vue'

// 新建一级菜单
const isShow = ref<boolean>(true) // 控制弹窗的出现和消失(一开始为是消失的状态)
const isJudge = ref<boolean>(true) // 判断点击的弹窗的是新建or编辑
function newlevelOneMenu() {
  pagePopUpRef.value?.isShowExpose(isShow.value, isJudge.value)
}

// 对setup具有相同的逻辑进行hooks抽取
// 1. page-content组件抽取的解构
const { pageContentRef, reGetDataList } = pageContentHooks()
// 2. page-popup组件的抽取解构
const { pagePopUpRef, createBtnClick, updateBtnClick } = pagePopUpHooks()
</script>

<style lang="less" scoped>
.app {
}
</style>
