<template>
  <div class="login">
    <img class="xiaomiImg" src="../../assets//img/小米登录bgi.jpg" alt="" />
    <div class="login-top">
      <div class="left">
        <img src="../../assets//img/小米logo.png" alt="" />
        <span class="loginTitle">小米帐号</span>
      </div>
      <div class="rigth">
        <a href="https://static.account.xiaomi.com/html/agreement/user/zh_CN.html">
          <span class="user">用户协议</span>
        </a>
        <a href="https://privacy.mi.com/miaccount/zh_CN/">
          <span class="private">隐私政策</span>
        </a>
        <a href="https://cn.account.xiaomi.com/helpcenter?_locale=zh_CN">
          <span class="help">帮助中心</span>
        </a>
      </div>
    </div>
    <login-cpn class="loginCpn" />
  </div>
</template>

<script setup lang="ts">
import loginCpn from './c-cpns/login-cpn.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;

  .xiaomiImg {
    height: 100vh;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  .login-top {
    display: flex;
    width: 100%;
    // height: 50px;
    position: fixed;
    top: 20px;
    right: 40px;
    color: #838383;
    .left {
      margin-left: 500px;
      img {
        margin-left: 400px;
        width: 45px;
        height: 45px;
      }
      .loginTitle {
        display: flex;
        margin-top: 6px;
        font-size: 25px;
        font-weight: 500;
        color: black;
      }
    }
    .rigth {
      font-size: 16px;
      margin-left: 600px;
      margin-top: 15px;
      .private {
        color: #838383;
        margin-left: 20px;
        margin-right: 20px;
      }
      .user {
        color: #838383;
      }
      .help {
        color: #838383;
      }
    }
  }
  .loginCpn {
    margin-left: 300px;
    border-radius: 8px;
  }
  img {
    width: 375px;
    position: fixed;
    left: 0;
  }
}
</style>
