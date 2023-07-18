<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig.contentTitle.headerName }}</h3>
      <el-button type="primary" @click="popUpClick">
        {{ contentConfig.contentTitle.btnName }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="dataList" border style="width: 100%">
        <template v-for="item in contentConfig.formConfigData" :key="item.prop">
          <!-- 表格常用类型的渲染 -->
          <template v-if="item.type === 'index'">
            <el-table-column
              :type="item.type"
              :label="item.label"
              :width="item.width"
              align="center"
            />
          </template>
          <template v-else-if="item.type === 'normal'">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              align="center"
              :width="item.width"
            />
          </template>
          <template v-else-if="item.type === 'time'">
            <el-table-column :prop="item.prop" :label="item.label" align="center">
              <template #default="scope">
                {{ format(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <!-- 通过作用域插槽进行表格的特殊定制化: 添加一个作用域插槽, 并把数据传输到父组件, 通过父组件进行定制化渲染 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              align="center"
              :width="item.width"
            >
              <!-- 作用域插槽, 属性通过v-bind="scope"传到父组件 -->
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
        </template>
        <el-table-column prop="date" label="操作" align="center">
          <!-- 使用作用域插槽获取当前数据的唯一标识:id -->
          <template #default="scope">
            <el-button @click="updateUser(scope.row._id)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row._id)">删除</el-button>
          </template>
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
import { computed, ref } from 'vue'
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { popUpConfig } from '@/views/main/admin/user/config/config'

// 创建store实例
const adminStore = useAdminStore()

interface IProps {
  contentConfig: {
    pageName: string
    contentTitle: {
      headerName: string
      btnName: string
    }
    formConfigData: any[]
  }
}

// 获取传入的配置文件
const props = defineProps<IProps>()

// 设置分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)

// 1. 获取用户列表
// 1. 1 发送网络请求(第一次渲染页面后发送网络请求)
getPageList()
// 1. 2  注意异步操作请求数据的时候需要对数据进行响应式处理才能在页面实时渲染
const { dataList, count } = storeToRefs(adminStore)

// 2. 分页器
// 2.1 定义一个函数发送请求获取分页数据(这里我们定义一页显示10条数据)
function getPageList(formData?: any) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * pageSize.value

  // 把search表单中的数据和size和offset数据结合起来
  const allDataReq = { ...formData, size, offset }
  // 发送网络请求
  adminStore.getDataListAction(props.contentConfig.pageName, allDataReq).then((res) => {
    // 赋值给pinia中的dataList以便展示user的数据
    adminStore.dataList = res.data.data
  })
}

// 2.2 当页数切换时发送网络请求获取下一页的数据
function reFreshPage() {
  getPageList()
}

// 2.3 把getPageList请求函数暴露出去, 方便重置操作
defineExpose({ getPageList })

// 3. 删除数据
// 3.1 删除成功后在重新获取用户列表
function deleteUser(id: string) {
  adminStore.deleteDataListAction(props.contentConfig.pageName, id).then((res) => {
    if (res.data.msg === '权限不足, 无法删除!') {
      ElMessage.error('权限不足, 无法删除!')
    }
    if (res.data.msg === '删除失败!') {
      ElMessage.error('服务器异常!')
    } else {
      // 删除成功后查询重新获取数据列表!
      getPageList()
    }
  })
}

// 4. 点击新建按钮发出事件到父组件中连接popUp组件
const emit = defineEmits([ 'createBtnClick', 'updateBtnClick' ])
const isShow = ref<boolean>(false)
function popUpClick() {
  emit('createBtnClick', isShow.value, true)
}

// 5.点击编辑按钮发出事件到父组件中连接popUp组件
function updateUser(id: string) {
  emit('updateBtnClick', isShow.value, false, id)
}

</script>

<style lang="less" scoped>
.content {
  padding: 30px;
  margin-top: 25px;
  border-radius: 8px;
  background-color: #fff;
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
