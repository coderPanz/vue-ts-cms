import { pzrequest } from '../requestPackage'
import type { IPopUpForm } from '@/types/popUp/popUpForm'

// 分页查询(获取用户列表)
export function queryReq(name: string, data?: any) {
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
export function createReq(name: string, data: IPopUpForm) {
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
