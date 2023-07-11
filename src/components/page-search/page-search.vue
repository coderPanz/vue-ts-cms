<!-- 高度封装page-search高阶组件 -->
<!-- 公共组件, 可以提供给多个组件使用, 调用组件时需要提供该组件的配置信息 -->

<template>
  <div class="search">
    <el-form label-width="90px" :model="formData" ref="formDataRef" :search-config="searchConfig">
      <el-row :gutter="10">
        <template v-for="item in searchConfig.formConfigData" :key="item.prop">
          <el-col :span="7">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 确定组件类型再进行渲染 -->
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="YYYY/MM/DD"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" style="width: 100%">
                  <template v-for="option in item.options" :key="option.label">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// 1. 获取配置文件传进来的定义表单数据对象
interface IProps {
  searchConfig: {
    formConfigData: any[]
  }
}
const prop = defineProps<IProps>()

const formDataList: any = {}
for (const item of prop.searchConfig.formConfigData) {
  formDataList[item.prop] = ''
}

const formData = reactive(formDataList)

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
