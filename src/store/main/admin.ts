import { getUserListReq, deleteIdUserReq } from '@/server/index'
import { defineStore } from "pinia";

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
    // 获取用户列表的网络请求
    async fetchGetUserList(data: any) {
      const res = await getUserListReq(data)
      this.userList = res.data.data
      this.count = res.data.totalCount
    },
    async fetchDeleteUserList(id: any) {
      const res = await deleteIdUserReq(id)
    }
  }
})

export default useAdminStore