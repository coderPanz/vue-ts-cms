<template>
  <div class="nav-header">
    <div class="icon" @click="navMenuSwitch">
      <el-icon size="22">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <bread-crumb />
      <div class="infos">
        <el-icon @click="clickMessage" size="22" style="margin-right: 5px;"><BellFilled /></el-icon>
        <img src="http://localhost:5173/src/assets/img/favicon.ico" alt="avatar" style="width: 27; height: 27px; border-radius: 100%;">
        <el-button @click="exitLogin" style="background-color: #ff6000; color: #fff; margin-left: 17px;">
          <span>退出登录</span>
        </el-button>
      </div>
    </div>

    <!-- 点击通知和信息弹出的提示 -->
    <div v-if='isShowNotice' class="notice">暂无通知</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import breadCrumb from '../nav-header/cpn/bread-crumb .vue'
import { localIns } from '@/utils/cache/cache'
// 1.1菜单状态图标切换
// 1.2发出事件给父组件访问isFold变量
const emit = defineEmits(['iconSwitch'])
const isFold = ref<boolean>(true)
const isShowNotice = ref<boolean>(false)

function navMenuSwitch() {
  isFold.value = !isFold.value
  emit('iconSwitch', isFold.value)
}

// 删除token, 退出登录
function exitLogin() {
  localIns.removeCache('token')
  router.push('/login')
}

// 点击通知
const clickMessage = () => {
  isShowNotice.value = !isShowNotice.value
}

</script>

<style lang="less" scoped>
.nav-header {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    padding-left: 20px;
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
.notice {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 250px;
  height: 30px;
  width: 80px;
  border-radius: 4px;
  color: white;
  background: orange;
  z-index: 899;
}
</style>
