<template>
  <div class="nav-menu">
    <div class="system-name">
      <img src="../../assets//img//favicon.ico" alt="" />
      <span v-show="isFold">小米后台</span>
    </div>
    <el-menu :default-active="$route.path" router :collapse="!isFold" active-text-color="#ff6900">
      <template v-for="item in menuTree" :key="item.id">
        <!-- 子菜单 -->
        <el-sub-menu :index="item.url">
          <!-- 通过具名插槽设置父菜单的icon和name -->
          <template #title>
            <!-- 通过动态组件来设置icon -->
            <el-icon class="icon">
              <component :is="item.icon"></component>
            </el-icon>
            <!-- 设置name -->
            <span class="name">{{ item.name }}</span>
          </template>
          <!-- 遍历子菜单list -->
          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.url">
              <span class="name">{{ subItem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'

// 获取store中的menuTree
const loginStore = useLoginStore()
const menuTree = loginStore.localMenuTree

// 1.1菜单显示与隐藏状态切换
// 1.2接收父组件的参数
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  width: auto;
  .system-name {
    display: flex;
    align-items: center;
    padding: 12px 10px 8px 30px;
    img {
      width: 22px;
      height: 22px;
      margin: 0 10px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }
  }
  .el-menu {
    .el-menu-item {
      padding-left: 71px;
    }
    --el-menu-hover-bg-color: #faecd8;
  }
  .el-icon {
    color: #ff6900;
    margin-right: 13px;
  }
}
</style>
