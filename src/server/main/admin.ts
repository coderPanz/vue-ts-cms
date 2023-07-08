import { pzrequest } from '../requestPackage'
import type { IDialogForm } from '@/types/Dialog/dialogForm'


// 分页查询(获取用户列表)
export function queryReq(name: string, data: any) {
  return pzrequest.post({
    url: `/${name}//paginationQuery`,
    data: data
  })
}

// 删除指定id用户
export function deleteReq(name: string, id: string) {
  return pzrequest.delete({
    url: `/${name}/${id}`
  })
}

// 创建用户
export function createReq(name: string, data: IDialogForm) {
  return pzrequest.post({
    url: `/${name}`,
    data: data
  })
}

// 更新数据
export function updateReq(name: string, id: string, data: any) {
  return pzrequest.patch({
    url: `/${name}/${id}`,
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