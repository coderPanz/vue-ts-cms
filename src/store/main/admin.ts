import { getUserListReq, deleteIdUserReq, createUserReq } from '@/server/index'
import { defineStore } from "pinia";
import type { IDialogForm } from '@/types/Dialog/dialogForm'

interface IState {
  userList: any[]
  count: Number
}
const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    userList: [],
    count: 0
  }),
  actions: {
    // 1. 获取用户列表的网络请求
    async fetchGetUserList(data: any) {
      const res = await getUserListReq(data)
      this.userList = res.data.data
      this.count = res.data.totalCount
    },
    // 2. 删除用户后重新发送网络请求获取最新的数据
    async fetchDeleteUserList(id: any) {
      const res = await deleteIdUserReq(id)
    },
    // 3. 创建用户
    async fetchCreateUser(data: IDialogForm) {
      const res = await createUserReq(data)
    }
  }
})

export default useAdminStore