<template>
  <div class="dialog">
    <el-dialog
      center
      title="创建用户"
      width="30%"
      v-model="isShow"
      :before-close="handleClose"
    >
      <el-form label-width="70px" ref="ruleFormRef" :model="dialogForm" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password" />
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="dialogForm.roles" >
            <!-- v-for渲染出所需列表 -->
            <template v-for="item in roleList" :key="item._id">
              <el-option :label="item.name" :value="item._id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="dialogForm.department">
            <template v-for="item in departmentList" :key="item._id">
              <el-option :label="item.name" :value="item._id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelShow">取消</el-button>
          <el-button :plain="true" @click="submitBtn" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IDialogForm } from '@/types/Dialog/dialogForm'
import useAdminStore from '@/store/main/admin'
import { type FormRules, ElMessage } from 'element-plus/lib/components/index.js'
import { storeToRefs } from 'pinia';
import { validationRules } from "@/utils/FormRules/FormRules"

// 初始化仓库实例
const adminStore = useAdminStore()
// 1. 点击新建后的弹出
const isShow = ref<boolean>(false)
// 1.1 不直接操作属性, 封装一层函数再继续操作就有了后期的可控制属性的空间
// 1.2 点击创建用户按钮后获取角色列表和部门列表, 并渲染到下拉单选框中, 当点击时显示可选的角色列表
function isShowExpose(isParam: boolean) {
  isShow.value = !isParam
  adminStore.fetchGetRolesList()
  adminStore.fetchGetDepartmentList()
}
// 1.3 因为fetchGetRolesList是异步的, 所以需要实时监听角色列表和部门列表值得变化情况避免获取空值得情况
const { roleList } = storeToRefs(adminStore)
const { departmentList } = storeToRefs(adminStore)
// 1.4 把isShowExpose暴露出去
defineExpose({ isShowExpose })


// 2. 点击取消后关闭弹窗
function cancelShow() {
  isShow.value = !isShow.value
}

// 3. 点击弹窗 'X'号关闭弹窗时需要对isShow取反
function handleClose() {
  isShow.value = !isShow.value
}

// 4. 绑定表单中的数据
const dialogForm = reactive<IDialogForm>({
  name: '',
  password: '',
  roles: [],
  department: []
})

// 5. 点击确认获取表单数据并携带发送到服务器继续创建操作
// 5.1 若创建成功弹窗一个成功的窗口, 若失败弹出失败窗口
// 5.2 创建成功后后需要重新获取用户列表的操作
const emit = defineEmits(['reGetDataList'])
function submitBtn() {
  const { name, password, roles, department } = dialogForm
  console.log(name, password, roles, department)
  isShow.value = !isShow.value
  adminStore.fetchCreateUser({ name, password, roles, department }).then((res: any) => {
    // 如果创建成功说明res.data.data有值, 弹出成功弹出, 否则弹出失败窗口
    if (res.data.msg === '创建成功!') {
      ElMessage({
        message: '创建成功!',
        type: 'success'
      })
      emit('reGetDataList')
    } else {
      ElMessage({
        message: '创建失败!',
        type: 'warning'
      })
    }
  })
}
// 6. 设置创建用户弹窗的表单验证规则
const rules: FormRules = validationRules

</script>

<style lang="less" scoped>
.dialog {
  :deep(.el-dialog) {
    padding: calc(var(--el-dialog-padding-primary)) var(--el-dialog-padding-primary);
  }
  :deep(.el-dialog__title) {
    margin-left: 25px;
  }
  .el-select {
    width: 100%;
  }
}
</style>
