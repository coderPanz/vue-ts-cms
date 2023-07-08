import { queryReq, deleteReq, createReq, updateReq } from '@/server/index'
import { defineStore } from "pinia";
import type { IDialogForm } from '@/types/Dialog/dialogForm'

interface IState {
  roleList: any[],
  departmentList: any[],
  count: Number
  dataList: any[]
  id: any // 保存用户id, 用于编辑用户操作
}
const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    roleList: [],
    departmentList: [],
    dataList: [],
    count: 0,
    id: ''
  }),
  actions: {
    // 1. 获取用户列表的网络请求
    async getDataListAction(name: string, data?: any) {
      const res = await queryReq(name, data)
      this.dataList = res.data.data
      this.count = res.data.totalCount
      return res
    },
    // 2. 删除用户后重新发送网络请求获取最新的数据
    async deleteDataListAction(name: string, id: string) {
      const res = await deleteReq(name, id)
      return res
    },
    // 3. 创建用户
    async createDataAction(name: string, data: IDialogForm) {
      const res = await createReq(name, data)
      return res
    },
    // 6. 更新用户
    async updateDataAction(name: string, id: string, data: any) {
      const res = await updateReq(name, id, data)
      return res
    }
  }
})

export default useAdminStore