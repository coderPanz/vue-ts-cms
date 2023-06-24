import { pzrequest } from '../requestPackage'

// 获取用户列表的网络请求
export function getUserListReq(infos?: any) {
  return pzrequest.post({
    url: '/user/list',
    data: infos
  })
}