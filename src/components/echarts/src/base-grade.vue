<template>
  <div class="grade">
    <base-echarts :setOption="setOption"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts'
import baseEcharts from './base-echarts.vue'

const setOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: '手机好评率',
      left: 'center',
      top: 20
    },
    tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      radius: '75%',
      center: ['50%', '60%'],
      name: '618小米手机',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 95,
          name: '好评率 '
        }
      ]
    }
  ]
};
})
</script>

<style lang="less" scoped>
  .grade {
    background-color: #fff;
    border-radius: 8px;
  }
</style>
