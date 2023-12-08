<template>
  <div class="notFound">
    <img src="@/assets/img/腾讯公益404.png" alt="Tip">
  </div>
</template>

<script setup lang="ts">
import { type FormRules, type ElForm, ElMessage } from 'element-plus/lib/components/index.js'

const open2 = () => {
  ElMessage({
    message: '刷新一下吧!',
    type: 'success',
  })
}
open2()
</script>

<style lang="less" scoped></style>
