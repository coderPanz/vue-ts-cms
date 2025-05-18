/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-15 20:50:28
 * @LastEditors: qs
 * @Description: 
 * @FilePath: /vue-ts-cms/src/server/main/admin.ts
 * 
 */
import { pzrequest } from '../requestPackage'

// 获取数据列表
export function queryReq(name: string, data?: any) {
  return name === 'user'
    ? pzrequest.post({
        url: `/userpaginationQuery`,
        data: data
      })
    : pzrequest.post({
        url: `/${name}/paginationQuery`,
        data: data
      })
}

// 删除指定id用户
export function deleteReq(name: string, id: string, userId: string) {
  return pzrequest.delete({
    url: `/${name}/${id}`,
    data: {
      userId: userId
    }
  })
}

// 创建用户
export function createReq(name: string, data: any) {
  return pzrequest.post({
    url: `/${name}`,
    data: data
  })
}

// 更新数据
export function updateReq(name: string, id: string, data: any) {
  console.log(data)
  return pzrequest.patch({
    url: `/${name}/${id}`,
    data: data
  })
}
