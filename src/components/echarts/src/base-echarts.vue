<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '@/components/echarts/data/china.json'

// 注册地图
echarts.registerMap('china', ChinaJSON as any)

const echartsRef = ref<HTMLElement>()

interface IProps {
  setOption: EChartsOption
}

const props = defineProps<IProps>()
// 初始化一个图表实例，并将其渲染到指定的元素上。
// 因为init函数需要绑定dom所以需要在onMounted中执行确保dom已经渲染
onMounted(() => {
  const myChart = echarts.init(echartsRef.value, 'light', { renderer: 'canvas' })
  myChart.setOption(props.setOption)

  // 第一次进行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(()=> myChart.setOption(props.setOption))
})
</script>

<style lang="less" scoped>
.base-echarts {
  .echarts {
    height: 300px;
  }
}
</style>
