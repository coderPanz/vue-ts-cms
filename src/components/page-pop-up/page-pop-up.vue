<template>
  <div class="dialog">
    <el-dialog
      center
      :title="Judge ? popUpConfig.createName : popUpConfig.editName"
      width="30%"
      v-model="isShow"
      :before-close="handleClose"
    >
      <el-form
        :label-width="popUpConfig.labelWidth"
        ref="ruleFormRef"
        :model="popUpForm"
        :rules="rules"
      >
        <template v-for="item in popUpConfig.formConfigData" :key="item.prop">
          <template v-if="item.type === 'normal'">
            <el-form-item
              v-if="Judge || item.prop !== 'password'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input v-model="popUpForm[item.prop]" />
            </el-form-item>
          </template>

          <template v-else-if="item.type === 'select'">
            <el-form-item :label="item.label">
              <el-select v-model="popUpForm[item.prop]" :placeholder="item.placeholder">
                <template v-for="itemOption in item.options" :key="itemOption._id">
                  <el-option :label="itemOption.name" :value="itemOption._id" />
                </template>
              </el-select>
            </el-form-item>
          </template>

          <template v-else-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </template>
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
import useAdminStore from '@/store/main/admin'
import { type FormRules, ElMessage, type FormInstance } from 'element-plus/lib/components/index.js'
import { validationRules } from '@/utils/FormRules/FormRules'

// 接收组件的配置信息
interface IProps {
  popUpConfig: {
    pageName: string
    createName: string
    editName: string
    labelWidth?: string
    formConfigData: any[]
  }
  permissionList?: any[]
}

const props = defineProps<IProps>()
// 1. 绑定表单中的数据
const formDataList: any = {}
for (const item of props.popUpConfig.formConfigData) {
  formDataList[item.prop] = item.initialValue
}
const popUpForm = reactive(formDataList)

// 2. 设置创建用户弹窗的表单验证规则
const rules: FormRules = validationRules
const ruleFormRef = ref<FormInstance>()

// 初始化仓库实例
const adminStore = useAdminStore()
// 3. 点击新建后的弹出
const isShow = ref<boolean>(false)
// 3.1 不直接操作属性, 封装一层函数再继续操作就有了后期的可控制属性的空间
// 3.3 传入第二个参数记录点击的按钮, 若是新建btn则弹窗显示'新建用户', 若是编辑btn则显示'编辑用户'
// 3.4 backData:点击编辑按钮进行数据的回显
// 3.5 且编辑时不需要显示密码框
const Judge = ref<boolean>(true)
function isShowExpose(isParam: boolean, isJudge: boolean, backData?: any) {
  isShow.value = !isParam
  Judge.value = isJudge

  // 若为编辑则进行数据回显, 否则新建不需要回显
  if (!isJudge && backData) {
    for (const key in popUpForm) {
      popUpForm[key] = backData[key]
    }
  } else {
    for (const key in popUpForm) {
      popUpForm[key] = ''
    }
  }
}

// 4. 点击取消后先重置数据后关闭弹窗
function cancelShow() {
  ruleFormRef.value?.resetFields()
  isShow.value = !isShow.value
}

// 5. 点击弹窗 'X'号先重置数据后关闭弹窗并对isShow取反
function handleClose() {
  ruleFormRef.value?.resetFields()
  isShow.value = !isShow.value
}

// 6. 判断是新建数据or更新数据, 根据情况发送不同的网络请求
// 6.1 点击确认获取表单数据并携带发送到服务器继续创建操作
// 6.2 若创建成功弹窗一个成功的窗口, 若失败弹出失败窗口
// 6.3 创建成功后后需要重新获取用户列表的操作
// 6.4 重置数据后关闭弹窗
const emit = defineEmits(['reGetDataList'])

function submitBtn() {
  let popUpFormData = popUpForm
  // 创建或者编辑角色时, 若传入权限则接收权限
  if (props.permissionList) popUpFormData = { ...props.permissionList, ...popUpFormData }
  // Judge.value 为true则说明为创建数据, 否则为更新数据
  if (Judge.value) {
    adminStore.createDataAction(props.popUpConfig.pageName, popUpFormData).then((res: any) => {
      // 如果创建成功说明res.data.data有值, 弹出成功弹出, 否则弹出失败窗口
      if (res.data.msg === '创建成功!') {
        ElMessage({
          message: '创建成功!',
          type: 'success'
        })
        // 创建数据成功后发出查询获取数据列表的事件进行刷新操作
        emit('reGetDataList')
      } else {
        ElMessage({
          message: '创建失败!',
          type: 'warning'
        })
      }
    })
  } else {
    adminStore
      .updateDataAction(props.popUpConfig.pageName, adminStore.id, popUpFormData)
      .then((res: any) => {
        if (res.data.msg == '更新成功!') {
          ElMessage({
            message: '更新成功!',
            type: 'success'
          })
          emit('reGetDataList')
        } else {
          ElMessage({
            message: '更新失败!',
            type: 'warning'
          })
        }
      })
  }

  ruleFormRef.value?.resetFields()
  isShow.value = !isShow.value
}
// 把相关方法暴露出去
defineExpose({ isShowExpose, submitBtn })
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
  .el-tree {
    margin-top: 10px;
  }
}
</style>
