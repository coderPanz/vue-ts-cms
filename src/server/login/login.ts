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
export async function userInfosReq(id: number) {
  return await pzrequest.post({
    url: `/user/${id}`
  })
}

// 3. 获取角色信息
export async function roleInfosReq(id: string) {
  return await pzrequest.get({
    url: `/role/${id}`
  })
}

// 4. 根据角色权限获取菜单树
export async function menuTreeReq(id: string) {
  return pzrequest.get({
    url: `/role/${id}/menu`
  })
}

// 5. 获取全部菜单树
export async function allMenuTreeReq() {
  return pzrequest.get({
    url: `/menu`
  })
}