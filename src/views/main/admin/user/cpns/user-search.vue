<template>
  <div class="search">
    <el-form label-width="70px" :model="formData" ref="formDataRef">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="id" prop="id">
            <el-input v-model="formData.id"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名" prop="name">
            <el-input  v-model="formData.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时间" prop="createAt">
            <el-date-picker
            v-model="formData.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status">
              <el-option label="激活" :value="1" />
              <el-option label="关闭" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus/lib/components/index.js';
import { reactive, ref } from 'vue';

// 1. 定义表单数据对象
const formData = reactive({
  id: 0,
  name: '',
  status: 0,
  createAt: []
})

// 2. 重置查询
// 2.1 获取el-form组件实例进行所有输入的reset, 在el-form-item绑定prop相应的重置的字段
const formDataRef = ref<InstanceType<typeof ElForm>>()
function resetForm() {
  formDataRef.value.resetFields()
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  border-radius: 7px;
  height: 120px;
  .el-form-item {
    margin-top: 25px;
    margin-right: 44px;
  }
  .btns {
    text-align: right;
    padding-right: 43px;
  }
}
</style>
