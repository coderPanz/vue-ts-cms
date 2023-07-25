<template>
  <div class="loginCpn">
    <div class="projectNama">后台版</div>
    <el-tabs type="border-card" stretch v-model="activeName">
      <el-tab-pane name="account">
        <template #label>
          <el-icon class="icon"><User /></el-icon>
          <span class="accountLogin">帐号登录</span>
        </template>
        <login-account ref="accountIns"/>
      </el-tab-pane>
      <el-tab-pane name="iphone">
        <template #label>
          <el-icon class="icon"><Phone /></el-icon>
          <span class="accountLogin">手机登录</span>
        </template>
        <login-iphone />
      </el-tab-pane>
    </el-tabs>
    <div class="select">
      <el-checkbox label="记住密码" size="large" v-model="isRemember" class="remeber"/>
      <a class="forgot" href="https://account.xiaomi.com/fe/service/forgetPassword?_bannerBiz=&sid=mi_eshop&callback=http%3A%2F%2Forder.mi.com%2Flogin%2Fcallback%3Ffollowup%3Dhttps%253A%252F%252Fwww.mi.com%252Fshop%26sign%3DODA5NjU3ZjZkYjkxMWE3ZjVkYTE5M2MxMDNlYmJkYzJhZGFjNzBhYg%2C%2C&qs=&_locale=zh_CN">忘记密码?</a>
    </div>
    <el-link class="loginNow" @click="loginNow">立即登录</el-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import loginAccount from './login-account.vue'
import loginIphone from './login-iphone.vue';
import { localIns } from '@/utils/cache/cache';

// 3.点击登录
// 3.1 获取子组件实例并指定类型, 使用InstanceType表示获取该类的返回值的类型
// 3.2 if逻辑中表示, 在帐号登录和手机登录不同的页面调用相应的方法
// 3.3 在帐号登录界面实现记住密码功能(传入状态参数到子组件中决定是否记住)
// 3.4 缓存isRemember状态, ref从localStorage中取出
const activeName = ref('account')
const isRemember = ref(localIns.getCache('isRemember'))
const accountIns = ref<InstanceType<typeof loginAccount>>()

watch(isRemember, newValue => {
  localIns.setCache('isRemember', newValue)
})

function loginNow() {
  if (activeName.value === 'account') {
    accountIns.value?.loginAction(isRemember.value)
  } else {
    console.log('手机登录')
  }
}

</script>

<style lang="less" scoped>
.loginCpn {
  text-align: center;
  .projectNama {
    font-size: 25px;
    font-family: var(--var-font-family);
    margin-bottom: 5px;
  }
  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .loginNow {
    color: #fff;
    width: auto;
    height: 40px;
    border-radius: 6px;
    background-color: #ff6700;

    display: flex;
  }
  .accountLogin {
    color: black;
  }
  .icon {
    color: #ff6700;
  }
  .remeber {
    --el-color-primary: #ff5c00;
  }
  .forgot {
    color: #ff5c00;
  }
}
</style>
