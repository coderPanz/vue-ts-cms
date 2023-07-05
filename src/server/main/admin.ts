import { pzrequest } from '../requestPackage'
import type { IDialogForm } from '@/types/Dialog/dialogForm'
// 分页请求
export function getUserListReq(data: any) {
  return pzrequest.post({
    url: '/user//paginationQuery',
    data: data
  })
}

// 删除指定id用户
export function deleteIdUserReq(id: any) {
  return pzrequest.delete({
    url: `/user/${id}`
  })
}

// 创建用户
export function createUserReq(data: IDialogForm) {
  return pzrequest.post({
    url: '/user',
    data: data
  })
}

// 获取角色列表
export function getRolesListReq() {
  return pzrequest.get({
    url: '/role'
  })
}