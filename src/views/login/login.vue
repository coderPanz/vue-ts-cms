<template>
  <div class="login">
    <login-cpn />
  </div>
</template>

<script setup lang="ts">
import loginCpn from './c-cpns/login-cpn.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login-bg.svg');

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
