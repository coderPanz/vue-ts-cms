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
        <el-icon size="22" style="margin-right: 5px" @click="setting"><Setting /></el-icon>
        <el-icon @click="clickMessage" size="22" style="margin-right: 5px"><BellFilled /></el-icon>
        <div style="cursor: pointer" @click="centerDialogVisible = true">
          <el-icon size="22" style="margin-right: 5px"><UserFilled /></el-icon>
        </div>
        <el-button
          @click="exitLogin"
          style="background-color: #ff6000; color: #fff; margin-left: 17px"
        >
          <span>退出登录</span>
        </el-button>
      </div>
    </div>

    <!-- 点击通知和信息弹出的提示 -->
    <div v-if="isShowNotice" class="notice" style="margin-right: 30px">暂无通知</div>
    <el-dialog v-model="centerDialogVisible" title="账户信息" width="500" align-center>
      <p style="margin-bottom: 10px; font-weight: 600">企业名称: {{ companyName }}</p>
      <p style="margin-bottom: 10px; font-weight: 600">账户名称: {{ accountName }}</p>
      <p style="margin-bottom: 10px; font-weight: 600">注册时间: {{ registrationDate }}</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 设置弹窗 -->
    <el-dialog v-model="settingDialogVisible" title="设置" width="500" align-center>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="商城名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="商城地址">
          <el-input v-model="form.url" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm"> 确认 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import breadCrumb from '../nav-header/cpn/bread-crumb .vue'
import { localIns } from '@/utils/cache/cache'
import { reactive } from 'vue'
import { setMainPage } from '@/server/main/setMainPage'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { menuTreeReq } from '@/server/index'
import useLoginStore from '@/store/login/login'

// 1.1菜单状态图标切换
// 1.2发出事件给父组件访问isFold变量
const emit = defineEmits(['iconSwitch'])
const isFold = ref<boolean>(true)
const isShowNotice = ref<boolean>(false)
const centerDialogVisible = ref(false)
const settingDialogVisible = ref(false)
// 假设这些信息是从某个地方获取的
const companyName = ref(localIns.getCache('companyName') || '示例企业')
const accountName = ref(localIns.getCache('accountName') || '示例账户')
const registrationDate = ref(
  new Date(localIns.getCache('registrationDate') || '2023-10-01').toLocaleDateString()
)

const form = reactive({
  name: '',
  url: ''
})

// 提交
const submitForm = async () => {
  // 判断url是否合法
  let finalUrl = form.url
  try {
    if (form.url) new URL(form.url)
  } catch (error) {
    ElMessage.error('请输入合法的URL地址')
    return
  }

  const res = await setMainPage(form.name, finalUrl)
  if (res.status === 200) {
    settingDialogVisible.value = false
    // 获取角色ID
    const roleId = localIns.getCache('roleId')
    // 调用menuTreeReq获取最新菜单树
    const menuTreeData = await menuTreeReq(roleId)
    // 更新store中的localMenuTree
    localIns.setCache('localMenuTree', menuTreeData.data.data)
    console.log('权限', menuTreeData.data.data)
    // 强制刷新页面以应用新设置
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } else {
    ElMessage.error('设置失败，请稍后重试')
  }
}

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

// 点击设置
const setting = () => {
  settingDialogVisible.value = true
}

// 保存设置
const saveSetting = () => {
  settingDialogVisible.value = false
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
  right: 200px;
  height: 30px;
  width: 80px;
  border-radius: 4px;
  color: white;
  background: orange;
  z-index: 899;
}
</style>
