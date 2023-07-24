<template>
    <div class="item">
      <div class="item-data">
        <div class="top">{{ item.title }}</div>
        <div class="middle" :id="item.keywords">{{ item.number1 }}</div>
        <div class="bottom">
          <span class="subTitle">{{ item.subTitle }}</span>
          <span :id="item._id">{{ item.number2 }}</span>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted } from 'vue'
interface IProps {
  item: {
    _id: string
    keywords: string
    title: string
    tips: string
    subTitle: string
    number1: number
    number2: number
  }
}

const props = defineProps<IProps>()

// 使用countup组件库使得数据出现递增的动画效果
// 由于dom没有将对应元素渲染出来, 所以需要在onMounted函数中进行操作确保dom渲染完毕
// 注意: 每次遍历时id也是不尽相同的, 所以id也需要是动态的
onMounted(() => {
  const countup1 = new CountUp(props.item.keywords.toString(), props.item.number1)
  const countup2 = new CountUp(props.item._id.toString(), props.item.number2)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.item {
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 100px;
  border-radius: 8px;
  padding: 15px;
  .item-data {
    .top {
      font-size: 12px;
      color: #909399;
    }
    .middle {
      font-size: 35px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .bottom {
      width: 250px;
      padding-top: 8px;
      border-top: 1px solid #e6e8eb;
      .subTitle {
        margin-right: 10px;
      }
    }
  }
}
</style>
