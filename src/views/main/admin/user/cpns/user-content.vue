<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="id" label="id" align="center" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="status" label="状态" align="center" width="100">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" plain :type="scope.row.status ? 'primary' : 'danger'">{{
              scope.row.status ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
          <template #default="scope">
            {{ format(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" align="center">
          <template #default="scope">
            {{ format(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="reFreshPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAdminStore from '@/store/main/admin'
import { storeToRefs } from 'pinia'
import format from '@/utils/formatDate/format'
import { ref } from 'vue'

// 设置分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)

// 1. 获取用户列表
const adminStore = useAdminStore()
// 1. 1 发送网络请求(第一次渲染页面后发送网络请求)
getPageList()
// 1. 2  注意异步操作请求数据的时候需要对数据进行响应式处理才能在页面实时渲染
const { userList, count } = storeToRefs(adminStore)

// 2. 分页器
// 2.1 定义一个函数发送请求获取分页数据(这里我们定义一页显示10条数据)
function getPageList() {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * pageSize.value
  // 发送网络请求
  adminStore.fetchGetUserList({ size, offset })
}

// 2.2 当页面切换时发送网络请求获取下一页的数据
function reFreshPage() {
  getPageList()
}
</script>

<style lang="less" scoped>
.content {
  padding: 30px;
  .header {
    display: flex;
    justify-content: space-between;
    h3 {
      padding-left: 33px;
    }
    .el-button {
      width: 80px;
      margin-right: 13px;
    }
  }
  .table {
    margin-top: 20px;
    .el-table {
      border-radius: 8px;
    }
  }
  .pagination {
    // margin-top: 20px;
    .el-pagination {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
