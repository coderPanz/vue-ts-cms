<template>
  <div class="dialog">
    <el-dialog center title="创建用户" width="30%" v-model="isShow" :model="dialogForm" :before-close="handleClose">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="dialogForm.password"/>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-input v-model="dialogForm.roles"/>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="dialogForm.department"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelShow">取消</el-button>
          <el-button @click="submitBtn" type="primary"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { IDialogForm } from '@/types/Dialog/dialogForm'
import useAdminStore from "@/store/main/admin"
// 初始化仓库实例
const adminStore = useAdminStore()
// 1. 点击新建后的弹出
const isShow = ref<boolean>(false)
// 不直接操作属性, 封装一层函数再继续操作就有了后期的可控制属性的空间
function isShowExpose(isParam: boolean) {
  isShow.value = !isParam
}
defineExpose({ isShowExpose })

// 2. 点击取消后关闭弹窗
function cancelShow() {
  isShow.value = !isShow.value
}

// 3. 点击弹窗 × 号时需要对isShow取反
function handleClose() {
  isShow.value = !isShow.value
}

// 4. 绑定表单中的数据
const dialogForm = reactive<IDialogForm>({
  name: '',
  password: '',
  roles: '',
  department: ''
})

// 5. 点击确认获取表单数据并携带发送到服务器继续创建操作
function submitBtn() {
  const { name, password, roles, department } = dialogForm
  adminStore.fetchCreateUser({ name, password, roles, department })
}
</script>

<style lang="less" scoped>
.dialog {
  :deep(.el-dialog) {
    padding: calc(var(--el-dialog-padding-primary)) var(--el-dialog-padding-primary)
  }
  :deep(.el-dialog__title) {
    margin-left: 25px;
  }
}

</style>
