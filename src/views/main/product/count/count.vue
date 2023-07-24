<template>
  <div class="product-count">
    <div class="count-top">
      <el-row :gutter="20">
        <template v-for="item in localProductList" :key="item.keywords">
          <el-col :span="6">
            <count-top :item="item" />
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="count-middle">
      <el-row :gutter="20">
        <el-col :span="7">
          <base-pie :data="basePieData" />
        </el-col>
        <el-col :span="10">
          <base-map :data="baseMapData"/>
        </el-col>
        <el-col :span="7">
          <base-grade />
        </el-col>
      </el-row>
    </div>
    <div class="count-bottom">
      <el-row :gutter="20">
        <el-col :span="12">
          <base-histogram :data="baseHistogramData"/>
        </el-col>
        <el-col :span="12">
          <base-line :data="baseLineData"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import countTop from '@/views/main/product/count/c-cnps/count-top.vue'
import useProductStore from '@/store/main/product'
import { storeToRefs } from 'pinia'
import basePie from '@/components/echarts/src/base-pie.vue'
import baseGrade from '@/components/echarts/src/base-grade.vue'
import baseHistogram from '@/components/echarts/src/base-histogram.vue'
import baseLine from '@/components/echarts/src/base-line.vue'
import baseMap from '@/components/echarts/src/base-map.vue'
import { computed } from 'vue'

// 获取统计数据并传入子组件
const productStore = useProductStore()
productStore.getProductListAction()
const { localProductList } = storeToRefs(productStore)

productStore.getProductTypeSaleActon()
const { localProductTypeSaleList } = storeToRefs(productStore)

productStore.getProductMapDataAction()
const { localProductMapDataList } = storeToRefs(productStore)

// 对数据转换正确的格式后传入echarts组件
// 1. 饼图数据
const basePieData = computed(() => {
  const newData = localProductTypeSaleList?.value.map((item) => {
    return {
      name: item.name,
      value: item.sale
    }
  })
  return newData
})
// 2. 柱状图数据
const baseHistogramData = computed(() => {
  const newDataName = localProductTypeSaleList.value.map(item => {
    return item.name
  })
  const newDataCount = localProductTypeSaleList.value.map(item => {
    return item.count
  })
  return { newDataCount, newDataName }
})
// 3. 折线图数据
const baseLineData = computed(() => {
  const newDataName = localProductTypeSaleList.value.map(item => {
    return item.name
  })
  const newDataFavor = localProductTypeSaleList.value.map(item => {
    return item.favor
  })
  return { newDataName, newDataFavor }
})
// 4. 地图数据
const baseMapData = computed(() => {
  const baseMapData = localProductMapDataList.value.map(item => {
    return {
      name: item.address,
      value: item.count
    }
  })
  return baseMapData
})
</script>

<style lang="less" scoped>
.product-count {
  .count-middle {
    margin-top: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
  }
}
</style>
