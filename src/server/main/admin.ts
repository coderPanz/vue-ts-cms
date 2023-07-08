import { pzrequest } from '../requestPackage'
import type { IDialogForm } from '@/types/Dialog/dialogForm'


// 分页查询(获取用户列表)
export function queryReq(data: any) {
  return pzrequest.post({
    url: '/user//paginationQuery',
    data: data
  })
}

// 删除指定id用户
export function deleteReq(id: string) {
  return pzrequest.delete({
    url: `/user/${id}`
  })
}

// 创建用户
export function createReq(data: IDialogForm) {
  return pzrequest.post({
    url: '/user',
    data: data
  })
}

// 更新数据
export function updateReq(id: string, data: any) {
  return pzrequest.patch({
    url: `/user/${id}`,
    data: data
  })
}

// 获取角色列表
export function getRolesListReq() {
  return pzrequest.get({
    url: '/role'
  })
}

// 获取部门列表
export function getDepartmentListReq() {
  return pzrequest.get({
    url: '/department'
  })
}