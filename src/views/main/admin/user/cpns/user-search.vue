<template>
  <div class="search">
    <el-form label-width="90px" :model="formData" ref="formDataRef">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="id" prop="id">
            <el-input v-model="formData.id" />
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status" style="width: 100%;">
              <el-option label="激活" :value="1" />
              <el-option label="关闭" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="时间" prop="createdAt">
            <el-date-picker
              v-model="formData.createdAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY/MM/DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button @click="resetDataList">重置</el-button>
      <el-button @click="queryDataList" type="primary">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus/lib/components/index.js'
import { reactive, ref } from 'vue'
import type { IformData } from '@/types/index'

// 1. 定义表单数据对象
const formData = reactive<IformData>({
  id: '',
  name: '',
  status: 1,
  createdAt: ''
})

// 定义事件
const emit = defineEmits(['queryData', 'resetData'])

// 2. 重置查询表单
// 2.1 获取el-form组件实例进行所有输入的reset, 在el-form-item绑定prop相应的重置的字段
// 2.2 发出重置事件到父组件中进而间接操作content组件控制的网络请求
const formDataRef = ref<InstanceType<typeof ElForm>>()
function resetDataList() {
  formDataRef.value?.resetFields()
  emit('resetData')
}

// 3. 查询
// 3.1 发出查询事件到父组件中进而间接操作content组件控制的网络请求
function queryDataList() {
  emit('queryData', formData)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  border-radius: 8px;
  height: auto;
  .el-form-item {
    margin-top: 25px;
    margin-right: 44px;
  }
  .el-form {
    .el-row {
      display: flex;
      justify-content: space-between;
      .el-col {
        height: 70px;
      }
    }
  }
  .btns {
    margin-top: 18px;
    padding-bottom: 18px;
    text-align: right;
    padding-right: 43px;
    .el-button {
      width: 80px;
      margin-left: 22px;
    }
  }
}
</style>
