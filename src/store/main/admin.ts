import { paginationQuery, deleteIdUserReq, createUserReq, getRolesListReq, getDepartmentListReq } from '@/server/index'
import { defineStore } from "pinia";
import type { IDialogForm } from '@/types/Dialog/dialogForm'

interface IState {
  userList: any[]
  count: Number
  roleList: any[]
  departmentList: any[]
}
const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    userList: [],
    count: 0,
    roleList: [],
    departmentList: []
  }),
  actions: {
    // 1. 获取用户列表的网络请求
    async fetchPaginationQuery(data: any) {
      const res = await paginationQuery(data)
      this.userList = res.data.data
      this.count = res.data.totalCount
    },
    // 2. 删除用户后重新发送网络请求获取最新的数据
    async fetchDeleteUserList(id: string) {
      const res = await deleteIdUserReq(id)
      return res
    },
    // 3. 创建用户
    async fetchCreateUser(data: IDialogForm) {
      const res = await createUserReq(data)
    },
    // 4. 获取角色列表以便在创建用户时显示对应的角色名称
    async fetchGetRolesList() {
      const res = await getRolesListReq()
      this.roleList = res.data.data
    },
    // 5. 获取部门列表
    async fetchGetDepartmentList() {
      const res = await getDepartmentListReq()
      this.departmentList = res.data.data
    }
  }
})

export default useAdminStore