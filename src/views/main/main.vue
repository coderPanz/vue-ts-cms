<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '200px' : '70px'">
        <nav-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @iconSwitch="iconSwitch" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import navMenu from '@/components/nav-menu/nav-menu.vue'
import navHeader from '@/components/nav-header/nav-header.vue'
import { ref } from 'vue'
// 1.1接收来自nav-header组件发出的事件及参数
// 1.2记录事件参数
const isFold = ref<boolean>(true)
function iconSwitch(isSubFold: boolean) {
  isFold.value = isSubFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  font-size: 14px;
  .el-container {
    height: 100%;
    .el-aside {
      display: flex;
      justify-content: center;
      overflow-x: hidden;
      overflow-y: auto;
      transition: width 0.5s ease;
      // 隐藏滚动条
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-container {
      background-color: #f0f2f5;
    }
    .el-header {
      padding-left: 20px;
      padding-right: 22px;
      height: 46px;
      .nav-header {
        background-color: #fff;
        border-radius: 0 0 8px 8px;
      }
    }
    .el-main {
      border-radius: 8px;
    }
  }
}
</style>
