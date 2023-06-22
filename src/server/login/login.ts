import type { ILogin } from '@/types/index'
import { pzrequest } from '../requestPackage'

// 1. 登录请求
export async function postLoginRequest(account: ILogin) {
  return await pzrequest.post({
    url: '/login',
    data: account
  })
}

// 2. 获取用户详细信息
export async function userInfosReq(id: Number) {
  return await pzrequest.get({
    url: `/user/${id}`
  })
}

// 3. 获取角色信息
export async function roleInfosReq(id: String) {
  return await pzrequest.get({
    url: `/role/${id}`
  })
}

// 4. 获取菜单树
export async function menuTreeReq(id: Number) {
  return pzrequest.get({
    url: `/role/${id}/menu`
  })
}