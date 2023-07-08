import { queryReq, deleteReq, createReq, getRolesListReq, getDepartmentListReq, updateReq } from '@/server/index'
import { defineStore } from "pinia";
import type { IDialogForm } from '@/types/Dialog/dialogForm'

interface IState {
  userList: any[]
  count: Number
  roleList: any[]
  departmentList: any[]
  id: any // 保存用户id, 用于编辑用户操作
}
const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    userList: [],
    count: 0,
    roleList: [],
    departmentList: [],
    id: ''
  }),
  actions: {
    // 1. 获取用户列表的网络请求
    async getDataListAction(data: any) {
      const res = await queryReq(data)
      this.userList = res.data.data
      this.count = res.data.totalCount
    },
    // 2. 删除用户后重新发送网络请求获取最新的数据
    async deleteDataListAction(id: string) {
      const res = await deleteReq(id)
      return res
    },
    // 3. 创建用户
    async createDataAction(data: IDialogForm) {
      const res = await createReq(data)
      return res
    },
    // 6. 更新用户
    async updateDataAction(id: string, data: any) {
      const res = await updateReq(id, data)
      return res
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