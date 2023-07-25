<template>
  <div class="login-account">
    <el-form ref="ruleFormRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" clearable style="width: 200px" class="input" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password clearable style="width: 200px" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ILogin } from '@/types'
import { type FormRules, type ElForm, ElMessage } from 'element-plus/lib/components/index.js'
import useLoginStore from '@/store/login/login'
import { localIns } from '@/utils/cache/cache'
import { validationRules } from '@/utils/FormRules/FormRules'

const NAME = 'name'
const PASSWORD = 'password'

// 1.定义login-account的数据和类型
// 1.1 若记住密码后退出登陆从localStorage中取出account信息
const account = reactive<ILogin>({
  name: localIns.getCache(NAME) ?? '',
  password: localIns.getCache(PASSWORD) ?? ''
})

// 2.设置表单验证规则
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const rules: FormRules = validationRules

// 3. 登录操作
// 3.1 登陆成功后如果点击了记住密码则缓存帐号密码
const loginStore = useLoginStore()
function loginAction(isRemember: any) {
  ruleFormRef.value?.validate((valid: any) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.fetchgetBackInfos({ name, password }).then((res) => {
        // 此时返回的res一定是没有token的, 所以需要显示登录失败提示!
        if (!res?.data.token) {
          ElMessage.error('帐号密码错误!')
        }
        // 是否记住密码
        if (isRemember) {
          localIns.setCache(NAME, name)
          localIns.setCache(PASSWORD, password)
        } else {
          localIns.removeCache(NAME)
          localIns.removeCache(PASSWORD)
        }
      })
    } else {
      ElMessage.error('输入信息格式错误!')
    }
  })
}
// 暴露方法, 以便父组件访问
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.login-account {
  .el-input {
    --el-color-primary: orange;
  }
}
</style>
