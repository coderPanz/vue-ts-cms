import infos from '@/router/main/product/infos';
import { getUserListReq } from '@/server/index'
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
    async fetchGetUserList(infos?: any) {
      const res = await getUserListReq(infos)
      // console.log(res.data.data)
      this.userList = res.data.data
      this.count = res.data.count
    }
  }
})

export default useAdminStore