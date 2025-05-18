<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig.contentTitle.headerName }}</h3>
      <div>
        <el-button
          v-if="contentConfig.contentTitle.sortPrice"
          style="margin: 0 8px"
          @click="handleSortPrice"
        >
          {{ contentConfig.contentTitle.sortPrice }}
        </el-button>
        <el-button
          v-if="contentConfig.contentTitle.sortStock"
          style="margin: 0 8px"
          @click="handleSortStock"
        >
          {{ contentConfig.contentTitle.sortStock }}
        </el-button>
        <el-button @click="downloadExcel" type="success" style="margin: 0 8px"> 保存 </el-button>
        <el-button
          v-if="contentConfig.contentTitle.btnName && isCreate"
          @click="popUpClick"
          class="headerBtn"
          type="primary"
        >
          {{ contentConfig.contentTitle.btnName }}
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="sortedDataList" border style="width: 100%" :row-key="contentConfig.childrenTree">
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
        <el-table-column v-if="contentConfig.isShowOperate" prop="date" label="操作" align="center">
          <!-- 使用作用域插槽获取当前数据的唯一标识:id -->
          <template #default="scope">
            <el-button v-if="isUpdate" @click="updateUser(scope.row)">编辑</el-button>
            <el-button v-if="isDelete" type="danger" @click="deleteUser(scope.row._id)"
              >删除</el-button
            >
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
import { ref, toRefs, computed } from 'vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { userCreate, userDelete, userUpdate, userFind } from '@/hooks/index'
import { localIns } from '@/utils/cache/cache'

// 创建store实例
const adminStore = useAdminStore()

interface IProps {
  contentConfig: {
    pageName: string
    isShowOperate: boolean
    childrenTree?: string
    contentTitle: {
      headerName: string
      btnName?: string
      sortPrice?: string
      sortStock?: string
    }
    formConfigData: any[]
  }
}

// 获取传入的配置文件
const props = defineProps<IProps>()

// 设置分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)

// 排序相关状态
const sortOrder = ref<'asc' | 'desc'>('asc')
const sortField = ref<'price' | 'stock' | null>(null)

// 设置用户按钮权限(hooks抽取)
const isCreate = userCreate(props.contentConfig.pageName)
console.log('isCreate: ', isCreate)
const isDelete = userDelete(props.contentConfig.pageName)
const isUpdate = userUpdate(props.contentConfig.pageName)
const isFind = userFind(props.contentConfig.pageName)

// 获取用户列表
getPageList()
const { dataList, count } = storeToRefs(adminStore)

// 排序后的数据列表
const sortedDataList = computed(() => {
  if (!sortField.value) return dataList.value

  return [...dataList.value].sort((a, b) => {
    const aValue = Number(a[sortField.value!])
    const bValue = Number(b[sortField.value!])
    return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
  })
})

// 处理价格排序
function handleSortPrice() {
  if (sortField.value === 'price') {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = 'price'
    sortOrder.value = 'asc'
  }
}

// 处理库存排序
function handleSortStock() {
  if (sortField.value === 'stock') {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = 'stock'
    sortOrder.value = 'asc'
  }
}

// 分页器
function getPageList(formData?: any) {
  if (!isFind) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * pageSize.value

  const allDataReq = { ...formData, size, offset }

  adminStore.getDataListAction(props.contentConfig.pageName, allDataReq).then((res) => {
    adminStore.dataList = res.data.data
  })
}

function reFreshPage() {
  getPageList()
}

defineExpose({ getPageList })

function deleteUser(id: string) {
  const userId = localIns.getCache('userId')
  adminStore.deleteDataListAction(props.contentConfig.pageName, id, userId).then((res) => {
    if (res.data.status === -1) {
      ElMessage.error(res.data.msg)
      return
    }
    if (res.data.status === -2) {
      ElMessage.error(res.data.msg)
      return
    }
    if (res.data.status === -3) {
      ElMessage.error(res.data.msg)
      return
    } else {
      getPageList()
      return
    }
  })
}

const emit = defineEmits(['createBtnClick', 'updateBtnClick'])
const isShow = ref<boolean>(false)
const isJudge = ref<boolean>(true)
function popUpClick() {
  emit('createBtnClick', isShow.value, isJudge.value)
}

function downloadExcel() {
  const headers = props.contentConfig.formConfigData
    .filter((item) => item.type !== 'custom' && item.type !== 'index')
    .map((item) => item.label)

  const data = dataList.value.map((row: any) => {
    return props.contentConfig.formConfigData
      .filter((item) => item.type !== 'custom' && item.type !== 'index')
      .map((column) => {
        if (column.type === 'time') {
          return format(row[column.prop])
        }
        return row[column.prop]
      })
  })

  const ws_name = 'SheetJS'
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])

  XLSX.utils.book_append_sheet(wb, ws, ws_name)

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(
    new Blob([wbout], { type: 'application/octet-stream' }),
    `${props.contentConfig.contentTitle.headerName || 'table'}.xlsx`
  )
}

function updateUser(backData: any) {
  const { _id } = toRefs(backData)
  const role_id = _id.value
  emit('updateBtnClick', isShow.value, !isJudge.value, backData, role_id)
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
    align-items: center;
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
    .el-pagination {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
