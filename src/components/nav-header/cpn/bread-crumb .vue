<template>
  <div class="crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumbPaths" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import breadCrumb from '@/utils/Breadcrumb/breadCrumb'
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
// 获取激活菜单的路由和其父路由进行面包屑的显示
const loginStore = useLoginStore()
const route = useRoute()
const menuTree = loginStore.localMenuTree
// 获取面包屑所需的数组数据
// 因为script中的代码不是实时检测和执行的所以需要监听breadCrumbPaths中的数据变化这样模板中才能实时进行渲染, 可以使用computed或者watch
const breadCrumbPaths = computed(() => {
  return breadCrumb(route.path, menuTree)
})
</script>

<style lang="less" scoped>
.crumb {
  padding-left: 10px;
}
</style>
