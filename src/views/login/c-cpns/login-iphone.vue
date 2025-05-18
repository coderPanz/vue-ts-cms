<!--
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-12 23:36:42
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/views/login/c-cpns/login-iphone.vue
 * 
-->
<template>
  <div class="login-iphone">
    <el-form ref="ruleFormRef" label-width="100px" :model="iphoneInfos" :rules="rules">
      <el-form-item label="企业名称" prop="companyName" required>
        <el-input
          placeholder="请输入企业名称"
          v-model="iphoneInfos.companyName"
          clearable
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label-width="100px" label="账号名称" prop="accountName" required>
        <el-input
          placeholder="请输入账号名称"
          clearable
          style="width: 200px"
          v-model="iphoneInfos.accountName"
        />
      </el-form-item>
      <el-form-item label-width="100px" label="密码" prop="password" required>
        <el-input
          placeholder="请输入密码"
          clearable
          style="width: 200px"
          v-model="iphoneInfos.password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IcompanyInfos } from '@/types/login'
import { type FormRules, type ElForm, ElMessage } from 'element-plus/lib/components/index.js'
import { ref } from 'vue'
import { createReq } from '@/server/main/admin'
import { localIns } from '@/utils/cache/cache'
import router from '@/router'
import { validationRules } from '@/utils/FormRules/FormRules'
const iphoneInfos = reactive<IcompanyInfos>({
  companyName: '',
  accountName: '',
  password: ''
})

// 2.设置表单验证规则
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const rules: FormRules = validationRules
// 3. 注册操作
async function registerAction() {
  // 将企业名称保存到local，以便后续使用
  try {
    localIns.setCache('companyName', iphoneInfos.companyName)
    const response = await createReq('user', {
      name: iphoneInfos.accountName,
      password: iphoneInfos.password,
      roles: '64a52cb6d225ead824895477', // 如果是注册，则直接给到超级管理员角色这样一个初始权限
      department: '64a6b38aba85184e7a58f197'
    })
    if (response.data.status === 200) {
      ElMessage.success('注册成功')
      // 注册成功后，跳转到登录页面
      router.push('/login')
      setTimeout(() => {
        window.location.reload()
      }, 600)
    }
  } catch (error) {
    ElMessage.error('注册失败')
  }
}

// 暴露方法, 以便父组件访问
defineExpose({
  registerAction
})
</script>

<style lang="less" scoped>
.login-iphone {
  .code {
    margin-left: 10px;
    width: 70px;
  }
  .el-input {
    --el-color-primary: orange;
  }
}
</style>
