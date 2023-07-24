<template>
  <div class="histogram">
    <base-echarts :setOption="setOption" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import baseEcharts from './base-echarts.vue'
import * as echarts from 'echarts'

interface IProps {
  data: {
    newDataCount: number[]
    newDataName: string[]
  }
}
const props = defineProps<IProps>()
const setOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: '618战报',
      left: 'center',
      top: 15
    },
    xAxis: {
      data: props.data.newDataName,
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: -45,
        textStyle: {
          color: '#999'
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data.newDataCount,
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.3)'
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.histogram {
  background-color: #fff;
  border-radius: 8px;
}
</style>
