import { queryReq, deleteReq, createReq, updateReq } from '@/server/index'
import { defineStore } from 'pinia'
import type { IPopUpForm } from '@/types/popUp/popUpForm'

interface IState {
  roleList: any[]
  departmentList: any[]
  userList: any[]
  menuList: any[]
  dataList: any[]
  count: Number
  id: any // 保存用户id, 用于编辑用户操作
}
const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    roleList: [],
    departmentList: [],
    userList: [],
    menuList: [],

    dataList: [],
    count: 0,
    id: ''
  }),
  // 发送网络请求中转站, 尽量避免在vue组件中直接发送网络请求, 而是通过调用actions间接发送网络请求
  actions: {
    // 1.查询（进入系统管理菜单后直接获取角色，部门，用户列表存到pinia中）
    async getDataListAction(name: string, data?: any) {
      const res = await queryReq(name, data)
      const roleRes = await queryReq('role')
      const departmentRes = await queryReq('department')
      const userRes = await queryReq('user')
      const menusRes = await queryReq('menu')

      this.dataList = res.data.data
      this.count = res.data.totalCount

      this.roleList = roleRes.data.data
      this.departmentList = departmentRes.data.data
      this.userList = userRes.data.data
      this.menuList = menusRes.data.data
      // console.log(menusRes.data.data)
      return res
    },
    // 2. 删除用户后重新发送网络请求获取最新的数据
    async deleteDataListAction(name: string, id: string) {
      const res = await deleteReq(name, id)
      return res
    },
    // 3. 创建用户
    async createDataAction(name: string, data: IPopUpForm) {
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
