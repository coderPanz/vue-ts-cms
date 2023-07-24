<template>
  <div class="line">
    <base-echarts :setOption="setOption" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import baseEcharts from './base-echarts.vue'

interface IProps {
  data: {
    newDataName: string[]
    newDataFavor: number[]
  }
}
const props = defineProps<IProps>()
const setOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: '手机收藏量',
      left: 'center',
      top: 15
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.newDataName
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data.newDataFavor,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.line {
  background-color: #fff;
  border-radius: 8px;
}
</style>
