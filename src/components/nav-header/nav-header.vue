<template>
  <div class="nav-header">
    <div class="icon" @click="navMenuSwitch">
      <el-icon size="22">
        <component :is="isFold ? 'Fold': 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <bread-crumb /> 
      <div class="infos">
        <el-icon size="22"><BellFilled /></el-icon>
        <el-icon size="22"><Message /></el-icon>
        <el-avatar> user </el-avatar>
        <el-dropdown>
          <el-button type="primary">
            <span>个人中心</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import breadCrumb from '../nav-header/cpn/bread-crumb .vue'
// 1.1菜单状态图标切换
// 1.2发出事件给父组件访问isFold变量
const emit = defineEmits(['iconSwitch'])
const isFold = ref<boolean>(true)
  function navMenuSwitch() {
    isFold.value = !isFold.value
    emit('iconSwitch', isFold.value)
  }
</script>

<style lang="less" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
  }
  .content {
    height: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    .Breadcrumb {
      font-size: 18px;
      padding: 10px;
    }
    .infos {
      display: flex;
      align-items: center;
      .el-icon {
        padding: 10px;
        cursor: pointer;
      }
      .el-avatar {
        width: 32px;
        height: 32px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
      .el-dropdown {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
