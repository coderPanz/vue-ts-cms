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
        <template #parentId="scope">
          <span>
            {{ scope.row.parentId }}
          </span>
        </template>
      </page-content>
    </div>
    <div class="popUp">
      <page-pop-up
        ref="pagePopUpRef"
        @re-get-data-list="reGetDataList"
        :popUpConfig="popUpConfig"
        :permissionList="permissionList"
      >
        <template #permissions>
          <div class="permissTitle">权限分配</div>
          <el-tree
            ref="treeRef"
            :data="menuList"
            show-checkbox
            node-key="_id"
            highlight-current
            :props="defaultProps"
            @check="checkClick"
          />
        </template>
      </page-pop-up>
    </div>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { searchConfig, contentConfig, popUpConfig } from '@/views/main/admin/role/config/config'
import useAdminStore from '@/store/main/admin'
import { pageContentHooks, pagePopUpHooks } from '@/hooks/index'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus/lib/components/index.js'

// 插槽(展示树形结构菜单)
const adminStore = useAdminStore()
const { menuList } = storeToRefs(adminStore)

const defaultProps = {
  children: 'children',
  label: 'name',
}

const permissionList = ref<any[]>([])
// 1. 点击节点复选框之后触发(通过参数二获取其权限id列表, 并传入popup组件进行角色的创建)
function checkClick(data1: any, data2: any) {
  let permissionIds: any[] = []
  permissionIds = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  permissionList.value = permissionIds
}

// 2.1 权限回显的高阶操作(难点: 把hooks中的数据提取出来, 通过传入函数进入hooks, 在其内部调用函数并传出所需数据)
// 2.2 得到权限id列表后设置对应的节点
const treeRef = ref<InstanceType<typeof ElTree>>()

// 2.3 点击编辑回显
function backPermission(backData: any) {
  // 当dom渲染弹窗成功后立即执行回显操作, 完成实时渲染回显
  nextTick(() => {
    treeRef.value?.setCheckedKeys(backData.menus)
  })
}
// 2.4 点击新建清空回显
function clearBackShow() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

// 对setup具有相同的逻辑进行hooks抽取
// 1. page-content组件抽取的解构
const { pageContentRef, resetDataList, queryDataList, reGetDataList } = pageContentHooks()
// 2. page-popup组件的抽取解构
const { pagePopUpRef, createBtnClick, updateBtnClick } = pagePopUpHooks(backPermission, clearBackShow)

</script>

<style lang="less" scoped>
  .permissTitle {
    margin-left: 13px;
    margin-bottom: 10px;
  }
</style>
