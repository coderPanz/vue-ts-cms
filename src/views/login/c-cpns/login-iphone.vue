<template>
  <div class="login-iphone">
    <el-form label-width="60px" v-model="iphoneInfos">
      <el-form-item label="手机号">
        <el-input v-model="iphoneInfos.iphone" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input clearable style="width: 120px" v-model="iphoneInfos.iphoneCode"/>
        <el-button style="background-color: #ff6700; color: #fff;" class="code" @click="iphoneCode">getCode</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { IiphoneInfos } from '@/types/login'
const iphoneInfos = reactive<IiphoneInfos>({
  iphone: '',
  iphoneCode: ''
})
function iphoneCode() {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  iphoneInfos.iphoneCode = randomNum
}
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
