/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-15 20:34:16
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/hooks/user-permission.ts
 * 
 */
import useLoginStore from '@/store/login/login'
const loginStore = useLoginStore()

export function userCreate(pageName: string) {
  const res = loginStore.localPermissionList.find(item => item.includes(`system-${pageName}-create`))
  return !!res // !! 转化为布尔值
}

export function userDelete(pageName: string) {
  const res = loginStore.localPermissionList.find(item => item.includes(`system-${pageName}-delete`))
  return !!res // !! 转化为布尔值
}

export function userUpdate(pageName: string) {
  const res = loginStore.localPermissionList.find(item => item.includes(`system-${pageName}-update`))
  return !!res // !! 转化为布尔值
}

export function userFind(pageName: string) {
  const res = loginStore.localPermissionList.find(item => item.includes(`system-${pageName}-find`))
  return !!res // !! 转化为布尔值
}