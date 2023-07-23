<template>
  <div class="product-count">
    <div class="count-top">
      <el-row :gutter="20">
      <template v-for="item in localProductList" :key="item.keywords">
        <el-col :span="6">
          <count-top :item="item"/>
        </el-col>
      </template>
    </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import countTop from '@/views/main/product/count/c-cnps/count-top.vue'
import useProductStore from '@/store/main/product';
import { storeToRefs } from 'pinia';

// 获取统计数据并传入子组件
  const productStore = useProductStore()
  productStore.getProductListAction()
  const { localProductList } = storeToRefs(productStore)

</script>

<style lang="less" scoped>

</style>
