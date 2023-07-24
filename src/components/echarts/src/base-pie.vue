<template>
  <div class="pie">
    <base-echarts :setOption="setOption" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IProps {
  data: {
    name: string
    value: number
  }[]
}
const props = defineProps<IProps>()

const setOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: '小米手机618',
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '机型-售价',
        type: 'pie',
        radius: '55%',
        top: 35,
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pie {
  background-color: #fff;
  border-radius: 8px;
}
</style>
